"use client";

import { useContactForm } from "../hooks/useContactForm";
import Button from "./Button";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // PadStart ensures we get "01" instead of "1"
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function ContactForm() {
  const { formRef, loading, cooldown, success, handleSubmit, setSuccessTrue, setSuccessFalse } =
    useContactForm();

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="p-4 bg-success/20 rounded-full">
          {/* Hero Icon: Check Badge */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-16 h-16 text-green-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold">Message Sent!</h3>
          <p className="text-neutral-variant-content/70 mt-2 max-w-xs mx-auto">
            Thanks for reaching out, 
            <span className="font-semibold">friend</span>. I'll get back to you
            as soon as possible.
          </p>
        </div>
        {/* Optional: Button to bring the form back if they really need to send another */}
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-500 hover:underline"
        >
          Send another message
        </button>
        <Button
          text="Send another message"
          onClick={setSuccessFalse}
        />
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {/* --- HIDDEN SUBJECT FIELD --- */}
      <input
        type="hidden"
        name="subject"
        value="[Portfolio Inquiry] New Dev Contact"
        tabIndex={-1}
      />

      {/* --- HONEYPOT FIELD (The Trap) --- */}
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
        <label htmlFor="name" className="block text-sm font-medium mb-1">
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
        <label htmlFor="email" className="block text-sm font-medium mb-1">
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
        <label htmlFor="message" className="block text-sm font-medium mb-1">
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
          {loading ? (
            "Sending..."
          ) : cooldown > 0 ? (
            <div className="flex justify-center items-center gap-2 animate-pulse">
              <span>Hold on</span>
              {/* Tiny Clock Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{formatTime(cooldown)}</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
}
