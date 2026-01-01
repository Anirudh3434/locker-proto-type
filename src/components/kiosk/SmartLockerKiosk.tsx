import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LandingScreen } from "./screens/LandingScreen";
import { BookingIdScreen } from "./screens/UserIdScreen";
import { SizeSelectionScreen } from "./screens/SizeSelectionScreen";
import { LockerOpenScreen } from "./screens/LockerOpenScreen";
import { InstructionsScreen } from "./screens/InstructionsScreen";
import { DoorClosedScreen } from "./screens/DoorClosedScreen";
import { FetchingScreen } from "./screens/FetchingScreen";
import { OTPScreen } from "./screens/OTPScreen";
import { ReviewScreen } from "./screens/ReviewScreen";

type Screen =
  | "landing"
  | "booking-id"
  | "size-selection"
  | "locker-open"
  | "locker-open"
  | "instructions"
  | "door-closed"
  | "fetching"
  | "otp"
  | "collect-locker-open"
  | "collect-instructions"
  | "collect-door-closed"
  | "review";

export const SmartLockerKiosk = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("landing");
  const [mode, setMode] = useState<"deliver" | "collect">("deliver");
  
  // Generate random locker number
  const lockerNumber = "A-" + String(Math.floor(Math.random() * 50) + 1).padStart(2, "0");

  const handleDeliver = () => {
    setMode("deliver");
    setCurrentScreen("booking-id");
  };

  const handleCollect = () => {
    setMode("collect");
    setCurrentScreen("fetching");
  };

  const handleBookingIdContinue = () => {
    setCurrentScreen("size-selection");
  };

  const handleBack = useCallback(() => {
    switch (currentScreen) {
      case "booking-id":
        setCurrentScreen("landing");
        break;
      case "size-selection":
        setCurrentScreen("booking-id");
        break;
      case "otp":
        setCurrentScreen("landing");
        break;
      default:
        setCurrentScreen("landing");
    }
  }, [currentScreen]);

  const handleSizeSelect = () => {
    setCurrentScreen("locker-open");
  };

  const handleLockerOpened = useCallback(() => {
    setCurrentScreen("instructions");
  }, []);

  const handleInstructionsComplete = useCallback(() => {
    setCurrentScreen("door-closed");
  }, []);

  const handleDoorConfirm = () => {
    setCurrentScreen("review");
  };

  const handleFetchingComplete = useCallback(() => {
    setCurrentScreen("otp");
  }, []);

  const handleOTPVerify = () => {
    setCurrentScreen("collect-locker-open");
  };

  const handleCollectLockerOpened = useCallback(() => {
    setCurrentScreen("collect-instructions");
  }, []);

  const handleCollectInstructionsComplete = useCallback(() => {
    setCurrentScreen("collect-door-closed");
  }, []);

  const handleCollectDoorConfirm = () => {
    setCurrentScreen("review");
  };

  const handleReviewComplete = useCallback(() => {
    setCurrentScreen("landing");
  }, []);

  const pageTransition = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.02 },
    transition: { duration: 0.4, ease: "easeInOut" as const },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          {...pageTransition}
          className="min-h-screen"
        >
          {currentScreen === "landing" && (
            <LandingScreen onDeliver={handleDeliver} onCollect={handleCollect} />
          )}

          {currentScreen === "booking-id" && (
            <BookingIdScreen onContinue={handleBookingIdContinue} onBack={handleBack} />
          )}

          {currentScreen === "size-selection" && (
            <SizeSelectionScreen onSelect={handleSizeSelect} onBack={handleBack} />
          )}

          {currentScreen === "locker-open" && (
            <LockerOpenScreen lockerNumber={lockerNumber} onLockerOpened={handleLockerOpened} />
          )}

          {currentScreen === "instructions" && (
            <InstructionsScreen mode="deliver" onComplete={handleInstructionsComplete} />
          )}

          {currentScreen === "door-closed" && (
            <DoorClosedScreen mode="deliver" onConfirm={handleDoorConfirm} />
          )}

          {currentScreen === "fetching" && (
            <FetchingScreen onComplete={handleFetchingComplete} />
          )}

          {currentScreen === "otp" && (
            <OTPScreen onVerify={handleOTPVerify} onBack={handleBack} />
          )}

          {currentScreen === "collect-locker-open" && (
            <LockerOpenScreen lockerNumber={lockerNumber} onLockerOpened={handleCollectLockerOpened} />
          )}

          {currentScreen === "collect-instructions" && (
            <InstructionsScreen mode="collect" onComplete={handleCollectInstructionsComplete} />
          )}

          {currentScreen === "collect-door-closed" && (
            <DoorClosedScreen mode="collect" onConfirm={handleCollectDoorConfirm} />
          )}

          {currentScreen === "review" && (
            <ReviewScreen onComplete={handleReviewComplete} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
