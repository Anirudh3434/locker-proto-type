import { motion } from "framer-motion";

interface LockerAnimationProps {
  isOpen: boolean;
  lockerNumber: string;
}

export const LockerAnimation = ({ isOpen, lockerNumber }: LockerAnimationProps) => {
  return (
    <div className="relative w-64 h-80 flex items-center justify-center">
      {/* Locker frame */}
      <div className="relative w-48 h-64 glass-strong rounded-xl border-2 border-primary/30 overflow-hidden">
        {/* Locker number display */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary/20 rounded-md">
          <span className="font-display text-sm font-bold text-primary tracking-wider">
            {lockerNumber}
          </span>
        </div>

        {/* Locker door */}
        <motion.div
          className="absolute inset-0 mt-12 mx-2 mb-2 bg-muted/50 rounded-lg border border-border/50 origin-left"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateY: isOpen ? -75 : 0,
          }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Door handle */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-primary/60 rounded-full" />
          
          {/* Door ventilation slots */}
          <div className="absolute inset-x-6 top-1/4 flex flex-col gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-1 bg-border/30 rounded-full" />
            ))}
          </div>

          {/* Lock indicator */}
          <motion.div
            className={`absolute bottom-4 right-4 w-3 h-3 rounded-full ${
              isOpen ? "bg-success" : "bg-warning"
            }`}
            animate={{
              boxShadow: isOpen
                ? ["0 0 10px hsl(142 71% 45% / 0.5)", "0 0 20px hsl(142 71% 45% / 0.8)", "0 0 10px hsl(142 71% 45% / 0.5)"]
                : ["0 0 10px hsl(38 92% 50% / 0.5)", "0 0 20px hsl(38 92% 50% / 0.8)", "0 0 10px hsl(38 92% 50% / 0.5)"],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>

        {/* Inner locker content (visible when open) */}
        <motion.div
          className="absolute inset-0 mt-12 mx-2 mb-2 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="w-16 h-16 mx-auto mb-2 rounded-full bg-success/20 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <p className="text-xs text-muted-foreground">Ready</p>
          </div>
        </motion.div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none"
        animate={{
          boxShadow: isOpen
            ? ["0 0 40px hsl(142 71% 45% / 0.3)", "0 0 80px hsl(142 71% 45% / 0.5)", "0 0 40px hsl(142 71% 45% / 0.3)"]
            : ["0 0 20px hsl(177 71% 47% / 0.2)", "0 0 40px hsl(177 71% 47% / 0.3)", "0 0 20px hsl(177 71% 47% / 0.2)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
};
