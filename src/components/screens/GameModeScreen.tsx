import { motion } from "framer-motion";
import { ArrowLeft, Zap, Layers, Target, Swords, Brain } from "lucide-react";

const games = [
  { icon: Zap, title: "Rapid Fire", desc: "Quick Q&A under time pressure", gradient: "from-destructive to-neon-pink", difficulty: "Medium", screen: "game-rapid" },
  { icon: Layers, title: "Match Cards", desc: "Match concepts to definitions", gradient: "from-neon-purple to-neon-blue", difficulty: "Easy", screen: "game-match" },
  { icon: Target, title: "Weak Spot Drill", desc: "Focus on your weakest topics", gradient: "from-neon-blue to-neon-cyan", difficulty: "Hard", screen: "game-weak" },
  { icon: Swords, title: "Battle Mode", desc: "Compete against NeuroBot AI", gradient: "from-neon-pink to-neon-purple", difficulty: "Medium", screen: "game-battle" },
  { icon: Brain, title: "Panic Game", desc: "Extreme speed revision game", gradient: "from-neon-green to-neon-cyan", difficulty: "Extreme", screen: "game-panic" },
];

interface GameModeScreenProps {
  onNavigate: (screen: string) => void;
}

export const GameModeScreen = ({ onNavigate }: GameModeScreenProps) => {
  return (
    <div className="space-y-4 pb-4">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display gradient-text-primary">Game Mode</h1>
      </motion.div>

      <motion.div className="glass p-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Level 12</span>
          <span className="text-xs font-display text-neon-purple">2,450 XP</span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue" initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ duration: 1, delay: 0.3 }} />
        </div>
      </motion.div>

      <div className="space-y-3">
        {games.map((game, i) => (
          <motion.button
            key={game.title}
            className="glass w-full p-4 flex items-center gap-4 text-left group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onNavigate(game.screen)}
          >
            <div className={`p-3 rounded-2xl bg-gradient-to-br ${game.gradient} shrink-0`}>
              <game.icon size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground">{game.title}</h3>
              <p className="text-[10px] text-muted-foreground">{game.desc}</p>
            </div>
            <span className={`text-[9px] font-medium px-2 py-1 rounded-full ${
              game.difficulty === "Easy" ? "bg-neon-green/10 text-neon-green" :
              game.difficulty === "Medium" ? "bg-neon-blue/10 text-neon-blue" :
              game.difficulty === "Hard" ? "bg-neon-purple/10 text-neon-purple" :
              "bg-destructive/10 text-destructive"
            }`}>
              {game.difficulty}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
