import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Package, ThumbsDown, HelpCircle, CheckCircle } from "lucide-react";
import { RatingStars } from "../RatingStars";
import { IssueButton } from "../IssueButton";
import { ActionButton } from "../ActionButton";

interface ReviewScreenProps {
  onComplete: () => void;
}

const issues = [
  { id: "damaged", icon: Package, label: "Damaged" },
  { id: "wrong", icon: AlertTriangle, label: "Wrong Item" },
  { id: "missing", icon: ThumbsDown, label: "Missing" },
  { id: "other", icon: HelpCircle, label: "Other" },
];

export const ReviewScreen = ({ onComplete }: ReviewScreenProps) => {
  const [rating, setRating] = useState(0);
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Auto-complete after showing confirmation
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-full max-w-lg text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!submitted ? (
          <>
            {/* Header */}
            <motion.h2
              className="font-display text-4xl font-bold text-foreground mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              HOW WAS YOUR EXPERIENCE?
            </motion.h2>
            <motion.p
              className="text-lg text-muted-foreground mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Rate your experience and report any issues
            </motion.p>

            {/* Rating stars */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <RatingStars rating={rating} onRate={setRating} />
            </motion.div>

            {/* Issue buttons */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <p className="text-sm text-muted-foreground mb-6">Report an issue (optional)</p>
              <div className="grid grid-cols-4 gap-4">
                {issues.map((issue, index) => (
                  <motion.div
                    key={issue.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <IssueButton
                      icon={issue.icon}
                      label={issue.label}
                      selected={selectedIssue === issue.id}
                      onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Submit button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ActionButton
                icon={CheckCircle}
                label="Submit & Finish"
                variant="primary"
                size="large"
                onClick={handleSubmit}
              />
            </motion.div>
          </>
        ) : (
          /* Confirmation */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-success/10 border border-success/30 flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 0 30px hsl(142 71% 45% / 0.3)",
                  "0 0 60px hsl(142 71% 45% / 0.5)",
                  "0 0 30px hsl(142 71% 45% / 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <CheckCircle size={64} className="text-success" />
              </motion.div>
            </motion.div>

            <h2 className="font-display text-4xl font-bold text-foreground mb-4">
              THANK YOU!
            </h2>
            <p className="text-lg text-muted-foreground">
              Your feedback has been recorded
            </p>

            <motion.p
              className="mt-8 text-sm text-muted-foreground"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Returning to home screen...
            </motion.p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
