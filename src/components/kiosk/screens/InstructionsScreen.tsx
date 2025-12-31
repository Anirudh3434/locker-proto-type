import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, DoorClosed, Lock, CheckCircle } from "lucide-react";
import { InstructionSlide } from "../InstructionSlide";

interface InstructionsScreenProps {
  mode: "deliver" | "collect";
  onComplete: () => void;
}

const deliverInstructions = [
  {
    icon: Package,
    title: "Place Your Parcel",
    description: "Carefully place your parcel inside the locker. Ensure it fits properly without forcing it.",
  },
  {
    icon: DoorClosed,
    title: "Close the Door",
    description: "Gently close the locker door until you hear a click. Make sure it's fully closed.",
  },
  {
    icon: Lock,
    title: "Ensure It's Locked",
    description: "Verify the door is locked by checking the indicator light turns green.",
  },
];

const collectInstructions = [
  {
    icon: Package,
    title: "Collect Your Parcel",
    description: "Carefully remove your parcel from the locker. Check for any items that may have fallen.",
  },
  {
    icon: DoorClosed,
    title: "Close the Door",
    description: "Close the locker door securely after collecting your parcel.",
  },
];

export const InstructionsScreen = ({ mode, onComplete }: InstructionsScreenProps) => {
  const instructions = mode === "deliver" ? deliverInstructions : collectInstructions;
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= instructions.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [instructions.length, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-xl glass-strong rounded-3xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <InstructionSlide
            key={currentStep}
            icon={instructions[currentStep].icon}
            title={instructions[currentStep].title}
            description={instructions[currentStep].description}
            step={currentStep + 1}
            totalSteps={instructions.length}
          />
        </AnimatePresence>
      </motion.div>

      {/* Auto-progress indicator */}
      <motion.div
        className="mt-8 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <CheckCircle size={20} className="text-primary" />
        <span className="text-sm text-muted-foreground">Auto-advancing...</span>
      </motion.div>
    </div>
  );
};
