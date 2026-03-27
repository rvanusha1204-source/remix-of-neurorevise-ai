import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Clock, X, Check, RotateCcw, Trophy } from "lucide-react";
import { getRandomQuestions, Question } from "@/lib/questionBank";

interface PanicModeScreenProps {
  onNavigate: (screen: string) => void;
}

const CARD_COUNT = 10;

export const PanicModeScreen = ({ onNavigate }: PanicModeScreenProps) => {
  const [cards] = useState(() => getRandomQuestions(CARD_COUNT));
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [unknown, setUnknown] = useState<Set<number>>(new Set());
  const [completed, setCompleted] = useState(false);

  const next = () => {
    if (current < cards.length - 1) {
      setDirection(1);
      setFlipped(false);
      setCurrent(c => c + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setDirection(-1);
      setFlipped(false);
      setCurrent(c => c - 1);
    }
  };

  const markKnown = () => {
    setKnown(prev => { const n = new Set(prev); n.add(current); return n; });
    setUnknown(prev => { const n = new Set(prev); n.delete(current); return n; });
    if (current < cards.length - 1) {
      next();
    } else {
      setCompleted(true);
    }
  };

  const markUnknown = () => {
    setUnknown(prev => { const n = new Set(prev); n.add(current); return n; });
    setKnown(prev => { const n = new Set(prev); n.delete(current); return n; });
    if (current < cards.length - 1) {
      next();
    } else {
      setCompleted(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    setCompleted(false);
  };

  if (completed) {
    const knownCount = known.size;
    const unknownCount = cards.length - knownCount;
    return (
      <div className="space-y-6 pb-4">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onNavigate("home")} className="p-1"><X size={20} className="text-foreground" /></button>
          <h1 className="text-lg font-bold font-display gradient-text-primary">Session Complete</h1>
        </motion.div>
        <motion.div className="glass p-8 text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Trophy size={48} className="text-neon-purple mx-auto" />
          <p className="text-2xl font-bold font-display gradient-text-primary">{Math.round((knownCount / cards.length) * 100)}%</p>
          <p className="text-xs text-muted-foreground">Retention Rate</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-subtle p-4">
              <Check size={20} className="text-accent mx-auto mb-1" />
              <p className="text-xl font-bold text-accent">{knownCount}</p>
              <p className="text-[9px] text-muted-foreground">Known</p>
            </div>
            <div className="glass-subtle p-4">
              <X size={20} className="text-destructive mx-auto mb-1" />
              <p className="text-xl font-bold text-destructive">{unknownCount}</p>
              <p className="text-[9px] text-muted-foreground">Need Review</p>
            </div>
          </div>
          {unknownCount > 0 && (
            <div className="glass-subtle p-3 space-y-2">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Topics to review:</p>
              {cards.filter((_, i) => !known.has(i)).map((card, i) => (
                <p key={i} className="text-xs text-foreground">{card.q}</p>
              ))}
            </div>
          )}
          <div className="flex gap-3">
            <motion.button className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground" whileTap={{ scale: 0.95 }} onClick={() => onNavigate("home")}>Done</motion.button>
            <motion.button className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground flex items-center justify-center gap-1" whileTap={{ scale: 0.95 }} onClick={restart}>
              <RotateCcw size={12} /> Retry
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4 relative min-h-[80vh] flex flex-col">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1"><X size={20} className="text-foreground" /></button>
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-destructive" />
          <span className="text-sm font-display text-destructive">PANIC</span>
        </div>
        <span className="text-xs text-muted-foreground font-display">{current + 1}/{cards.length}</span>
      </motion.div>

      <div className="flex gap-1 justify-center">
        {cards.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all duration-300 ${
            i === current ? "w-6 bg-destructive" :
            known.has(i) ? "w-2 bg-accent" :
            unknown.has(i) ? "w-2 bg-destructive/60" :
            i < current ? "w-2 bg-neon-purple" : "w-2 bg-muted"
          }`} />
        ))}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            className="glass p-8 w-full min-h-[250px] flex flex-col items-center justify-center text-center cursor-pointer neon-glow-purple"
            onClick={() => setFlipped(!flipped)}
            custom={direction}
            initial={{ x: direction * 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -direction * 200, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="text-[9px] uppercase tracking-widest text-neon-purple mb-4">{cards[current].subject}</span>
            <AnimatePresence mode="wait">
              {!flipped ? (
                <motion.p key="q" className="text-lg font-semibold text-foreground" initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 90 }}>
                  {cards[current].q}
                </motion.p>
              ) : (
                <motion.p key="a" className="text-xl font-bold font-display gradient-text-accent" initial={{ opacity: 0, rotateY: -90 }} animate={{ opacity: 1, rotateY: 0 }} exit={{ opacity: 0, rotateY: 90 }}>
                  {cards[current].a}
                </motion.p>
              )}
            </AnimatePresence>
            <p className="text-[10px] text-muted-foreground mt-4">Tap to {flipped ? "see question" : "reveal"}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mark buttons */}
      <div className="flex items-center justify-center gap-4">
        <motion.button className="flex items-center gap-2 glass-subtle px-5 py-3 border-destructive/30" whileTap={{ scale: 0.9 }} onClick={markUnknown}>
          <X size={18} className="text-destructive" />
          <span className="text-xs text-destructive font-medium">Don't Know</span>
        </motion.button>
        <motion.button className="flex items-center gap-2 glass-subtle px-5 py-3 border-accent/30" whileTap={{ scale: 0.9 }} onClick={markKnown}>
          <Check size={18} className="text-accent" />
          <span className="text-xs text-accent font-medium">Got It</span>
        </motion.button>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <motion.button className="glass-subtle p-3 disabled:opacity-30" onClick={prev} disabled={current === 0} whileTap={{ scale: 0.9 }}>
          <ChevronLeft size={20} className="text-foreground" />
        </motion.button>
        <motion.button className="glass-subtle p-3 disabled:opacity-30" onClick={next} disabled={current === cards.length - 1} whileTap={{ scale: 0.9 }}>
          <ChevronRight size={20} className="text-foreground" />
        </motion.button>
      </div>
    </div>
  );
};
