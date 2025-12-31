import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface IssueButtonProps {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}

export const IssueButton = ({ icon: Icon, label, selected, onClick }: IssueButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300
        ${selected 
          ? "glass border-2 border-destructive bg-destructive/10" 
          : "glass border border-border/50 hover:border-destructive/50"
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className={`
          w-14 h-14 rounded-xl flex items-center justify-center
          ${selected ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground"}
        `}
        animate={selected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 1, repeat: selected ? Infinity : 0 }}
      >
        <Icon size={28} strokeWidth={1.5} />
      </motion.div>
      <span className={`text-sm font-medium ${selected ? "text-destructive" : "text-muted-foreground"}`}>
        {label}
      </span>
    </motion.button>
  );
};
