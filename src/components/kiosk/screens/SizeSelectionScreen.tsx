import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SizeCard } from "../SizeCard";
import { ActionButton } from "../ActionButton";

interface SizeSelectionScreenProps {
  onSelect: (size: "small" | "medium" | "large") => void;
  onBack: () => void;
}

export const SizeSelectionScreen = ({ onSelect, onBack }: SizeSelectionScreenProps) => {
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large" | null>(null);

  const handleContinue = () => {
    if (selectedSize) {
      onSelect(selectedSize);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            className="font-display text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            SELECT PARCEL SIZE
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Choose the appropriate size for your parcel
          </motion.p>
        </div>

        {/* Size cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {(["small", "medium", "large"] as const).map((size, index) => (
            <motion.div
              key={size}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <SizeCard
                size={size}
                selected={selectedSize === size}
                onClick={() => setSelectedSize(size)}
              />
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ActionButton
            icon={ArrowLeft}
            label="Back"
            variant="ghost"
            onClick={onBack}
          />
          <ActionButton
            icon={ArrowRight}
            label="Continue"
            variant="primary"
            onClick={handleContinue}
            disabled={!selectedSize}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
