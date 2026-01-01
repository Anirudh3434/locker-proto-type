import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { ActionButton } from "../ActionButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserIdScreenProps {
  onContinue: (userId: string) => void;
  onBack: () => void;
}

export const UserIdScreen = ({ onContinue, onBack }: UserIdScreenProps) => {
  const [userId, setUserId] = useState("");

  const handleContinue = () => {
    if (userId.trim()) {
      onContinue(userId.trim());
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <User className="w-12 h-12 text-primary" />
          </motion.div>
          <motion.h2
            className="font-display text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ENTER USER ID
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Please enter your User ID to continue
          </motion.p>
        </div>

        {/* User ID Input */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Label htmlFor="userId" className="text-foreground text-lg mb-3 block">
            User ID
          </Label>
          <Input
            id="userId"
            type="text"
            placeholder="Enter your User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="h-16 text-xl text-center bg-card border-border focus:border-primary focus:ring-primary tracking-wider"
            autoFocus
          />
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
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
            disabled={!userId.trim()}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
