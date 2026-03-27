import { motion } from "framer-motion";
import { Brain, Flame, Target, TrendingUp } from "lucide-react";

const stats = [
  { icon: Brain, label: "Retention", value: "78%", color: "text-neon-purple", glow: "text-glow-purple" },
  { icon: Flame, label: "Streak", value: "12 days", color: "text-neon-pink", glow: "" },
  { icon: Target, label: "Accuracy", value: "85%", color: "text-neon-blue", glow: "text-glow-blue" },
  { icon: TrendingUp, label: "Growth", value: "+15%", color: "text-neon-green", glow: "text-glow-green" },
];

export const MemoryStats = () => {
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="glass-subtle p-3 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1 }}
        >
          <div className={`p-2 rounded-xl bg-muted ${stat.color}`}>
            <stat.icon size={18} />
          </div>
          <div>
            <p className={`text-lg font-bold font-display ${stat.color} ${stat.glow}`}>{stat.value}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
