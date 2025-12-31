import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  text?: string;
  showScanner?: boolean;
}

export const LoadingSpinner = ({ text = "Processing...", showScanner = false }: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      {showScanner ? (
        /* Scanner animation */
        <div className="relative w-48 h-48">
          {/* Scanner frame */}
          <div className="absolute inset-0 rounded-2xl border-2 border-primary/50">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-primary rounded-tl-lg" />
            <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-primary rounded-tr-lg" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-primary rounded-bl-lg" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-primary rounded-br-lg" />
          </div>

          {/* Scanning line */}
          <motion.div
            className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full"
            animate={{
              top: ["10%", "85%", "10%"],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Grid lines */}
          <div className="absolute inset-4 grid grid-cols-3 grid-rows-3 gap-1 opacity-20">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="border border-primary/50 rounded-sm"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Circular spinner */
        <div className="relative w-32 h-32">
          {/* Outer ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-muted"
          />
          
          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />

          {/* Inner pulse */}
          <motion.div
            className="absolute inset-4 rounded-full bg-primary/10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />

          {/* Center dot */}
          <motion.div
            className="absolute inset-1/3 rounded-full bg-primary"
            animate={{
              scale: [1, 1.2, 1],
              boxShadow: [
                "0 0 10px hsl(177 71% 47% / 0.5)",
                "0 0 30px hsl(177 71% 47% / 0.8)",
                "0 0 10px hsl(177 71% 47% / 0.5)",
              ],
            }}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </div>
      )}

      {/* Text */}
      <motion.p
        className="font-display text-xl text-muted-foreground tracking-wider"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </div>
  );
};
