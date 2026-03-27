import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Clock, TrendingDown, Brain } from "lucide-react";

const notifications = [
  { icon: AlertTriangle, title: "Memory Decay Alert", desc: "Organic Chemistry strength dropped to 20%", time: "2m ago", type: "urgent" as const },
  { icon: Clock, title: "Review Reminder", desc: "Electrostatics needs revision today", time: "15m ago", type: "warning" as const },
  { icon: TrendingDown, title: "Weak Spot Detected", desc: "English Comprehension declining fast", time: "1h ago", type: "urgent" as const },
  { icon: Brain, title: "New Content Ready", desc: "AI generated 12 flashcards from your upload", time: "2h ago", type: "info" as const },
  { icon: Clock, title: "Streak Reminder", desc: "Complete a session to keep your 12-day streak!", time: "3h ago", type: "info" as const },
];

interface NotificationsScreenProps {
  onNavigate: (screen: string) => void;
}

export const NotificationsScreen = ({ onNavigate }: NotificationsScreenProps) => {
  return (
    <div className="space-y-4 pb-4">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display gradient-text-primary">Notifications</h1>
      </motion.div>

      <div className="space-y-2">
        {notifications.map((notif, i) => (
          <motion.div
            key={i}
            className={`glass p-4 flex items-start gap-3 ${
              notif.type === "urgent" ? "border-destructive/30" : ""
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className={`p-2 rounded-xl shrink-0 ${
              notif.type === "urgent" ? "bg-destructive/10" :
              notif.type === "warning" ? "bg-[hsl(45_90%_55%)]/10" : "bg-neon-blue/10"
            }`}>
              <notif.icon size={16} className={
                notif.type === "urgent" ? "text-destructive" :
                notif.type === "warning" ? "text-[hsl(45,90%,55%)]" : "text-neon-blue"
              } />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground">{notif.title}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{notif.desc}</p>
              <p className="text-[9px] text-muted-foreground/60 mt-1">{notif.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
