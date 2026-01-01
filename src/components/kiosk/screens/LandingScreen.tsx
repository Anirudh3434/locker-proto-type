import { motion } from "framer-motion";
import { Package, PackageCheck } from "lucide-react";
import { KioskButton } from "../KioskButton";
interface LandingScreenProps {
  onDeliver: () => void;
  onCollect: () => void;
}
export const LandingScreen = ({
  onDeliver,
  onCollect
}: LandingScreenProps) => {
  return <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
          backgroundImage: `
                linear-gradient(to right, hsl(177 71% 47% / 0.1) 1px, transparent 1px),
                linear-gradient(to bottom, hsl(177 71% 47% / 0.1) 1px, transparent 1px)
              `,
          backgroundSize: "50px 50px"
        }} />
        </div>

        {/* Floating orbs */}
        <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" animate={{
        x: [0, 50, 0],
        y: [0, 30, 0],
        scale: [1, 1.1, 1]
      }} transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
        <motion.div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-secondary/5 blur-3xl" animate={{
        x: [0, -40, 0],
        y: [0, -40, 0],
        scale: [1, 1.2, 1]
      }} transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }} />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo/Title */}
        <motion.div className="text-center mb-16" initial={{
        opacity: 0,
        y: -30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }}>
          <motion.div className="inline-flex items-center gap-4 mb-6" animate={{
          filter: ["drop-shadow(0 0 20px hsl(177 71% 47% / 0.3))", "drop-shadow(0 0 40px hsl(177 71% 47% / 0.5))", "drop-shadow(0 0 20px hsl(177 71% 47% / 0.3))"]
        }} transition={{
          duration: 3,
          repeat: Infinity
        }}>
            <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Package size={36} className="text-primary" />
            </div>
          </motion.div>
          
          <h1 className="font-display text-5xl md:text-6xl font-bold tracking-wider text-gradient mb-4">Lokr</h1>
          <p className="text-lg text-muted-foreground tracking-wide">Locker Bank id: BANK-0001</p>
        </motion.div>

        {/* Main buttons */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <KioskButton icon={Package} label="DELIVER" sublabel="Drop off your parcel" onClick={onDeliver} variant="primary" />
          <KioskButton icon={PackageCheck} label="COLLECT" sublabel="Pick up your parcel" onClick={onCollect} variant="secondary" />
        </div>

        {/* Touch hint */}
        <motion.p className="mt-16 text-sm text-muted-foreground tracking-widest uppercase" animate={{
        opacity: [0.3, 0.7, 0.3]
      }} transition={{
        duration: 2,
        repeat: Infinity
      }}>
          Touch to begin
        </motion.p>
      </div>
    </div>;
};