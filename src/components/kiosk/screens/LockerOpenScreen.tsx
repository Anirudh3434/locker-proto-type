import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LockerAnimation } from "../LockerAnimation";

interface LockerOpenScreenProps {
  lockerNumber: string;
  onLockerOpened: () => void;
}

export const LockerOpenScreen = ({ lockerNumber, onLockerOpened }: LockerOpenScreenProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    const nextTimer = setTimeout(() => {
      onLockerOpened();
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(nextTimer);
    };
  }, [onLockerOpened]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Status indicator */}
        <motion.div
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-success/30 mb-12"
          animate={{
            boxShadow: [
              "0 0 20px hsl(142 71% 45% / 0.2)",
              "0 0 40px hsl(142 71% 45% / 0.4)",
              "0 0 20px hsl(142 71% 45% / 0.2)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-3 h-3 rounded-full bg-success"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="font-display text-sm tracking-wider text-success">
            LOCKER OPENING
          </span>
        </motion.div>

        {/* Locker animation */}
        <div className="mb-12">
          <LockerAnimation isOpen={isOpen} lockerNumber={lockerNumber} />
        </div>

        {/* Locker number */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="font-display text-5xl font-bold text-foreground mb-4">
            LOCKER <span className="text-gradient">{lockerNumber}</span>
          </h2>
          <p className="text-xl text-muted-foreground">is now open</p>
        </motion.div>
      </motion.div>
    </div>
  );
};
