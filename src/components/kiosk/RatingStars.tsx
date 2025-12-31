import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  onRate: (rating: number) => void;
}

export const RatingStars = ({ rating, onRate }: RatingStarsProps) => {
  return (
    <div className="flex gap-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          onClick={() => onRate(star)}
          className="p-2 rounded-xl transition-colors duration-200"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: star * 0.1 }}
        >
          <motion.div
            animate={
              star <= rating
                ? {
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }
                : {}
            }
            transition={{ duration: 0.5 }}
          >
            <Star
              size={48}
              className={`transition-colors duration-300 ${
                star <= rating
                  ? "text-warning fill-warning"
                  : "text-muted-foreground"
              }`}
              strokeWidth={1.5}
            />
          </motion.div>
        </motion.button>
      ))}
    </div>
  );
};
