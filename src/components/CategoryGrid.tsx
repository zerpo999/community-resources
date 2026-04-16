import { motion } from "framer-motion";
import {
  UtensilsCrossed, Home, Siren, Users, Accessibility,
  DollarSign, Bus, GraduationCap, Scale, Phone, Wifi,
  Stethoscope, Sparkles, AlertTriangle, HelpCircle,
} from "lucide-react";
import { CATEGORIES } from "@/types/resource";

// Map category labels to icons
const labelIconMap: Record<string, React.ElementType> = {
  "Food Assistance": UtensilsCrossed,
  "Healthcare": Stethoscope,
  "Housing": Home,
  "Emergencies": Siren,
  "Seniors": Users,
  "Disabilities": Accessibility,
  "Financial Help": DollarSign,
  "Transportation": Bus,
  "Youth": Sparkles,
  "Legal Services": Scale,
  "Crisis": AlertTriangle,
  "Digital Resources": Wifi,
};

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelect: (categoryLabel: string) => void;
}

const CategoryGrid = ({ selectedCategory, onSelect }: CategoryGridProps) => {
  return (
    <div className="w-full max-w-8xl mx-auto px-4">
      <h2 className="mb-4 text-center text-sm font-semibold tracking-wider text-muted-foreground">
        Looking for something specific? Filter by category to find resources that best fit your needs.
      </h2>

      <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12">
        {CATEGORIES.map((cat, i) => {
          const Icon = labelIconMap[cat.label] || HelpCircle;
          const isSelected = selectedCategory === cat.label;

          return (
            <motion.button
              key={cat.label}
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
                className={`h-5 w-5 transition-colors ${
                  isSelected ? "text-primary" : "text-white"
                }`}
              />
              <span
                className={`text-center text-[11px] font-medium leading-tight ${
                  isSelected ? "text-primary" : "text-white"
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