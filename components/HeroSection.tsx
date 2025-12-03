"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/images";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] lg:h-[1000px] overflow-hidden mt-[100px]">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.scandinavianInterior}
          alt="Scandinavian Interior"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-beige-bg rounded-lg p-8 md:p-12 max-w-2xl mx-4">
          <div className="text-center space-y-6">
            <p className="font-semibold text-base text-gray-1 tracking-widest uppercase">
              New Arrival
            </p>
            <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl text-primary leading-tight">
              Discover Our
              <br />
              New Collection
            </h2>
            <p className="font-medium text-lg text-gray-1 max-w-md mx-auto">
              Transform your living space with our carefully curated collection of premium furniture. 
              Each piece is designed to bring elegance and comfort to your home.
            </p>
            <button className="bg-primary text-white font-bold text-base uppercase px-16 py-4 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

