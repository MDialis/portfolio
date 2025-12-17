"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

// --- CONFIGURATION ---
const RATE_LIMIT = 1; // Max 5 submissions
const TIME_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

export default function Contacts() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // Time remaining in seconds

  // Check on mount if the user is already blocked from a previous session
  useEffect(() => {
    checkCooldown();
  }, []);

  // Helper: Checks history and updates cooldown state
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
      const timeUntilExpiry = oldestTimestamp + TIME_WINDOW - now;

      if (timeUntilExpiry > 0) {
        setCooldown(Math.ceil(timeUntilExpiry / 1000));
        return true; // Is blocked
      }
    }

    setCooldown(0);
    return false; // Is not blocked
  };

  // Timer effect: Decrements the cooldown if active
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

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
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
          alert("Message sent successfully!");

          // Record the successful submission
          const history = JSON.parse(localStorage.getItem("email_history") || "[]");
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
          console.error("FAILED...", error);
          alert("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <section
      id="contact"
      className="px-5 bg-neutral-variant text-neutral-variant-content"
    >
      <div className="flex flex-col w-full min-h-screen">
        <div className="container flex flex-col justify-center grow max-w-5xl mx-auto py-20">
          <h1 className="text-5xl font-bold text-center pb-10 md:pb-30">
            Let's keep in touch!
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info Section */}
            <div className="space-y-4">
              <h3 className="text-3xl font-bold hidden md:block">Contacts</h3>
              {/* Socials */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <a
                  href="mailto:dialis.dev@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Link to Gmail"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/icons/gmail.svg"
                    alt="Gmail Logo"
                    className="h-12 w-12"
                  />
                  <p className="font-semibold">My E-mail</p>
                </a>
                <a
                  href="https://t.me/MDialis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Link to Telegram"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/icons/telegram.svg"
                    alt="Telegram Logo"
                    className="h-12 w-12"
                  />
                  <p className="font-semibold">Telegram</p>
                </a>
                <a
                  href="https://github.com/MDialis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Link to GitHub"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/icons/github.svg"
                    alt="GitHub Logo"
                    className="h-12 w-12"
                  />
                  <p className="font-semibold">Github</p>
                </a>
                <a
                  href="https://linkedin.com/in/mateus-dialis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Link para o LinkedIn"
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn Logo"
                    className="h-12 w-12"
                  />
                  <p className="font-semibold">LinkedIn</p>
                </a>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="space-y-4">
              <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
                {/* --- HIDDEN SUBJECT FIELD --- */}
                <input
                  type="hidden"
                  name="subject"
                  value="[Portfolio Inquiry] New Dev Contact"
                  tabIndex={-1}
                />

                {/* --- HONEYPOT FIELD (The Trap) --- */}
                {/* We hide this div so Humans won't see it but Bots will. */}
                <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1] overflow-hidden">
                  <input
                    type="text"
                    name="search_query"
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>

                {/* Name Input */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name" // Match {{name}} in EmailJS template
                    autoComplete="name"
                    required
                    placeholder="Your name"
                    className="w-full p-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email" // Match {{email}} in EmailJS template
                    autoComplete="email"
                    required
                    placeholder="example@email.com"
                    pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                    className="w-full p-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message" // Match {{message}} in EmailJS template
                    rows={4}
                    required
                    placeholder="Hi! I'd like to talk about..."
                    className="w-full p-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Form Button */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-3/4 md:w-full mx-auto py-2 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${
                        loading
                          ? "bg-gray-500 cursor-not-allowed text-white"
                          : "bg-base-dark/70 text-accent hover:bg-accent hover:text-accent-content"
                      }`}
                  >
                    {loading 
                      ? "Sending..." 
                      : cooldown > 0 
                        ? `Wait ${cooldown}s` 
                        : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
