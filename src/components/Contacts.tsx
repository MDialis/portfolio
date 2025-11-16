export default function Contacts() {
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
              <form className="space-y-4">
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
                    name="name"
                    required
                    className="w-full py-2 bg-white/65 text-black border border-base-300 rounded-xl  focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    name="email"
                    required
                    className="w-full py-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    name="message"
                    rows={4}
                    required
                    className="w-full py-2 bg-white/65 text-black border border-base-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                {/* Form Button */}
                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="w-3/4 md:w-full mx-auto py-2 bg-base-dark/70 text-accent hover:bg-accent hover:text-accent-content font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Submit
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
