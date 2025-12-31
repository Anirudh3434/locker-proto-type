import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  disabled?: boolean;
}

export const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
  size = "default",
  disabled = false,
}: ActionButtonProps) => {
  const baseStyles = `
    relative flex items-center justify-center gap-3 font-display font-bold
    rounded-xl transition-all duration-300 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeStyles = size === "large" 
    ? "px-12 py-6 text-xl" 
    : "px-8 py-4 text-lg";

  const variantStyles = {
    primary: `
      bg-primary text-primary-foreground
      hover:shadow-[0_0_30px_hsl(177_71%_47%_/_0.5)]
    `,
    secondary: `
      glass border border-primary/30 text-primary
      hover:bg-primary/10 hover:border-primary/50
    `,
    ghost: `
      bg-transparent text-muted-foreground
      hover:text-foreground hover:bg-muted/50
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {variant === "primary" && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-primary"
          animate={{
            boxShadow: [
              "0 0 10px hsl(177 71% 47% / 0.3)",
              "0 0 20px hsl(177 71% 47% / 0.5)",
              "0 0 10px hsl(177 71% 47% / 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <span className="relative z-10 flex items-center gap-3">
        {Icon && <Icon size={size === "large" ? 28 : 24} strokeWidth={2} />}
        {label}
      </span>
    </motion.button>
  );
};
