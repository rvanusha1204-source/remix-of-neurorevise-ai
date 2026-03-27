import { motion } from "framer-motion";
import { Zap, Gamepad2, Upload, Brain, MessageCircle, BarChart3 } from "lucide-react";

const actions = [
  { icon: Zap, label: "Panic Mode", gradient: "from-destructive to-neon-pink", screen: "panic" },
  { icon: Gamepad2, label: "Game Mode", gradient: "from-neon-purple to-neon-blue", screen: "game" },
  { icon: Upload, label: "Upload", gradient: "from-neon-blue to-neon-cyan", screen: "upload" },
  { icon: Brain, label: "Learn", gradient: "from-neon-green to-neon-cyan", screen: "learn" },
  { icon: MessageCircle, label: "AI Chat", gradient: "from-neon-purple to-neon-pink", screen: "chat" },
  { icon: BarChart3, label: "Progress", gradient: "from-neon-blue to-neon-green", screen: "progress" },
];

interface QuickActionsProps {
  onNavigate: (screen: string) => void;
}

export const QuickActions = ({ onNavigate }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {actions.map((action, i) => (
        <motion.button
          key={action.label}
          className="glass-subtle p-4 flex flex-col items-center gap-2 group relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.08 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onNavigate(action.screen)}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${action.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
          <div className={`p-2 rounded-xl bg-gradient-to-br ${action.gradient}`}>
            <action.icon size={20} className="text-primary-foreground" />
          </div>
          <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
