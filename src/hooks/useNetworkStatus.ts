import { useState, useEffect, useCallback } from 'react';

interface NetworkStatus {
  isOnline: boolean;
  connectionType?: string;
  downlink?: number;
  rtt?: number;
  effectiveType?: string;
  lastChecked: Date;
}

export const useNetworkStatus = () => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: navigator.onLine,
    lastChecked: new Date(),
  });

  const [isRetrying, setIsRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const checkConnection = useCallback(async () => {
    try {
      // Try to fetch a small resource to test actual connectivity
      const response = await fetch('https://httpbin.org/json', {
        method: 'HEAD',
        mode: 'no-cors',
        cache: 'no-cache',
      });

      // If we get here, we have some form of connection
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection;

      setNetworkStatus({
        isOnline: true,
        connectionType: connection?.type,
        downlink: connection?.downlink,
        rtt: connection?.rtt,
        effectiveType: connection?.effectiveType,
        lastChecked: new Date(),
      });

      return true;
    } catch (error) {
      setNetworkStatus({
        isOnline: false,
        lastChecked: new Date(),
      });
      return false;
    }
  }, []);

  const retryConnection = useCallback(async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    const isConnected = await checkConnection();
    
    // Wait a moment before stopping the retry animation
    setTimeout(() => {
      setIsRetrying(false);
    }, 1000);
    
    return isConnected;
  }, [checkConnection]);

  useEffect(() => {
    const handleOnline = () => {
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: true,
        lastChecked: new Date(),
      }));
    };

    const handleOffline = () => {
      setNetworkStatus(prev => ({
        ...prev,
        isOnline: false,
        lastChecked: new Date(),
      }));
    };

    // Listen for browser online/offline events
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check connection on mount
    checkConnection();

    // Set up periodic connection checks
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, [checkConnection]);

  return {
    networkStatus,
    isRetrying,
    retryCount,
    checkConnection,
    retryConnection,
  };
};
