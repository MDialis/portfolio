"use client";

import { useContactForm } from "../hooks/useContactForm";

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  // PadStart ensures we get "01" instead of "1"
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

export default function Contacts() {
  const { formRef, loading, cooldown, handleSubmit } = useContactForm();

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
          
          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
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
                          className="w-4 h-4" // animate-pulse makes it fade in/out slightly
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
