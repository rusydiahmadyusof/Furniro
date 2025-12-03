"use client";

import { useState } from "react";
import FilterModal from "./FilterModal";

type ViewMode = "grid" | "list";

interface FilterOptions {
  categories: string[];
  priceRange: { min: number; max: number };
}

interface ShopFiltersProps {
  totalResults?: number;
  showingFrom?: number;
  showingTo?: number;
  onViewChange?: (view: ViewMode) => void;
  onSortChange?: (sortBy: string) => void;
  onItemsPerPageChange?: (items: number) => void;
  onFilterChange?: (filters: FilterOptions) => void;
}

const ShopFilters = ({
  totalResults = 32,
  showingFrom = 1,
  showingTo = 16,
  onViewChange,
  onSortChange,
  onItemsPerPageChange,
  onFilterChange,
}: ShopFiltersProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showPerPage, setShowPerPage] = useState(16);
  const [sortBy, setSortBy] = useState("Default");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleViewChange = (mode: ViewMode) => {
    setViewMode(mode);
    onViewChange?.(mode);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange?.(value);
  };

  const handleItemsPerPageChange = (value: number) => {
    setShowPerPage(value);
    onItemsPerPageChange?.(value);
  };

  return (
    <div className="bg-white border-b border-gray-5 py-6 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 font-medium text-base text-black hover:text-primary transition-colors"
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="none"
              className="text-black"
            >
              <path
                d="M3 7H21M3 12H21M3 17H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Filter
          </button>
          <FilterModal
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApply={(filters) => {
              onFilterChange?.(filters);
            }}
          />

          <div className="flex items-center gap-2 border-l border-gray-5 pl-6">
            <button
              onClick={() => handleViewChange("grid")}
              className={`p-2 rounded transition-colors ${
                viewMode === "grid"
                  ? "text-primary bg-primary/10"
                  : "text-gray-3 hover:text-primary"
              }`}
              aria-label="Grid view"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3H11V11H3V3ZM13 3H21V11H13V3ZM3 13H11V21H3V13ZM13 13H21V21H13V13Z" />
              </svg>
            </button>
            <button
              onClick={() => handleViewChange("list")}
              className={`p-2 rounded transition-colors ${
                viewMode === "list"
                  ? "text-primary bg-primary/10"
                  : "text-gray-3 hover:text-primary"
              }`}
              aria-label="List view"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 5H21V7H3V5ZM3 11H21V13H3V11ZM3 17H21V19H3V17Z" />
              </svg>
            </button>
          </div>

          <div className="hidden md:block border-l border-gray-5 pl-6">
            <p className="font-normal text-base text-black">
              Showing {showingFrom}–{showingTo} of {totalResults} results
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium text-base text-black">Show</span>
            <select
              value={showPerPage}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="w-[55px] h-[55px] px-3 border border-gray-5 rounded text-center font-medium text-base text-black focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
            >
              <option value={16}>16</option>
              <option value={32}>32</option>
              <option value={48}>48</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-medium text-base text-black">Short by</span>
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-[188px] h-[55px] px-4 border border-gray-5 rounded text-left font-medium text-base text-black focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-1 cursor-pointer"
            >
              <option value="Default">Default</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Price: High to Low">Price: High to Low</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopFilters;

