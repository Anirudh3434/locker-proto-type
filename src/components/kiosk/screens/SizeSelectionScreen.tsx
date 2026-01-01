import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { SizeCard } from "../SizeCard";
import { ActionButton } from "../ActionButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SizeSelectionScreenProps {
  onSelect: (size: "small" | "medium" | "large") => void;
  onBack: () => void;
}

export const SizeSelectionScreen = ({ onSelect, onBack }: SizeSelectionScreenProps) => {
  const [selectedSize, setSelectedSize] = useState<"small" | "medium" | "large" | null>(null);
  const [userId, setUserId] = useState("");

  const handleContinue = () => {
    if (selectedSize && userId.trim()) {
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
        <div className="text-center mb-8">
          <motion.h2
            className="font-display text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            DELIVER PARCEL
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Enter your details and select parcel size
          </motion.p>
        </div>

        {/* User ID Input */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Label htmlFor="userId" className="text-foreground text-lg mb-3 block">
            User ID
          </Label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="userId"
              type="text"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border focus:border-primary focus:ring-primary"
            />
          </div>
        </motion.div>

        {/* Size Selection Label */}
        <motion.div
          className="mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Label className="text-foreground text-lg">Select Parcel Size</Label>
        </motion.div>

        {/* Size cards */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {(["small", "medium", "large"] as const).map((size, index) => (
            <motion.div
              key={size}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
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
          transition={{ delay: 0.7 }}
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
            disabled={!selectedSize || !userId.trim()}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
