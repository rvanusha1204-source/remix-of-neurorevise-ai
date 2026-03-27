import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Brain, Clock, Trophy, Zap } from "lucide-react";
import { getRandomQuestions } from "@/lib/questionBank";

interface PanicGameProps {
  onNavigate: (screen: string) => void;
}

const TOTAL = 15;
const GAME_TIME = 60;

export const PanicGame = ({ onNavigate }: PanicGameProps) => {
  const [questions] = useState(() => getRandomQuestions(TOTAL));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(GAME_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [flash, setFlash] = useState<"correct" | "wrong" | null>(null);

  useEffect(() => {
    if (gameOver) return;
    if (timer <= 0) { setGameOver(true); return; }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, gameOver]);

  const handleAnswer = (option: string) => {
    if (gameOver) return;
    const correct = option === questions[current].a;
    setFlash(correct ? "correct" : "wrong");
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      setFlash(null);
      if (current >= questions.length - 1) {
        setGameOver(true);
      } else {
        setCurrent(c => c + 1);
      }
    }, 400);
  };

  if (gameOver) {
    return (
      <div className="space-y-6 pb-4">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onNavigate("game")} className="p-1"><ArrowLeft size={20} className="text-foreground" /></button>
          <h1 className="text-lg font-bold font-display gradient-text-primary">Time's Up!</h1>
        </motion.div>
        <motion.div className="glass p-8 text-center space-y-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Brain size={48} className="text-neon-green mx-auto" />
          <p className="text-3xl font-bold font-display gradient-text-accent">{score}/{current + 1}</p>
          <p className="text-xs text-muted-foreground">Answered in {GAME_TIME - timer}s</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-green">{score}</p>
              <p className="text-[9px] text-muted-foreground">Correct</p>
            </div>
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-purple">{Math.round(score / ((GAME_TIME - timer) || 1) * 60)}</p>
              <p className="text-[9px] text-muted-foreground">Per Min</p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground" whileTap={{ scale: 0.95 }} onClick={() => onNavigate("game")}>Back</motion.button>
            <motion.button className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground" whileTap={{ scale: 0.95 }} onClick={() => { setCurrent(0); setScore(0); setTimer(GAME_TIME); setGameOver(false); }}>Again</motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[current];

  return (
    <div className={`space-y-3 pb-4 transition-colors duration-200 ${flash === "correct" ? "bg-accent/5" : flash === "wrong" ? "bg-destructive/5" : ""}`}>
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("game")} className="p-1"><ArrowLeft size={20} className="text-foreground" /></button>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-neon-green" />
          <span className="text-sm font-display text-neon-green">PANIC</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={14} className={timer <= 10 ? "text-destructive animate-pulse" : "text-neon-green"} />
          <span className={`text-sm font-display ${timer <= 10 ? "text-destructive" : "text-neon-green"}`}>{timer}s</span>
        </div>
      </motion.div>

      <div className="flex justify-between glass p-2">
        <span className="text-xs font-display text-neon-purple">Score: {score}</span>
        <span className="text-xs text-muted-foreground">{current + 1}/{questions.length}</span>
      </div>

      <motion.div className="w-full h-1 rounded-full bg-muted overflow-hidden">
        <motion.div className="h-full bg-neon-green rounded-full" animate={{ width: `${(timer / GAME_TIME) * 100}%` }} transition={{ duration: 0.3 }} />
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={current} className="glass p-5 text-center" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.15 }}>
          <span className="text-[9px] uppercase tracking-widest text-neon-green mb-2 block">{question.subject}</span>
          <p className="text-sm font-semibold text-foreground">{question.q}</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2">
        {question.options?.map((option) => (
          <motion.button
            key={option}
            className="glass p-3 text-xs text-foreground text-center font-medium"
            whileTap={{ scale: 0.92 }}
            onClick={() => handleAnswer(option)}
          >
            {option}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
