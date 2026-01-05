import { useEffect } from "react";
import { motion } from "framer-motion";
import { LoadingSpinner } from "../LoadingSpinner";

interface FetchingScreenProps {
  onComplete: () => void;
}

export const FetchingScreen = ({ onComplete }: FetchingScreenProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-12">
          <LoadingSpinner text="Fetching Request..." showScanner />
        </div>

        <motion.div
          className="glass-strong rounded-2xl p-6 max-w-sm mx-auto bg-gradient-to-br from-primary/10 via-primary/5 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm text-muted-foreground mb-2">Scanning for</p>
          <p className="font-display text-lg text-foreground">Active Pickup Request</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
