import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon?: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "large";
  disabled?: boolean;
  className?: string;
}

export const ActionButton = ({
  icon: Icon,
  label,
  onClick,
  variant = "primary",
  size = "default",
  disabled = false,
  className,
}: ActionButtonProps) => {
  const baseStyles = `
    relative flex items-center justify-center gap-3 font-display font-bold
    rounded-xl transition-all duration-300 cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeStyles = size === "large" 
    ? "px-6 py-3 text-xl" 
    : "px-4 py-2 text-lg";

  const variantStyles = {
    primary: `
      bg-gradient-to-r from-[#320367] to-[#2DC8DA] text-white
     
    `,
    secondary: `
      glass border border-primary/30 text-primary
   
    `,
    ghost: `
      bg-transparent text-muted-foreground
  
    `,
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles} ${variantStyles[variant]} ${className || ''}`}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {variant === "primary" && !disabled && (
        <motion.div
          className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#320367] to-[#2DC8DA]"
        />
      )}
      
      <span className="relative z-10 flex items-center gap-3">
        {Icon && <Icon size={size === "large" ? 28 : 24} strokeWidth={2} />}
        {label}
      </span>
    </motion.button>
  );
};
