import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Layers, Trophy, RotateCcw } from "lucide-react";
import { matchPairs } from "@/lib/questionBank";

interface MatchCardsGameProps {
  onNavigate: (screen: string) => void;
}

interface Card {
  id: string;
  text: string;
  pairId: string;
  type: "term" | "definition";
}

export const MatchCardsGame = ({ onNavigate }: MatchCardsGameProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [selected, setSelected] = useState<Card | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrong, setWrong] = useState<Set<string>>(new Set());
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startTime] = useState(Date.now());
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const pairs = matchPairs.slice(0, 6);
    const allCards: Card[] = [];
    pairs.forEach(p => {
      allCards.push({ id: p.id + "-t", text: p.term, pairId: p.id, type: "term" });
      allCards.push({ id: p.id + "-d", text: p.definition, pairId: p.id, type: "definition" });
    });
    setCards(allCards.sort(() => Math.random() - 0.5));
  }, []);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(interval);
  }, [startTime, gameOver]);

  const handleSelect = (card: Card) => {
    if (matched.has(card.pairId) && matched.has(card.id)) return;
    if (wrong.size > 0) return;

    if (!selected) {
      setSelected(card);
      return;
    }

    if (selected.id === card.id) {
      setSelected(null);
      return;
    }

    setMoves(m => m + 1);

    if (selected.pairId === card.pairId && selected.type !== card.type) {
      setMatched(prev => {
        const next = new Set(prev);
        next.add(selected.id);
        next.add(card.id);
        if (next.size === cards.length) {
          setTimeout(() => setGameOver(true), 500);
        }
        return next;
      });
      setSelected(null);
    } else {
      setWrong(new Set([selected.id, card.id]));
      setTimeout(() => {
        setWrong(new Set());
        setSelected(null);
      }, 800);
    }
  };

  if (gameOver) {
    const stars = moves <= 8 ? 3 : moves <= 12 ? 2 : 1;
    return (
      <div className="space-y-6 pb-4">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onNavigate("game")} className="p-1"><ArrowLeft size={20} className="text-foreground" /></button>
          <h1 className="text-lg font-bold font-display gradient-text-primary">All Matched!</h1>
        </motion.div>
        <motion.div className="glass p-8 text-center space-y-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Trophy size={48} className="text-neon-purple mx-auto" />
          <div className="text-2xl">{"⭐".repeat(stars)}{"☆".repeat(3 - stars)}</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-blue">{moves}</p>
              <p className="text-[9px] text-muted-foreground">Moves</p>
            </div>
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-green">{elapsed}s</p>
              <p className="text-[9px] text-muted-foreground">Time</p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground" whileTap={{ scale: 0.95 }} onClick={() => onNavigate("game")}>Back</motion.button>
            <motion.button className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground" whileTap={{ scale: 0.95 }} onClick={() => window.location.reload()}>Play Again</motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("game")} className="p-1"><ArrowLeft size={20} className="text-foreground" /></button>
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-neon-blue" />
          <span className="text-sm font-display text-neon-blue">Match Cards</span>
        </div>
        <span className="text-xs text-muted-foreground font-display">{moves} moves</span>
      </motion.div>

      <div className="flex justify-between glass p-3">
        <span className="text-xs text-muted-foreground">Matched: {matched.size / 2}/{cards.length / 2}</span>
        <span className="text-xs text-muted-foreground">Time: {elapsed}s</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {cards.map((card, i) => {
          const isMatched = matched.has(card.id);
          const isSelected = selected?.id === card.id;
          const isWrong = wrong.has(card.id);
          return (
            <motion.button
              key={card.id}
              className={`p-3 min-h-[80px] flex items-center justify-center text-center text-[10px] leading-tight rounded-xl border transition-all ${
                isMatched ? "bg-accent/20 border-accent/50 opacity-60" :
                isWrong ? "bg-destructive/20 border-destructive/50" :
                isSelected ? "bg-neon-purple/20 border-neon-purple/50 neon-glow-purple" :
                "glass"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !isMatched && handleSelect(card)}
              disabled={isMatched}
            >
              <span className={`font-medium ${isMatched ? "text-accent" : "text-foreground"}`}>{card.text}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
