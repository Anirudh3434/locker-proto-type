import { ReactNode, useState, useEffect } from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { NetworkConnectionScreen } from './screens/NetworkConnectionScreen';

interface NetworkAwareWrapperProps {
  children: ReactNode;
  fallbackComponent?: ReactNode;
  showNetworkScreen?: boolean;
  onNetworkRestored?: () => void;
}

export const NetworkAwareWrapper = ({ 
  children, 
  fallbackComponent,
  showNetworkScreen = true,
  onNetworkRestored
}: NetworkAwareWrapperProps) => {
  const { networkStatus } = useNetworkStatus();
  const [wasOffline, setWasOffline] = useState(!networkStatus.isOnline);

  useEffect(() => {
    // Track when we go from offline to online
    if (!networkStatus.isOnline) {
      setWasOffline(true);
    } else if (networkStatus.isOnline && wasOffline) {
      setWasOffline(false);
      onNetworkRestored?.();
    }
  }, [networkStatus.isOnline, wasOffline, onNetworkRestored]);

  // If network is available, show children
  if (networkStatus.isOnline) {
    return <>{children}</>;
  }

  // If network is not available and we should show the network screen
  if (showNetworkScreen) {
    return (
      <NetworkConnectionScreen
        onRetry={() => {
          // The retry logic is handled inside NetworkConnectionScreen
          // This will be called when connection is restored
        }}
      />
    );
  }

  // Otherwise show fallback component
  return <>{fallbackComponent}</>;
};

// Hook to handle network-aware navigation
export const useNetworkNavigation = () => {
  const { networkStatus } = useNetworkStatus();
  const [shouldNavigate, setShouldNavigate] = useState(false);

  const navigateWithNetworkCheck = (callback: () => void) => {
    if (networkStatus.isOnline) {
      callback();
    } else {
      setShouldNavigate(true);
    }
  };

  const clearNavigation = () => {
    setShouldNavigate(false);
  };

  return {
    shouldNavigate,
    navigateWithNetworkCheck,
    clearNavigation,
    isOnline: networkStatus.isOnline,
  };
};
