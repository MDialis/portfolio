"use client";

import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contacts() {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentForm = formRef.current;

    // Safety check: ensure formRef.current exists before sending
    if (!formRef.current) return;
    if (!currentForm) return;

    setLoading(true);

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        formRef.current,
        {
          publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          setLoading(false);
          alert('Message sent successfully!');
          currentForm.reset(); // Clears the form
        },
        (error) => {
          setLoading(false);
          console.error('FAILED...', error);
          alert('Failed to send message. Please try again later.');
        },
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
                />

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
                          ? 'bg-gray-500 cursor-not-allowed text-white'
                          : 'bg-base-dark/70 text-accent hover:bg-accent hover:text-accent-content'
                      }`}
                  >
                    {loading ? 'Sending...' : 'Submit'}
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
