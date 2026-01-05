import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Hash } from "lucide-react";
import { ActionButton } from "../ActionButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookingIdScreenProps {
  onContinue: (bookingId: string) => void;
  onBack: () => void;
}

export const BookingIdScreen = ({ onContinue, onBack }: BookingIdScreenProps) => {
  const [bookingId, setBookingId] = useState("");

  const handleContinue = () => {
    if (bookingId.trim()) {
      onContinue(bookingId.trim());
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
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#320367] to-[#2DC8DA]  flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Hash className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h2
            className="font-display text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            ENTER BOOKING ID
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Please enter your Booking ID to continue
          </motion.p>
        </div>

        {/* User ID Input */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Label htmlFor="bookingId" className="text-foreground text-lg mb-3 block">
            Booking ID
          </Label>
          <Input
            id="bookingId"
            type="text"
            placeholder="Enter your Booking ID"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            className="h-16 text-xl text-center bg-transparent border-border  tracking-wider"
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
            disabled={!bookingId.trim()}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};
