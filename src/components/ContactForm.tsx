"use client";

import { useContactForm } from "../hooks/useContactForm";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Button from "./Button";
import Lottie from "lottie-react";
import successAnimation from "@/assets/SuccessSend.json";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"] });

// --- Form Dictionary ---
const dictionaries = {
  en: {
    nameLabel: "Name",
    namePlaceholder: "John Doe",
    emailLabel: "Email",
    emailPlaceholder: "john@example.com",
    messageLabel: "Message",
    messagePlaceholder: "Let's discuss a secure architecture project...",
    sending: "TRANSMITTING...",
    holdOn: "COOLDOWN",
    submit: "SEND PAYLOAD",
    successTitle: "Transmission Successful",
    successDesc: (
      <>
        Thanks for reaching out. The data packets have been received. I'll get
        back to you shortly.
      </>
    ),
    sendAnother: "Send another message",
  },
  pt: {
    nameLabel: "Nome",
    namePlaceholder: "João Silva",
    emailLabel: "E-mail",
    emailPlaceholder: "joao@exemplo.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "Vamos discutir um projeto de arquitetura segura...",
    sending: "TRANSMITINDO...",
    holdOn: "AGUARDE",
    submit: "ENVIAR PAYLOAD",
    successTitle: "Transmissão Concluída",
    successDesc: (
      <>
        Obrigado pelo contato. Os pacotes de dados foram recebidos. Retornarei
        em breve.
      </>
    ),
    sendAnother: "Enviar outra mensagem",
  },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 15, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  exit: { y: -15, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const FormInput = ({ label, id, as = "input", ...props }: any) => (
  <motion.div variants={itemVariants} className="flex flex-col gap-1 mb-8">
    <label
      htmlFor={id}
      className={`text-xs font-bold tracking-widest uppercase text-foreground ${firaCode.className}`}
    >
      {label} <span className="text-accent">*</span>
    </label>

    {as === "textarea" ? (
      <textarea
        id={id}
        className="w-full py-3 bg-transparent text-foreground placeholder-muted-foreground/30 border-b border-border focus:outline-none focus:border-primary transition-colors resize-none text-sm"
        {...props}
      />
    ) : (
      <input
        id={id}
        className="w-full py-3 bg-transparent text-foreground placeholder-muted-foreground/30 border-b border-border focus:outline-none focus:border-primary transition-colors text-sm"
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
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div variants={itemVariants} className="pt-4">
      <button
        type="submit"
        disabled={loading || cooldown > 0}
        className={`w-full py-3.5 px-6 font-semibold rounded-md transition-all flex justify-center items-center gap-3
          ${
            loading || cooldown > 0
              ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
              : "bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-foreground/10"
          } ${firaCode.className} text-sm tracking-widest uppercase`}
      >
        {loading ? (
          <span className="animate-pulse">{dict.sending}</span>
        ) : cooldown > 0 ? (
          <div className="flex items-center gap-2">
            <span>{dict.holdOn}</span>
            <span className="text-destructive">[{formatTime(cooldown)}]</span>
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
    className="flex flex-col items-center justify-center h-full text-center space-y-6 py-12"
  >
    <div className="w-40 h-40 filter hue-rotate-180 brightness-110">
      <Lottie animationData={successAnimation} loop={false} autoplay={true} />
    </div>
    <motion.div variants={itemVariants}>
      <h3 className="text-2xl font-bold text-foreground mb-2">
        {dict.successTitle}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
        {dict.successDesc}
      </p>
    </motion.div>
    <motion.div variants={itemVariants}>
      <button
        onClick={onReset}
        className={`mt-4 px-6 py-2 border border-border rounded-md text-sm text-foreground hover:bg-muted transition-colors ${firaCode.className}`}
      >
        {dict.sendAnother}
      </button>
    </motion.div>
  </motion.div>
);

export default function ContactForm({ lang }: { lang: string }) {
  const dict =
    dictionaries[lang as keyof typeof dictionaries] || dictionaries.en;
  const { formRef, loading, cooldown, success, handleSubmit, setSuccessFalse } =
    useContactForm();

  return (
    <div className="w-full">
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
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
