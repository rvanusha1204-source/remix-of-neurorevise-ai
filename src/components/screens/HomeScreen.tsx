import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { BrainVisualization } from "../BrainVisualization";
import { MemoryStats } from "../MemoryStats";
import { WeakTopics } from "../WeakTopics";
import { QuickActions } from "../QuickActions";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export const HomeScreen = ({ onNavigate }: HomeScreenProps) => {
  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <p className="text-xs text-muted-foreground">Welcome back</p>
          <h1 className="text-xl font-bold font-display gradient-text-primary">NeuroRevise</h1>
        </div>
        <motion.button
          className="glass-subtle p-2.5 relative"
          whileTap={{ scale: 0.9 }}
          onClick={() => onNavigate("notifications")}
        >
          <Bell size={18} className="text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-destructive animate-pulse" />
        </motion.button>
      </motion.div>

      {/* Brain Visualization */}
      <motion.div
        className="glass p-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Memory Map</h2>
        <BrainVisualization />
      </motion.div>

      {/* Stats */}
      <MemoryStats />

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Quick Actions</h2>
        <QuickActions onNavigate={onNavigate} />
      </div>

      {/* Weak Topics */}
      <WeakTopics />
    </div>
  );
};
