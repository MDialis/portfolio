"use client";

import { useContactForm } from "../hooks/useContactForm";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Button from "./Button";
import Lottie from "lottie-react";
import successAnimation from "@/assets/SuccessSend.json";

// --- Form Dictionary ---
const dictionaries = {
  en: {
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "example@email.com",
    messageLabel: "Message",
    messagePlaceholder: "Hi! I'd like to talk about...",
    sending: "Sending...",
    holdOn: "Hold on",
    submit: "Submit",
    successTitle: "Message Sent!",
    successDesc: (
      <>Thanks for reaching out, <strong>friend</strong>. I'll get back to you as soon as possible.</>
    ),
    sendAnother: "Send another message",
  },
  pt: {
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "E-mail",
    emailPlaceholder: "exemplo@email.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Olá! Eu gostaria de falar sobre...",
    sending: "Enviando...",
    holdOn: "Aguarde",
    submit: "Enviar",
    successTitle: "Mensagem Enviada!",
    successDesc: (
      <>Obrigado por entrar em contato, <strong>amigo</strong>. Retornarei o mais breve possível.</>
    ),
    sendAnother: "Enviar outra mensagem",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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
  dict,
}: {
  loading: boolean;
  cooldown: number;
  dict: typeof dictionaries.en;
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
          ${loading
            ? "bg-base-dark/85 cursor-not-allowed text-white"
            : "bg-base-dark/70 text-accent hover:bg-accent hover:text-accent-content"
          }`}
      >
        {loading ? (
          dict.sending
        ) : cooldown > 0 ? (
          <div className="flex justify-center items-center gap-2 animate-pulse">
            <span>{dict.holdOn}</span>
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
          dict.submit
        )}
      </button>
    </motion.div>
  );
};

const SuccessView = ({
  onReset,
  dict,
}: {
  onReset: () => void;
  dict: typeof dictionaries.en;
}) => (
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
      <h3 className="text-2xl font-bold">{dict.successTitle}</h3>
      <p className="text-neutral-variant-content/70 mt-2 max-w-xs mx-auto">
        {dict.successDesc}
      </p>
    </motion.div>
    <motion.div variants={itemVariants}>
      <Button text={dict.sendAnother} onClick={onReset} />
    </motion.div>
  </motion.div>
);

export default function ContactForm({ lang }: { lang: string }) {
  const dict = dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;

  const {
    formRef,
    loading,
    cooldown,
    success,
    handleSubmit,
    //  setSuccessTrue,
    setSuccessFalse,
  } = useContactForm();

  return (
    <div className="min-h-[40vh]">
      <AnimatePresence mode="wait" initial={false}>
        {success ? (
          <SuccessView onReset={setSuccessFalse} dict={dict} />
        ) : (
          /* --- FORM STATE --- */
          <motion.div
            key="contact-form"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* --- HIDDEN SUBJECT FIELD --- */}
              <input
                type="hidden"
                name="subject"
                value="[Portfolio Inquiry] New Dev Contact"
                tabIndex={-1}
              />

              <div className="opacity-0 absolute top-0 left-0 h-0 w-0 z-[-1] overflow-hidden">
                <input
                  type="text"
                  name="search_query"
                  autoComplete="off"
                  aria-hidden="true"
                  tabIndex={-1}
                />
              </div>

              {/* Visible Fields */}
              <FormInput
                label={dict.nameLabel}
                id="name"
                name="name"
                autoComplete="name"
                required
                placeholder={dict.namePlaceholder}
              />

              <FormInput
                label={dict.emailLabel}
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder={dict.emailPlaceholder}
                pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
              />

              <FormInput
                label={dict.messageLabel}
                id="message"
                name="message"
                as="textarea"
                rows={4}
                required
                placeholder={dict.messagePlaceholder}
              />

              <SubmitButton loading={loading} cooldown={cooldown} dict={dict} />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}