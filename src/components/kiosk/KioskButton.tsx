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
        relative group w-72 h-72 md:w-80 md:h-80 rounded-3xl
        glass-strong flex flex-col items-center justify-center gap-6
        transition-all duration-300 cursor-pointer overflow-hidden
        ${variant === "primary" ? "border-primary/30" : "border-secondary/30"}
      `}
      whileHover={{ scale: 1.05, y: -10 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated glow background */}
      <motion.div
        className={`
          absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
          ${variant === "primary" 
            ? "bg-gradient-to-br from-primary/20 to-secondary/10" 
            : "bg-gradient-to-br from-secondary/20 to-primary/10"
          }
        `}
        animate={{
          boxShadow: [
            "0 0 30px hsl(177 71% 47% / 0.2)",
            "0 0 60px hsl(177 71% 47% / 0.4)",
            "0 0 30px hsl(177 71% 47% / 0.2)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulse ring effect */}
      <motion.div
        className={`
          absolute inset-4 rounded-2xl border-2
          ${variant === "primary" ? "border-primary/40" : "border-secondary/40"}
        `}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Icon container with glow */}
      <motion.div
        className={`
          relative z-10 p-6 rounded-2xl
          ${variant === "primary" 
            ? "bg-primary/10 text-primary" 
            : "bg-secondary/10 text-secondary"
          }
        `}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={64} strokeWidth={1.5} />
      </motion.div>

      {/* Labels */}
      <div className="relative z-10 text-center">
        <h3 className="font-display text-2xl font-bold tracking-wider text-foreground">
          {label}
        </h3>
        {sublabel && (
          <p className="mt-2 text-sm text-muted-foreground">{sublabel}</p>
        )}
      </div>

      {/* Corner accents */}
      <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg
        ${variant === "primary" ? "border-primary/50" : "border-secondary/50"}`} />
      <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg
        ${variant === "primary" ? "border-primary/50" : "border-secondary/50"}`} />
      <div className={`absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg
        ${variant === "primary" ? "border-primary/50" : "border-secondary/50"}`} />
      <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg
        ${variant === "primary" ? "border-primary/50" : "border-secondary/50"}`} />
    </motion.button>
  );
};
