import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import FeaturesSection from "@/components/FeaturesSection";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroBanner
        title="About"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="font-bold text-4xl md:text-5xl text-gray-1 mb-6">
                About Furniro
              </h2>
              <p className="font-normal text-lg text-gray-2 leading-relaxed mb-4">
                Welcome to Furniro, your premier destination for high-quality furniture
                that transforms your living spaces into beautiful, comfortable homes.
              </p>
              <p className="font-normal text-lg text-gray-2 leading-relaxed mb-4">
                Since our founding, we have been committed to providing exceptional
                furniture pieces crafted from the finest materials. Our collection
                includes everything from modern minimalist designs to classic timeless
                pieces, all carefully selected to meet the highest standards of quality
                and style.
              </p>
              <p className="font-normal text-lg text-gray-2 leading-relaxed">
                At Furniro, we believe that furniture is more than just functional
                pieces—it's an expression of your personal style and a reflection of
                your lifestyle. That's why we offer a curated selection of furniture
                that combines aesthetic appeal with practical functionality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div>
                <h3 className="font-semibold text-2xl text-gray-1 mb-4">Our Mission</h3>
                <p className="font-normal text-base text-gray-2 leading-relaxed">
                  To provide high-quality, beautifully designed furniture that enhances
                  your living spaces and brings comfort and style to your home.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-2xl text-gray-1 mb-4">Our Vision</h3>
                <p className="font-normal text-base text-gray-2 leading-relaxed">
                  To become the leading furniture retailer known for quality, customer
                  service, and innovative design solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturesSection />
      <Footer />
    </main>
  );
}

