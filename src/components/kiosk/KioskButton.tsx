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
  onClick
}: KioskButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative group w-72 h-72 md:w-80 md:h-80 rounded-3xl
        glass-strong flex flex-col items-center justify-center gap-6
        transition-all duration-300 cursor-pointer overflow-hidden
        border-primary/30
      `}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Animated glow background */}
      <motion.div
        className={`
          absolute inset-0 rounded-3xl opacity-0 
          bg-gradient-to-br from-primary/20 to-secondary/10
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
          border-primary/40
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
          bg-gradient-to-r from-primary to-secondary
          text-white
        `}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon size={64} strokeWidth={1.5} />
      </motion.div>

      {/* Labels */}
      <div className="relative z-10 text-center">
        <h3 className="font-display text-2xl font-bold tracking-wider text-black">
          {label}
        </h3>
        {sublabel && (
          <p className="mt-2 text-sm text-muted-foreground">{sublabel}</p>
        )}
      </div>

      {/* Corner accents */}
      <div className={`absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 rounded-tl-lg
        border-primary/50`} />
      <div className={`absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 rounded-tr-lg
        border-primary/50`} />
      <div className={`absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 rounded-bl-lg
        border-primary/50`} />
      <div className={`absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 rounded-br-lg
        border-primary/50`} />
    </motion.button>
  );
};
