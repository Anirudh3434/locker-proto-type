import { motion } from "framer-motion";
import { Wifi, WifiOff, RefreshCw } from "lucide-react";
import { ActionButton } from "../ActionButton";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { NetworkTracker } from "../NetworkTracker";

interface NetworkConnectionScreenProps {
  onRetry: () => void;
  onBack?: () => void;
}

export const NetworkConnectionScreen = ({ onRetry, onBack }: NetworkConnectionScreenProps) => {
  const { networkStatus, isRetrying, retryConnection, retryCount } = useNetworkStatus();

  const handleRetry = async () => {
    const isConnected = await retryConnection();
    if (isConnected) {
      onRetry();
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
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#320367] to-[#2DC8DA] flex items-center justify-center"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <WifiOff className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h2
            className="font-display text-4xl font-bold text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            NO CONNECTION
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Unable to connect to the network
          </motion.p>
          
          <motion.p
            className="text-base text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Please check your internet connection and try again
          </motion.p>
        </div>

        {/* Connection Status */}
    

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <ActionButton
            icon={RefreshCw}
            label={isRetrying ? "Retrying..." : "Retry Connection"}
            variant="primary"
            onClick={handleRetry}
            disabled={isRetrying}
          />
          
          {onBack && (
            <ActionButton
              label="Back"
              variant="ghost"
              onClick={onBack}
            />
          )}
        </motion.div>

        {/* Auto-retry indicator */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-sm text-muted-foreground">
            Auto-retrying in <span className="text-primary font-medium">10</span> seconds...
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
