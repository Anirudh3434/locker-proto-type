import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface KioskButtonProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

export const KioskButton = ({
  icon: Icon,
  label,
  sublabel,
  onClick,
  variant = "primary",
}: KioskButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative group w-full py-6 px-6 rounded-2xl
        flex items-center gap-4
        transition-all duration-300 cursor-pointer overflow-hidden
        ${variant === "primary" 
          ? "bg-card text-card-foreground shadow-lg" 
          : "bg-card/90 text-card-foreground shadow-lg"
        }
      `}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Icon container */}
      <motion.div
        className={`
          relative z-10 p-4 rounded-xl
          ${variant === "primary" 
            ? "bg-primary/10 text-primary" 
            : "bg-secondary/10 text-secondary"
          }
        `}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={32} strokeWidth={2} />
      </motion.div>

      {/* Labels */}
      <div className="relative z-10 text-left flex-1">
        <h3 className="font-display text-lg font-bold tracking-wide text-card-foreground">
          {label}
        </h3>
        {sublabel && (
          <p className="mt-1 text-sm text-muted-foreground">{sublabel}</p>
        )}
      </div>

      {/* Arrow indicator */}
      <motion.div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${variant === "primary" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}
        `}
        animate={{ x: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </motion.div>
    </motion.button>
  );
};
