import { motion } from "framer-motion";
import {
  UtensilsCrossed, Heart, Home, Siren, Users, Accessibility,
  DollarSign, Bus, GraduationCap, Scale, Phone, Wifi,
} from "lucide-react";
import { CATEGORIES } from "@/types/resource";
import { text } from "stream/consumers";

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
    <div className="w-full max-w-8xl mx-auto px-4">
      <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Filter by Category
      </h2>

      {/* Explicit column counts at breakpoints */}
      <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
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
              className={`group flex flex-col items-center gap-1 rounded-lg border
                p-2 transition-all
                ${
                  isSelected
                    ? "border-primary bg-accent text-white shadow-sm"
                    : "border-transparent bg-category-bg text-muted-foreground hover:border-border hover:bg-category-hover hover:text-foreground"
                }`}
            >
              <Icon
                className={`h-5 w-5 transition-colors text-white ${
                  isSelected ? "text-[hsl(214_62%_53%)]" : "text-[hsl(220_10%_88%)]"
                }`}
              />

              <span
                className={`text-center text-[11px] font-medium leading-tight ${
                  isSelected ? "text-[hsl(214_62%_43%)]" : "text-[hsl(220_10%_88%)]"
                }`}
              >
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
