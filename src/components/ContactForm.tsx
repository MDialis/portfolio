"use client";

import { useContactForm } from "../hooks/useContactForm";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Button from "./Button";
import Lottie from "lottie-react";
import successAnimation from "@/assets/SuccessSend.json";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 },
  },
  exit: {
    y: -20,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const FormInput = ({ label, id, as = "input", ...props }: any) => (
  <motion.div variants={itemVariants}>
    <label htmlFor={id} className="block text-sm font-medium mb-1">
      {label}
    </label>
    {as === "textarea" ? (
      <textarea
        id={id}
        className="w-full p-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    ) : (
      <input
        id={id}
        className="w-full p-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    )}
  </motion.div>
);

const SubmitButton = ({
  loading,
  cooldown,
}: {
  loading: boolean;
  cooldown: number;
}) => {
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // PadStart ensures we get "01" instead of "1"
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <motion.div variants={itemVariants} className="flex space-x-4">
      <button
        type="submit"
        disabled={loading}
        className={`w-3/4 md:w-full mx-auto py-2 font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
          ${
            loading
              ? "bg-base-dark/85 cursor-not-allowed text-white"
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
    </motion.div>
  );
};

const SuccessView = ({ onReset }: { onReset: () => void }) => (
  <motion.div
    key="success-message"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={containerVariants}
    className="flex flex-col items-center justify-center h-full text-center space-y-4"
  >
    <div className="w-50 h-50 filter hue-rotate-20 brightness-80 saturate-200">
      <Lottie animationData={successAnimation} loop={false} autoplay={true} />
    </div>
    <motion.div variants={itemVariants}>
      <h3 className="text-2xl font-bold">Message Sent!</h3>
      <p className="text-neutral-variant-content/70 mt-2 max-w-xs mx-auto">
        Thanks for reaching out, <strong>friend</strong>. I'll get back to you
        as soon as possible.
      </p>
    </motion.div>
    <motion.div variants={itemVariants}>
      <Button text="Send another message" onClick={onReset} />
    </motion.div>
  </motion.div>
);

export default function ContactForm() {
  const {
    formRef,
    loading,
    cooldown,
    success,
    handleSubmit,
    setSuccessTrue,
    setSuccessFalse,
  } = useContactForm();
  return (
    <div className="min-h-[40vh]">
      <AnimatePresence mode="wait" initial={false}>
        {success ? (
          <SuccessView onReset={setSuccessFalse} />
        ) : (
          /* --- FORM STATE --- */
          <motion.form
            key="contact-form"
            ref={formRef}
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="space-y-4"
          >
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

            {/* Visible Fields */}
            <FormInput
              label="Name"
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Your name"
            />

            <FormInput
              label="Email"
              id="email"
              type="email"
              name="email"
              autoComplete="email"
              required
              placeholder="example@email.com"
              pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
            />

            <FormInput
              label="Message"
              id="message"
              name="message"
              as="textarea"
              rows={4}
              required
              placeholder="Hi! I'd like to talk about..."
            />

            <SubmitButton loading={loading} cooldown={cooldown} />
            {/* </form> */}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
