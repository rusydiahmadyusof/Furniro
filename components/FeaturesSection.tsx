"use client";

import Image from "next/image";
import { IMAGES } from "@/constants/images";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: IMAGES.logo,
    title: "High Quality",
    description: "crafted from top materials",
  },
  {
    icon: IMAGES.logo,
    title: "Warranty Protection",
    description: "Over 2 years",
  },
  {
    icon: IMAGES.logo,
    title: "Free Shipping",
    description: "Order over 150 $",
  },
  {
    icon: IMAGES.logo,
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-beige-bg py-24 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-15 h-15 flex-shrink-0">
                <Image
                  src={feature.icon}
                  alt={feature.title}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[25px] text-[#242424] mb-1">
                  {feature.title}
                </h3>
                <p className="font-medium text-xl text-gray-3">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

