import { motion } from "framer-motion";
import {
  UtensilsCrossed, Heart, Home, Siren, Users, Accessibility,
  DollarSign, Bus, GraduationCap, Scale, Phone, Wifi,
} from "lucide-react";
import { CATEGORIES } from "@/types/resource";

const iconMap: Record<string, React.ElementType> = {
  UtensilsCrossed, Heart, Home, Siren, Users, Accessibility,
  DollarSign, Bus, GraduationCap, Scale, Phone, Wifi,
};

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelect: (categoryLabel: string) => void;
}

const CategoryGrid = ({ selectedCategory, onSelect }: CategoryGridProps) => {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Browse by Category
      </h2>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:gap-3">
        {CATEGORIES.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Heart;
          const isSelected = selectedCategory === cat.label;
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              onClick={() => onSelect(cat.label)}
              className={`group flex flex-col items-center gap-2 rounded-xl border p-3 transition-all sm:p-4 ${
                isSelected
                  ? "border-primary bg-accent text-accent-foreground shadow-sm"
                  : "border-transparent bg-category-bg text-muted-foreground hover:border-border hover:bg-category-hover hover:text-foreground"
              }`}
            >
              <Icon className={`h-7 w-7 sm:h-8 sm:w-8 transition-colors ${isSelected ? "text-primary" : "group-hover:text-primary"}`} />
              <span className="text-center text-xs font-medium leading-tight sm:text-sm">
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryGrid;
