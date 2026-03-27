import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Flame, Target, TrendingUp, Medal } from "lucide-react";

const rankings = [
  { rank: 1, name: "You", xp: 2450, avatar: "🧠" },
  { rank: 2, name: "Priya", xp: 2380, avatar: "🔬" },
  { rank: 3, name: "Rahul", xp: 2200, avatar: "📐" },
  { rank: 4, name: "Sara", xp: 2100, avatar: "📚" },
  { rank: 5, name: "Arjun", xp: 1950, avatar: "⚡" },
];

interface ProgressScreenProps {
  onNavigate: (screen: string) => void;
}

export const ProgressScreen = ({ onNavigate }: ProgressScreenProps) => {
  return (
    <div className="space-y-5 pb-4">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display gradient-text-primary">Progress</h1>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: Flame, label: "Day Streak", value: "12", color: "text-neon-pink" },
          { icon: Trophy, label: "Total XP", value: "2,450", color: "text-neon-purple" },
          { icon: Target, label: "Accuracy", value: "85%", color: "text-neon-blue" },
          { icon: TrendingUp, label: "Topics Done", value: "48", color: "text-neon-green" },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            className="glass p-4 flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <stat.icon size={20} className={stat.color} />
            <span className={`text-xl font-bold font-display ${stat.color}`}>{stat.value}</span>
            <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Weekly chart mock */}
      <motion.div
        className="glass p-4"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">This Week</h3>
        <div className="flex items-end gap-2 h-24">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-lg bg-gradient-to-t from-neon-purple to-neon-blue"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
            />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} className="flex-1 text-center text-[8px] text-muted-foreground">{d}</span>
          ))}
        </div>
      </motion.div>

      {/* Rankings */}
      <motion.div
        className="glass p-4 space-y-3"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center gap-2">
          <Medal size={14} className="text-neon-purple" />
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Leaderboard</h3>
        </div>
        {rankings.map((user, i) => (
          <div
            key={user.rank}
            className={`flex items-center gap-3 p-2 rounded-xl ${user.rank === 1 ? "bg-neon-purple/10" : ""}`}
          >
            <span className={`text-xs font-display w-5 ${
              user.rank === 1 ? "text-neon-purple" : "text-muted-foreground"
            }`}>#{user.rank}</span>
            <span className="text-lg">{user.avatar}</span>
            <span className="text-xs font-medium text-foreground flex-1">{user.name}</span>
            <span className="text-xs font-display text-muted-foreground">{user.xp} XP</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
