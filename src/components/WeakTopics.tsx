import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { SignalBars } from "./BrainVisualization";

const weakTopics = [
  { subject: "Organic Chemistry", chapter: "Aldehydes & Ketones", strength: 1, decay: "Fast decay" },
  { subject: "English", chapter: "Comprehension", strength: 2, decay: "Moderate decay" },
  { subject: "Physics", chapter: "Electrostatics", strength: 2, decay: "Needs review" },
];

export const WeakTopics = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle size={14} className="text-destructive" />
        <h3 className="text-sm font-semibold text-foreground">Weak Spots</h3>
      </div>
      {weakTopics.map((topic, i) => (
        <motion.div
          key={topic.chapter}
          className="glass-subtle p-3 flex items-center justify-between"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.1 }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground truncate">{topic.chapter}</p>
            <p className="text-[10px] text-muted-foreground">{topic.subject} · {topic.decay}</p>
          </div>
          <SignalBars strength={topic.strength} size={14} />
        </motion.div>
      ))}
    </div>
  );
};
