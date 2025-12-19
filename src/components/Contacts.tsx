import BackgroundPattern from "./BackgroundPattern";
import ContactForm from "./ContactForm";
import SocialLinks from "./SocialLinks";
  
export default function Contacts() {
  return (
    <section
      id="contact"
      className="relative px-5 bg-neutral-variant text-neutral-variant-content overflow-hidden"
    >
      <BackgroundPattern />

      <div className="relative z-10 flex flex-col w-full min-h-[89vh]">
        <div className="container flex flex-col justify-center grow max-w-5xl mx-auto">
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