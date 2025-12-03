"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/images";

const ShareSection = () => {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="font-semibold text-xl text-gray-2 mb-2">
            Share your setup with
          </p>
          <h2 className="font-bold text-4xl md:text-5xl text-gray-1">
            #FuniroFurniture
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {IMAGES.gallery.map((imageUrl, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer"
            >
              <Image
                src={imageUrl}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShareSection;

