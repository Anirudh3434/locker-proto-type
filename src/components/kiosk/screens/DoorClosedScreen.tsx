import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Package, CheckCircle } from "lucide-react";
import { ActionButton } from "../ActionButton";

interface DoorClosedScreenProps {
  mode: "deliver" | "collect";
  onConfirm: () => void;
}

export const DoorClosedScreen = ({ mode, onConfirm }: DoorClosedScreenProps) => {
  const [doorClosed, setDoorClosed] = useState(false);

  // Simulate door close detection
  useEffect(() => {
    const timer = setTimeout(() => {
      setDoorClosed(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!doorClosed ? (
          /* Waiting for door to close */
          <>
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-warning/10 border border-warning/30 flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 20px hsl(38 92% 50% / 0.2)",
                  "0 0 40px hsl(38 92% 50% / 0.4)",
                  "0 0 20px hsl(38 92% 50% / 0.2)",
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Package size={64} className="text-warning" />
            </motion.div>

            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              CLOSE THE DOOR
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Please close the locker door to continue
            </p>

            {/* Door status indicator */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-warning/30"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="w-3 h-3 rounded-full bg-warning animate-pulse" />
              <span className="text-sm text-warning tracking-wider">DOOR OPEN</span>
            </motion.div>
          </>
        ) : (
          /* Door closed - show confirmation */
          <>
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-3xl bg-success/10 border border-success/30 flex items-center justify-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                boxShadow: [
                  "0 0 20px hsl(142 71% 45% / 0.3)",
                  "0 0 40px hsl(142 71% 45% / 0.5)",
                  "0 0 20px hsl(142 71% 45% / 0.3)",
                ],
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle size={64} className="text-success" />
              </motion.div>
            </motion.div>

            <motion.h2
              className="font-display text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              DOOR CLOSED
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your parcel is secure
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <ActionButton
                icon={mode === "deliver" ? Package : CheckCircle}
                label={mode === "deliver" ? "Confirm Delivery" : "Complete Collection"}
                variant="primary"
                size="large"
                onClick={onConfirm}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};
