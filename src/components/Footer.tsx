export default function Footer() {
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  // Form clear handler
  const handleClear = (e) => {
    e.preventDefault();
    const form = e.target.form;
    if (form) {
      form.reset();
    }
  };

  return (
    <footer className="flex flex-col w-full h-screen bg-secondary text-secondary-content">
      <div className="container grow max-w-7xl mx-auto px-12 py-15">
        <h1 className="text-5xl font-bold text-center py-15">
          Let's keep in touch!
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <div className="space-y-4">
            <h3 className="text-3xl font-bold">Contacts</h3>
            <div className="space-y-2 text-lg">
              <p>(00) 9 9999-9999</p>
              <p>myemail@mail.com</p>
            </div>

            {/* Socials */}
            <div className="flex space-x-4 pt-4">
              <a
                href="https://github.com/MDialis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link to GitHub"
              >
                <img
                  src="/icons/github.svg"
                  alt="GitHub Logo"
                  className="h-8 w-8 hover:opacity-80 transition-opacity"
                />
              </a>
              <a
                href="https://linkedin.com/in/mateus-dialis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Link para o LinkedIn"
              >
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn Logo"
                  className="h-8 w-8 hover:opacity-80 transition-opacity"
                />
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
                  className="block text-sm font-medium mb-1 text-secondary-content"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-secondary-content focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1 text-secondary-content"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-secondary-content focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1 text-secondary-content"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-secondary-content focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Form Buttons */}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="px-6 py-2 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        <div className="border-t border-secondary-content py-4 mx-10 bottom-0">
          <p className="text-center text-sm font-bold">
            © {new Date().getFullYear()} Mateus Diális. All rights reserved.
          </p>
        </div>
    </footer>
  );
}