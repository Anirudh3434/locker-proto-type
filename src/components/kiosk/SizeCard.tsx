import { motion } from "framer-motion";
import { Package, PackageOpen, Boxes } from "lucide-react";

interface SizeCardProps {
  size: "small" | "medium" | "large";
  selected: boolean;
  onClick: () => void;
}

const sizeConfig = {
  small: {
    icon: Package,
    label: "Small",
    dimensions: "30 × 40 × 20 cm",
    description: "Documents, small items",
  },
  medium: {
    icon: PackageOpen,
    label: "Medium",
    dimensions: "40 × 50 × 30 cm",
    description: "Boxes, electronics",
  },
  large: {
    icon: Boxes,
    label: "Large",
    dimensions: "50 × 60 × 40 cm",
    description: "Large packages",
  },
};

export const SizeCard = ({ size, selected, onClick }: SizeCardProps) => {
  const config = sizeConfig[size];
  const Icon = config.icon;

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full p-6 rounded-2xl glass transition-all duration-300 cursor-pointer
        ${selected 
          ? "border-2 border-primary bg-primary/10" 
          : "border border-border/50 hover:border-primary/50"
        }
      `}
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Selection indicator */}
      {selected && (
        <motion.div
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-r from-[#320367] to-[#2DC8DA] flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      <motion.div
        className={`
          w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center
          ${selected ? "bg-gradient-to-r from-[#320367] to-[#2DC8DA] text-white" : "bg-transparent text-black"}
        `}
        animate={selected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1.5, repeat: selected ? Infinity : 0 }}
      >
        <Icon size={32} strokeWidth={1.5} />
      </motion.div>

      <h4 className="font-display text-xl font-bold text-black mb-1">
        {config.label}
      </h4>
      <p className="text-sm text-black font-mono mb-2">{config.dimensions}</p>
      <p className="text-xs text-black">{config.description}</p>
    </motion.button>
  );
};
