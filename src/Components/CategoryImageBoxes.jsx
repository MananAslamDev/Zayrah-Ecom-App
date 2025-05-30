import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const boxVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, transition: { duration: 0.5 } },
  };

  const textVariants = {
    initial: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.25, opacity: 1, transition: { duration: 0.3 } },
  };

  const overlayVariants = {
    initial: { background: "rgba(0, 0, 0, 0)" },
    hover: { background: "rgba(0, 0, 0, 0.3)", transition: { duration: 0.3 } },
  };

  return (
    <section className="py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={headingVariants}
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold text-center text-gray-800 mb-8"
        >
          Explore Our Collections
        </motion.h2>
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.div
                key={index}
                variants={boxVariants}
                initial="initial"
                whileHover="hover"
                className="relative bg-white rounded-lg shadow-md overflow-hidden group w-full h-60 md:h-80"
              >
                {/* Image */}
                <motion.img
                  src={category.image}
                  alt={`${category.name} Collection`}
                  className="w-full h-full object-cover"
                  variants={imageVariants}
                />

                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  variants={overlayVariants}
                >
                  <motion.h3
                    className="text-xl md:text-2xl font-semibold text-white text-center"
                    variants={textVariants}
                  >
                    {category.name}
                  </motion.h3>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CategoryImageBoxes;
