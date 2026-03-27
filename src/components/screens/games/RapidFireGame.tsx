import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, Zap, Check, X, Trophy } from "lucide-react";
import { getRandomQuestions, Question } from "@/lib/questionBank";

interface RapidFireGameProps {
  onNavigate: (screen: string) => void;
}

const TOTAL_QUESTIONS = 10;
const TIME_PER_QUESTION = 10;

export const RapidFireGame = ({ onNavigate }: RapidFireGameProps) => {
  const [questions] = useState(() => getRandomQuestions(TOTAL_QUESTIONS));
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(TIME_PER_QUESTION);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const question = questions[current];

  const handleNext = useCallback(() => {
    if (current >= TOTAL_QUESTIONS - 1) {
      setGameOver(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
      setTimer(TIME_PER_QUESTION);
    }
  }, [current]);

  useEffect(() => {
    if (gameOver || showResult) return;
    if (timer <= 0) {
      setShowResult(true);
      setStreak(0);
      setTimeout(handleNext, 1500);
      return;
    }
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer, gameOver, showResult, handleNext]);

  const handleAnswer = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    const correct = option === question.a;
    if (correct) {
      const timeBonus = Math.ceil(timer * 10);
      setScore(s => s + 100 + timeBonus);
      setStreak(s => {
        const newStreak = s + 1;
        setMaxStreak(m => Math.max(m, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }
    setTimeout(handleNext, 1500);
  };

  if (gameOver) {
    return (
      <div className="space-y-6 pb-4">
        <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <button onClick={() => onNavigate("game")} className="p-1">
            <ArrowLeft size={20} className="text-foreground" />
          </button>
          <h1 className="text-lg font-bold font-display gradient-text-primary">Game Over!</h1>
        </motion.div>

        <motion.div className="glass p-8 text-center space-y-6" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <Trophy size={48} className="text-neon-purple mx-auto" />
          <div>
            <p className="text-3xl font-bold font-display gradient-text-primary">{score}</p>
            <p className="text-xs text-muted-foreground mt-1">Total Score</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-green">{questions.filter((_, i) => i < TOTAL_QUESTIONS).length}</p>
              <p className="text-[9px] text-muted-foreground">Questions</p>
            </div>
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-blue">{maxStreak}</p>
              <p className="text-[9px] text-muted-foreground">Best Streak</p>
            </div>
            <div className="glass-subtle p-3">
              <p className="text-lg font-bold text-neon-pink">{Math.round((score / (TOTAL_QUESTIONS * 200)) * 100)}%</p>
              <p className="text-[9px] text-muted-foreground">Accuracy</p>
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground"
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("game")}
            >
              Back to Games
            </motion.button>
            <motion.button
              className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground"
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrent(0);
                setScore(0);
                setTimer(TIME_PER_QUESTION);
                setSelected(null);
                setShowResult(false);
                setGameOver(false);
                setStreak(0);
                setMaxStreak(0);
              }}
            >
              Play Again
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-4">
      <motion.div className="flex items-center justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("game")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-neon-purple" />
          <span className="text-sm font-display text-neon-purple">Rapid Fire</span>
        </div>
        <span className="text-xs text-muted-foreground font-display">{current + 1}/{TOTAL_QUESTIONS}</span>
      </motion.div>

      {/* Timer + Score bar */}
      <div className="flex items-center justify-between glass p-3">
        <div className="flex items-center gap-2">
          <Clock size={14} className={timer <= 3 ? "text-destructive animate-pulse" : "text-neon-blue"} />
          <span className={`text-sm font-display ${timer <= 3 ? "text-destructive" : "text-foreground"}`}>{timer}s</span>
        </div>
        <div className="flex items-center gap-1">
          {streak > 1 && <span className="text-[9px] text-neon-green font-display">🔥 {streak}x</span>}
        </div>
        <span className="text-sm font-display text-neon-purple">{score} pts</span>
      </div>

      {/* Timer bar */}
      <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${timer <= 3 ? "bg-destructive" : "bg-neon-blue"}`}
          animate={{ width: `${(timer / TIME_PER_QUESTION) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="glass p-6 text-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
        >
          <span className="text-[9px] uppercase tracking-widest text-neon-purple mb-3 block">{question.subject}</span>
          <p className="text-base font-semibold text-foreground">{question.q}</p>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 gap-2">
        {question.options?.map((option) => {
          const isCorrect = option === question.a;
          const isSelected = option === selected;
          let classes = "glass w-full p-4 text-left text-sm transition-all ";
          if (showResult) {
            if (isCorrect) classes += "border-accent bg-accent/10 ";
            else if (isSelected && !isCorrect) classes += "border-destructive bg-destructive/10 ";
          }
          return (
            <motion.button
              key={option}
              className={classes}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => handleAnswer(option)}
              disabled={showResult}
            >
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
