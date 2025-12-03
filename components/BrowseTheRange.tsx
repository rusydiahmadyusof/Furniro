"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/images";

interface CategoryCardProps {
  title: string;
  imageUrl: string;
}

const CategoryCard = ({ title, imageUrl }: CategoryCardProps) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <h3 className="font-semibold text-2xl text-gray-1 text-center bg-white/80 px-6 py-2 rounded">
          {title}
        </h3>
      </div>
    </div>
  );
};

const BrowseTheRange = () => {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-bold text-3xl md:text-4xl text-gray-1 mb-4">
            Browse The Range
          </h2>
          <p className="font-normal text-xl text-gray-2 max-w-2xl mx-auto">
            Explore our diverse range of furniture collections, each designed to enhance different 
            areas of your home with style and functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CategoryCard title="Dining" imageUrl={IMAGES.dining} />
          <CategoryCard title="Living" imageUrl={IMAGES.living} />
          <CategoryCard title="Bedroom" imageUrl={IMAGES.bedroom} />
        </div>
      </div>
    </section>
  );
};

export default BrowseTheRange;

