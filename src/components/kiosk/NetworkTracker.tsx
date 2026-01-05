import { motion } from "framer-motion";
import { Wifi, WifiOff, AlertCircle } from "lucide-react";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";

interface NetworkTrackerProps {
  showDetails?: boolean;
  className?: string;
}

export const NetworkTracker = ({ showDetails = false, className = "" }: NetworkTrackerProps) => {
  const { networkStatus, isRetrying } = useNetworkStatus();

  const getStatusColor = () => {
    if (isRetrying) return "text-yellow-500";
    return networkStatus.isOnline ? "text-green-500" : "text-red-500";
  };

  const getStatusText = () => {
    if (isRetrying) return "Retrying...";
    return networkStatus.isOnline ? "Online" : "Offline";
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.div
        className="relative"
        animate={isRetrying ? { rotate: 360 } : {}}
        transition={{ duration: 1, repeat: isRetrying ? Infinity : 0, ease: "linear" }}
      >
        {networkStatus.isOnline ? (
          <Wifi className={`w-5 h-5 ${getStatusColor()}`} />
        ) : (
          <WifiOff className={`w-5 h-5 ${getStatusColor()}`} />
        )}
      </motion.div>
      
      <span className={`text-sm font-medium ${getStatusColor()}`}>
        {getStatusText()}
      </span>

      {showDetails && (
        <div className="ml-4 text-xs text-muted-foreground">
          <div>Last checked: {networkStatus.lastChecked.toLocaleTimeString()}</div>
          {networkStatus.connectionType && (
            <div>Type: {networkStatus.connectionType}</div>
          )}
          {networkStatus.effectiveType && (
            <div>Speed: {networkStatus.effectiveType}</div>
          )}
        </div>
      )}
    </div>
  );
};

// Network status indicator for the top bar
export const NetworkStatusBar = () => {
  const { networkStatus } = useNetworkStatus();

  return (
    <motion.div
      className="fixed top-12 right-4 z-50 px-3 py-2 rounded-full glass border border-border/50 flex items-center gap-2"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <NetworkTracker />
      {!networkStatus.isOnline && (
        <motion.div
          className="flex items-center gap-1 text-red-500"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-medium">No Internet</span>
        </motion.div>
      )}
    </motion.div>
  );
};
