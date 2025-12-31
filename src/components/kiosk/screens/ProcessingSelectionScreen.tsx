import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProcessingCard } from "../ProcessingCard";
import { ActionButton } from "../ActionButton";

interface ProcessingSelectionScreenProps {
  onSelect: (type: "standard" | "express") => void;
  onBack: () => void;
}

export const ProcessingSelectionScreen = ({ onSelect, onBack }: ProcessingSelectionScreenProps) => {
  const [selectedType, setSelectedType] = useState<"standard" | "express" | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onSelect(selectedType);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-2xl"
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
            PROCESSING WINDOW
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Select your preferred collection timeframe
          </motion.p>
        </div>

        {/* Progress indicator */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-8 h-2 rounded-full bg-primary" />
          <div className="w-8 h-2 rounded-full bg-primary" />
          <div className="w-8 h-2 rounded-full bg-muted" />
          <div className="w-8 h-2 rounded-full bg-muted" />
        </motion.div>

        {/* Processing cards */}
        <div className="flex flex-col gap-6 mb-12">
          {(["standard", "express"] as const).map((type, index) => (
            <motion.div
              key={type}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <ProcessingCard
                type={type}
                selected={selectedType === type}
                onClick={() => setSelectedType(type)}
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
            disabled={!selectedType}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
