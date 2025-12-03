import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import ContactInfo from "@/components/ContactInfo";
import ContactForm from "@/components/ContactForm";
import FeaturesSection from "@/components/FeaturesSection";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="Contact"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-3xl md:text-4xl text-black mb-4">
              Get In Touch With Us
            </h2>
            <p className="font-normal text-base text-gray-3 max-w-3xl mx-auto">
              For More Information About Our Product & Services. Please Feel Free
              To Drop Us An Email. Our Staff Always Be There To Help You Out. Do
              Not Hesitate!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

