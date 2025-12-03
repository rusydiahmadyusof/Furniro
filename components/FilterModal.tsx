"use client";

import { useState } from "react";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterOptions) => void;
}

interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
}

const FilterModal = ({ isOpen, onClose, onApply }: FilterModalProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000000 });

  const categories = ["Dining", "Living", "Bedroom", "Outdoor", "Decor"];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApply({ categories: selectedCategories, priceRange });
    onClose();
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 10000000 });
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-80 bg-white z-[60] shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-2xl text-black">Filters</h2>
            <button
              onClick={onClose}
              className="text-gray-1 hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              aria-label="Close filters"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-lg text-black mb-4">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-primary focus:ring-primary rounded"
                    />
                    <span className="font-normal text-base text-gray-2">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-lg text-black mb-4">Price Range</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-normal text-sm text-gray-2 mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-normal text-sm text-gray-2 mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: Number(e.target.value) })
                    }
                    className="w-full px-4 py-2 border border-gray-3 rounded-[10px] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button
              onClick={handleReset}
              className="flex-1 border-2 border-gray-5 text-gray-1 font-semibold text-base py-3 rounded hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Reset
            </button>
            <button
              onClick={handleApply}
              className="flex-1 bg-primary text-white font-semibold text-base py-3 rounded hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;

