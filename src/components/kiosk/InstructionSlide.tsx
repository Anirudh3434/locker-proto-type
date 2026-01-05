import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface InstructionSlideProps {
  icon: LucideIcon;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
}

export const InstructionSlide = ({
  icon: Icon,
  title,
  description,
  step,
  totalSteps,
}: InstructionSlideProps) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-8 p-8"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon with animation */}
      <motion.div
        className="w-32 h-32 rounded-3xl bg-gradient-to-r from-[#320367] to-[#2DC8DA] border-none flex items-center justify-center shadow-none"
      >
        <Icon size={64} className="text-white" strokeWidth={1.5} />
      </motion.div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h3 className="font-display text-2xl font-bold text-foreground mb-4">
          {title}
        </h3>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex gap-3 mt-4">
        {[...Array(totalSteps)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === step - 1 ? "bg-gradient-to-r from-[#320367] to-[#2DC8DA] w-8" : "bg-muted"
            }`}
            animate={i === step - 1 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  );
};
