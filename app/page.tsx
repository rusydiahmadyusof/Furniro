import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import BrowseTheRange from "@/components/BrowseTheRange";
import OurProducts from "@/components/OurProducts";
import Inspirations from "@/components/Inspirations";
import ShareSection from "@/components/ShareSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BrowseTheRange />
      <OurProducts />
      <Inspirations />
      <ShareSection />
      <Footer />
    </main>
  );
}

