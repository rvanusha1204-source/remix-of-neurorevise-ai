import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Target, Check, X, Trophy, AlertTriangle } from "lucide-react";
import { getWeakQuestions, Question } from "@/lib/questionBank";

interface WeakSpotGameProps {
  onNavigate: (screen: string) => void;
}

const TOTAL = 8;

export const WeakSpotGame = ({ onNavigate }: WeakSpotGameProps) => {
  const [questions] = useState(() => getWeakQuestions(TOTAL));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const question = questions[current];

  const handleNext = useCallback(() => {
    if (current >= questions.length - 1) {
      setGameOver(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  }, [current, questions.length]);

  const handleAnswer = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    if (option === question.a) {
      setScore(s => s + 1);
    } else {
      setWrong(w => w + 1);
    }
    setTimeout(handleNext, 1500);
  };

  if (gameOver) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="space-y-6 pb-4">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onNavigate("game")} className="p-1"><ArrowLeft size={20} className="text-foreground" /></button>
          <h1 className="text-lg font-bold font-display gradient-text-primary">Drill Complete</h1>
        </motion.div>
        <motion.div className="glass p-8 text-center space-y-4" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Target size={48} className="text-neon-cyan mx-auto" />
          <p className="text-3xl font-bold font-display gradient-text-accent">{percent}%</p>
          <p className="text-xs text-muted-foreground">Accuracy on weak topics</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-accent">{score}</p>
              <p className="text-[9px] text-muted-foreground">Correct</p>
            </div>
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-destructive">{wrong}</p>
              <p className="text-[9px] text-muted-foreground">Wrong</p>
            </div>
          </div>
          {percent < 60 && (
            <div className="flex items-center gap-2 glass-subtle p-3 justify-center">
              <AlertTriangle size={14} className="text-destructive" />
              <span className="text-[10px] text-muted-foreground">These topics need more revision!</span>
            </div>
          )}
          <div className="flex gap-3">
            <motion.button className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground" whileTap={{ scale: 0.95 }} onClick={() => onNavigate("game")}>Back</motion.button>
            <motion.button className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground" whileTap={{ scale: 0.95 }} onClick={() => { setCurrent(0); setScore(0); setWrong(0); setSelected(null); setShowResult(false); setGameOver(false); }}>Retry</motion.button>
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
          <Target size={14} className="text-neon-cyan" />
          <span className="text-sm font-display text-neon-cyan">Weak Spot</span>
        </div>
        <span className="text-xs text-muted-foreground font-display">{current + 1}/{questions.length}</span>
      </motion.div>

      <div className="flex gap-1 justify-center">
        {questions.map((_, i) => (
          <div key={i} className={`h-1 rounded-full transition-all ${i === current ? "w-6 bg-neon-cyan" : i < current ? "w-2 bg-accent" : "w-2 bg-muted"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} className="glass p-6 text-center neon-glow-blue" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
          <span className="text-[9px] uppercase tracking-widest text-neon-cyan mb-3 block">{question.subject} • {question.difficulty}</span>
          <p className="text-base font-semibold text-foreground">{question.q}</p>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-2">
        {question.options?.map((option) => {
          const isCorrect = option === question.a;
          const isSelected = option === selected;
          let extra = "";
          if (showResult && isCorrect) extra = "border-accent bg-accent/10";
          if (showResult && isSelected && !isCorrect) extra = "border-destructive bg-destructive/10";
          return (
            <motion.button key={option} className={`glass w-full p-4 text-left text-sm ${extra}`} whileTap={!showResult ? { scale: 0.98 } : {}} onClick={() => handleAnswer(option)} disabled={showResult}>
              <div className="flex items-center justify-between">
                <span className="text-foreground">{option}</span>
                {showResult && isCorrect && <Check size={16} className="text-accent" />}
                {showResult && isSelected && !isCorrect && <X size={16} className="text-destructive" />}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
