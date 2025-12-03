"use client";

import Image from "next/image";
import { useState } from "react";
import { IMAGES } from "@/constants/images";

const Inspirations = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const rooms = [
    {
      id: 1,
      title: "Inner Peace",
      category: "Bed Room",
      imageUrl: IMAGES.innerPeace,
    },
    {
      id: 2,
      title: "Cozy Living",
      category: "Living Room",
      imageUrl: IMAGES.cozyLiving,
    },
    {
      id: 3,
      title: "Modern Dining",
      category: "Dining Room",
      imageUrl: IMAGES.modernDining,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % rooms.length);
  };

  return (
    <section className="py-16 md:py-24 px-6 lg:px-16 bg-cream-bg">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-bold text-4xl md:text-5xl text-gray-1 mb-6">
              50+ Beautiful rooms
              <br />
              inspiration
            </h2>
            <p className="font-medium text-base text-gray-2 mb-8 max-w-md">
              Our designer already made a lot of beautiful prototipe of rooms
              that inspire you
            </p>
            <button className="bg-primary text-white font-semibold text-base px-11 py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Explore More
            </button>
          </div>

          <div className="relative">
            <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-lg">
              <Image
                src={rooms[currentSlide].imageUrl}
                alt={rooms[currentSlide].title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-white/70 backdrop-blur-sm p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-base text-gray-2">
                    {String(currentSlide + 1).padStart(2, "0")}
                  </span>
                  <span className="text-gray-2">—</span>
                  <span className="font-medium text-base text-gray-2">
                    {rooms[currentSlide].category}
                  </span>
                </div>
                <h3 className="font-semibold text-3xl text-gray-1">
                  {rooms[currentSlide].title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {rooms.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentSlide ? "bg-primary" : "bg-gray-5"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="w-12 h-12 rounded-full bg-white border border-primary flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-primary group-hover:text-white"
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Inspirations;

