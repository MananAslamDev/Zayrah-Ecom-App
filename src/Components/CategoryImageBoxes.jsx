import React from "react";

// Images
import EasternImage from "/images/Categories/eastern.png";
import WesternImage from "/images/Categories/western.png";
import BridalImage from "/images/Categories/bridal.png";

const categories = [
  { name: "Eastern", image: EasternImage },
  { name: "Western", image: WesternImage },
  { name: "Bridal", image: BridalImage },
];

const CategoryImageBoxes = () => {
  return (
    <section className="py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Explore Our Collections
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative bg-white rounded-lg shadow-md overflow-hidden group w-full h-60 md:h-80"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={`${category.name} Collection`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Lightened Overlay */}
              <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300">
                <h3 className="text-xl md:text-2xl font-semibold text-white text-center group-hover:scale-125 transition-transform duration-200">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryImageBoxes;
