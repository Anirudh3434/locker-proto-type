import { motion } from "framer-motion";
import { Package, PackageCheck } from "lucide-react";
import { KioskButton } from "../KioskButton";

interface LandingScreenProps {
  onDeliver: () => void;
  onCollect: () => void;
}

export const LandingScreen = ({ onDeliver, onCollect }: LandingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Lokr gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, hsl(243 45% 30%) 0%, hsl(243 45% 15%) 100%)",
        }}
      />

      {/* Decorative curved shape at top */}
      <div className="absolute top-0 right-0 w-2/3 h-48 md:h-64">
        <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M400 0 L400 180 Q300 200 200 150 Q100 100 0 180 L0 0 Z"
            fill="hsl(243 45% 40%)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-md mx-auto">
        {/* Logo/Title */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4"
            animate={{ 
              filter: [
                "drop-shadow(0 0 10px hsl(181 58% 45% / 0.3))",
                "drop-shadow(0 0 20px hsl(181 58% 45% / 0.5))",
                "drop-shadow(0 0 10px hsl(181 58% 45% / 0.3))",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Lokr Logo */}
            <div className="flex items-center">
              <div className="w-3 h-10 bg-primary rounded-sm mr-1" />
              <span className="font-display text-4xl md:text-5xl font-bold text-foreground tracking-tight">
                okr
              </span>
            </div>
          </motion.div>
          
          <p className="text-base md:text-lg text-foreground/70 tracking-wide mt-6">
            Smart Locker Solutions
          </p>
        </motion.div>

        {/* Main buttons - stacked for mobile */}
        <div className="flex flex-col gap-6 w-full">
          <KioskButton
            icon={Package}
            label="DELIVER PARCEL"
            sublabel="Drop off your package"
            onClick={onDeliver}
            variant="primary"
          />
          <KioskButton
            icon={PackageCheck}
            label="COLLECT PARCEL"
            sublabel="Pick up your package"
            onClick={onCollect}
            variant="secondary"
          />
        </div>

        {/* Touch hint */}
        <motion.p
          className="mt-12 text-sm text-foreground/50 tracking-widest uppercase"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Touch to begin
        </motion.p>
      </div>

      {/* Decorative curved shape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-40">
        <svg viewBox="0 0 400 100" className="w-full h-full" preserveAspectRatio="none">
          <path
            d="M0 100 L0 20 Q100 0 200 40 Q300 80 400 20 L400 100 Z"
            fill="hsl(181 58% 45%)"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
};
