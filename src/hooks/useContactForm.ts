"use client";

import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// --- CONFIGURATION ---
const RATE_LIMIT = 3; // Max 3 submissions
const TIME_WINDOW = 30 * 60 * 1000; // 30 minutes in milliseconds

export const useContactForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Time remaining in seconds

  // Checks history and updates cooldown state
  const checkCooldown = () => {
    const history = JSON.parse(localStorage.getItem("email_history") || "[]");
    const now = Date.now();

    // Filter out timestamps older than the TIME_WINDOW
    const validHistory = history.filter(
      (timestamp: number) => now - timestamp < TIME_WINDOW
    );

    // Update storage with cleaned up history
    if (validHistory.length !== history.length) {
      localStorage.setItem("email_history", JSON.stringify(validHistory));
    }

    // If we hit the limit, calculate how long until the oldest one expires
    if (validHistory.length >= RATE_LIMIT) {
      // The user must wait until the *oldest* message in the window expires
      const oldestTimestamp = validHistory[0];
      const timeUntilExpiry = Math.ceil((oldestTimestamp + TIME_WINDOW - now) / 1000);

      if (timeUntilExpiry > 0) {
        setCooldown(timeUntilExpiry);
        return true; // Is blocked
      }
    }

    setCooldown(0);
    return false; // Is not blocked
  };

  // Check on mount if the user is already blocked from a previous session
  useEffect(() => {
    checkCooldown();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check Rate Limit immediately on click
    if (checkCooldown()) {
      alert(
        `Limit reached. Please wait ${cooldown} seconds before sending again.`
      );
      return;
    }

    const currentForm = formRef.current;

    // Safety check: ensure formRef.current exists before sending
    if (!formRef.current) return;
    if (!currentForm) return;

    const formData = new FormData(currentForm);
    const honeypotValue = formData.get("search_query");

    if (honeypotValue) {
      console.log("Bot detected and blocked.");
      setLoading(false);
      alert("Message sent successfully!"); // Fake success
      return;
    }

    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setLoading(false);
          setSuccess(true);

          // Record the successful submission
          const history = JSON.parse(
            localStorage.getItem("email_history") || "[]"
          );
          history.push(Date.now());
          localStorage.setItem("email_history", JSON.stringify(history));

          // Re-check logic to potentially trigger cooldown UI immediately
          checkCooldown();

          const messageField = currentForm.querySelector(
            'textarea[name="message"]'
          ) as HTMLTextAreaElement;
          messageField.value = "";
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  const setSuccessTrue = () => {
    setSuccess(true);
  }

  const setSuccessFalse = () => {
    setSuccess(false);
  }

  return { formRef, loading, cooldown, success, handleSubmit, setSuccessTrue, setSuccessFalse };
};
