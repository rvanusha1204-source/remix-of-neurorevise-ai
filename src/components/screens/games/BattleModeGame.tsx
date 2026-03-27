import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Swords, Check, X, Trophy, User, Bot } from "lucide-react";
import { getRandomQuestions } from "@/lib/questionBank";

interface BattleModeGameProps {
  onNavigate: (screen: string) => void;
}

const TOTAL = 8;

export const BattleModeGame = ({ onNavigate }: BattleModeGameProps) => {
  const [questions] = useState(() => getRandomQuestions(TOTAL));
  const [current, setCurrent] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [botAnswer, setBotAnswer] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);

  const question = questions[current];

  const handleNext = useCallback(() => {
    if (current >= questions.length - 1) {
      setGameOver(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setBotAnswer(null);
      setShowResult(false);
    }
  }, [current, questions.length]);

  const handleAnswer = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);

    // Bot answers with ~60% accuracy
    const botCorrect = Math.random() < 0.6;
    const botPick = botCorrect ? question.a : (question.options?.find(o => o !== question.a) || question.a);
    setBotAnswer(botPick);

    if (option === question.a) setPlayerScore(s => s + 1);
    if (botPick === question.a) setBotScore(s => s + 1);

    setTimeout(handleNext, 2000);
  };

  if (gameOver) {
    const won = playerScore > botScore;
    const tied = playerScore === botScore;
    return (
      <div className="space-y-6 pb-4">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onNavigate("game")} className="p-1"><ArrowLeft size={20} className="text-foreground" /></button>
          <h1 className="text-lg font-bold font-display gradient-text-primary">{tied ? "It's a Tie!" : won ? "You Win!" : "Bot Wins!"}</h1>
        </motion.div>
        <motion.div className="glass p-8 text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Swords size={48} className="text-neon-pink mx-auto" />
          <div className="flex items-center justify-center gap-8">
            <div className="text-center">
              <User size={24} className="text-neon-blue mx-auto mb-2" />
              <p className="text-2xl font-bold font-display text-neon-blue">{playerScore}</p>
              <p className="text-[9px] text-muted-foreground">You</p>
            </div>
            <span className="text-xl font-display text-muted-foreground">vs</span>
            <div className="text-center">
              <Bot size={24} className="text-neon-pink mx-auto mb-2" />
              <p className="text-2xl font-bold font-display text-neon-pink">{botScore}</p>
              <p className="text-[9px] text-muted-foreground">NeuroBot</p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground" whileTap={{ scale: 0.95 }} onClick={() => onNavigate("game")}>Back</motion.button>
            <motion.button className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground" whileTap={{ scale: 0.95 }} onClick={() => { setCurrent(0); setPlayerScore(0); setBotScore(0); setSelected(null); setBotAnswer(null); setShowResult(false); setGameOver(false); }}>Rematch</motion.button>
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
          <Swords size={14} className="text-neon-pink" />
          <span className="text-sm font-display text-neon-pink">Battle</span>
        </div>
        <span className="text-xs text-muted-foreground font-display">{current + 1}/{questions.length}</span>
      </motion.div>

      {/* Score bar */}
      <div className="glass p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <User size={14} className="text-neon-blue" />
          <span className="text-sm font-display text-neon-blue">{playerScore}</span>
        </div>
        <span className="text-xs text-muted-foreground font-display">vs</span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-display text-neon-pink">{botScore}</span>
          <Bot size={14} className="text-neon-pink" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} className="glass p-6 text-center" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}>
          <span className="text-[9px] uppercase tracking-widest text-neon-pink mb-3 block">{question.subject}</span>
          <p className="text-base font-semibold text-foreground">{question.q}</p>
        </motion.div>
      </AnimatePresence>

      {showResult && botAnswer && (
        <motion.div className="glass-subtle p-2 flex items-center gap-2 justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Bot size={12} className="text-neon-pink" />
          <span className="text-[10px] text-muted-foreground">NeuroBot picked: <strong className={botAnswer === question.a ? "text-accent" : "text-destructive"}>{botAnswer}</strong></span>
        </motion.div>
      )}

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
