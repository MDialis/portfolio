import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";

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

          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <SocialLinks />
            </div>

            {/* Contact Form Section */}
            <div className="space-y-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}