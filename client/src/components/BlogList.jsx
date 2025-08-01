import React, { useState } from "react";
import { blogCategories } from "../assets/assets";
import { motion } from "framer-motion"; // NOTE: Corrected import
import BlogCard from "./BlogCard";
import { useAppContext } from "../context/AppContext";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  // ✅ Handle loading state
  if (!blogs)
    return <p className="text-center my-10 text-gray-500">Loading blogs...</p>;

  // ✅ Combined Filter Function (Category + Search Input)
  const filteredBlogs = () => {
    return blogs.filter((blog) => {
      const matchesCategory = menu === "All" || blog.category === menu;
      const matchesInput =
        input === "" ||
        blog.title.toLowerCase().includes(input.toLowerCase()) ||
        blog.category.toLowerCase().includes(input.toLowerCase());

      return matchesCategory && matchesInput;
    });
  };

  return (
    <div>
      {/* Category Filter Buttons */}
      <div className="flex justify-center gap-4 sm:gap-8 my-10 relative flex-wrap">
        {blogCategories.map((item) => (
          <div key={item} className="relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 font-medium ${
                menu === item && "text-white px-4 pt-0.5"
              }`}
            >
              {item}
              {menu === item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
        {filteredBlogs().length === 0 ? (
          <p className="text-center col-span-full text-gray-400">
            No blogs found.
          </p>
        ) : (
          filteredBlogs().map((blog) => <BlogCard key={blog._id} blog={blog} />)
        )}
      </div>
    </div>
  );
};

export default BlogList;
