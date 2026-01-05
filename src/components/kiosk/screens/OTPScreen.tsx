import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { OTPInput } from "../OTPInput";
import { ActionButton } from "../ActionButton";
import { LoadingSpinner } from "../LoadingSpinner";

interface OTPScreenProps {
  onVerify: () => void;
  onBack: () => void;
}

export const OTPScreen = ({ onVerify, onBack }: OTPScreenProps) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState(false);

  const handleOTPComplete = (otp: string) => {
    setIsVerifying(true);
    setError(false);
    
    // Simulate verification
    setTimeout(() => {
      // For demo, accept any 6-digit code
      if (otp.length === 6) {
        onVerify();
      } else {
        setError(true);
        setIsVerifying(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-md text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isVerifying ? (
          <div className="py-12">
            <LoadingSpinner text="Verifying..." />
          </div>
        ) : (
          <>
            {/* Header */}
            <motion.div
              className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-r from-[#320367] to-[#2DC8DA] flex items-center justify-center"
            >
              <ShieldCheck size={48} className="text-white" />
            </motion.div>

            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              ENTER OTP
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Enter the 6-digit code from your notification
            </p>

            {/* OTP Input */}
            <div className="mb-8">
              <OTPInput length={6} onComplete={handleOTPComplete} />
            </div>

            {/* Error message */}
            {error && (
              <motion.p
                className="text-destructive mb-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Invalid code. Please try again.
              </motion.p>
            )}

            {/* Back button */}
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ActionButton
                icon={ArrowLeft}
                label="Back"
                variant="ghost"
                onClick={onBack}
              />
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};
