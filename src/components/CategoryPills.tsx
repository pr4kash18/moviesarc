import { useState } from "react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/mockData";

interface CategoryPillsProps {
  onCategoryChange?: (category: string) => void;
}

const CategoryPills = ({ onCategoryChange }: CategoryPillsProps) => {
  const [activeCategory, setActiveCategory] = useState("trending");

  const handleClick = (slug: string) => {
    setActiveCategory(slug);
    onCategoryChange?.(slug);
  };

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="scroll-container gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleClick(category.slug)}
            className={cn(
              "category-pill flex-shrink-0",
              activeCategory === category.slug && "active"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryPills;
