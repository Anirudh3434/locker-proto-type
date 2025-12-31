import { motion } from "framer-motion";
import { Clock, Zap } from "lucide-react";

interface ProcessingCardProps {
  type: "standard" | "express";
  selected: boolean;
  onClick: () => void;
}

const processingConfig = {
  standard: {
    icon: Clock,
    label: "Standard",
    time: "24 Hours",
    description: "Regular processing time",
    color: "secondary",
  },
  express: {
    icon: Zap,
    label: "Express",
    time: "4 Hours",
    description: "Priority processing",
    color: "primary",
  },
};

export const ProcessingCard = ({ type, selected, onClick }: ProcessingCardProps) => {
  const config = processingConfig[type];
  const Icon = config.icon;
  const isPrimary = config.color === "primary";

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full p-8 rounded-2xl glass transition-all duration-300 cursor-pointer
        ${selected 
          ? isPrimary 
            ? "border-2 border-primary bg-primary/10" 
            : "border-2 border-secondary bg-secondary/10"
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
          className={`absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center
            ${isPrimary ? "bg-primary" : "bg-secondary"}`}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      <div className="flex items-center gap-6">
        <motion.div
          className={`
            w-20 h-20 rounded-2xl flex items-center justify-center
            ${selected 
              ? isPrimary ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
              : isPrimary ? "bg-primary/20 text-primary" : "bg-secondary/20 text-secondary"
            }
          `}
          animate={selected ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 1.5, repeat: selected ? Infinity : 0 }}
        >
          <Icon size={40} strokeWidth={1.5} />
        </motion.div>

        <div className="text-left flex-1">
          <h4 className="font-display text-2xl font-bold text-foreground mb-1">
            {config.label}
          </h4>
          <p className={`text-lg font-bold ${isPrimary ? "text-primary" : "text-secondary"}`}>
            {config.time}
          </p>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>
      </div>
    </motion.button>
  );
};
