"use client";

import Image from "next/image";
import Breadcrumb from "./Breadcrumb";
import { IMAGES } from "@/constants/images";

interface HeroBannerProps {
  title: string;
  breadcrumbItems: Array<{ label: string; href?: string }>;
}

const HeroBanner = ({ title, breadcrumbItems }: HeroBannerProps) => {
  return (
    <section className="relative w-full h-[316px] overflow-hidden mt-[100px]">
      <div className="absolute inset-0">
        <Image
          src={IMAGES.heroBanner}
          alt="Hero background"
          fill
          className="object-cover blur-sm opacity-50"
        />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
        <div className="w-20 h-20 relative">
          <Image
            src={IMAGES.logo}
            alt="Furniro Logo"
            fill
            className="object-contain"
          />
        </div>
        <h1 className="font-medium text-4xl md:text-5xl lg:text-6xl text-black">
          {title}
        </h1>
        <Breadcrumb items={breadcrumbItems} />
      </div>
    </section>
  );
};

export default HeroBanner;

