import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

interface OnboardingScreenProps {
  onNavigate: (screen: string) => void;
}

const exams = ["UPSC", "NEET", "KCET", "Boards", "Other"];
const learningStyles = [
  { label: "Visual", emoji: "👁" },
  { label: "Audio", emoji: "👂" },
  { label: "Logical", emoji: "🧠" },
  { label: "Memory Tricks", emoji: "🔢" },
];

export const OnboardingScreen = ({ onNavigate }: OnboardingScreenProps) => {
  const [step, setStep] = useState(0);
  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<Set<string>>(new Set());

  const toggleStyle = (style: string) => {
    setSelectedStyles((prev) => {
      const next = new Set(prev);
      if (next.has(style)) next.delete(style);
      else next.add(style);
      return next;
    });
  };

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else {
      // Save preferences
      localStorage.setItem(
        "neurorevise-prefs",
        JSON.stringify({ exam: selectedExam, styles: [...selectedStyles] })
      );
      localStorage.setItem("neurorevise-onboarded", "true");
      onNavigate("home");
    }
  };

  const canContinue =
    step === 0 || (step === 1 && selectedExam) || (step === 2 && selectedStyles.size > 0);

  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-2">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            className="text-center space-y-6 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
              animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles size={36} className="text-primary-foreground" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-display gradient-text-primary">
                👋 Welcome to NeuroRevise
              </h1>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed max-w-xs mx-auto">
                Your AI-powered study companion. Learn smarter, remember longer, stress less.
              </p>
            </div>
            <motion.div
              className="flex justify-center gap-2 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {["🧠", "⚡", "🎯"].map((emoji, i) => (
                <motion.span
                  key={emoji}
                  className="glass-subtle px-4 py-2 text-lg"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                >
                  {emoji}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="exam"
            className="w-full space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Step 1 of 2</p>
              <h2 className="text-xl font-display text-foreground">
                What are you preparing for?
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {exams.map((exam) => (
                <motion.button
                  key={exam}
                  className={`glass p-4 text-sm font-semibold transition-all duration-300 ${
                    selectedExam === exam
                      ? "border-primary/60 neon-glow-purple text-primary"
                      : "text-foreground hover:border-primary/30"
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedExam(exam)}
                >
                  {exam}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="styles"
            className="w-full space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35 }}
          >
            <div className="text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Step 2 of 2</p>
              <h2 className="text-xl font-display text-foreground">
                How do you learn best?
              </h2>
              <p className="text-xs text-muted-foreground mt-1">Select all that apply</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {learningStyles.map((style) => (
                <motion.button
                  key={style.label}
                  className={`glass p-5 flex flex-col items-center gap-2 transition-all duration-300 ${
                    selectedStyles.has(style.label)
                      ? "border-accent/60 neon-glow-green"
                      : "hover:border-accent/30"
                  }`}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleStyle(style.label)}
                >
                  <span className="text-2xl">{style.emoji}</span>
                  <span
                    className={`text-xs font-semibold ${
                      selectedStyles.has(style.label) ? "text-accent" : "text-foreground"
                    }`}
                  >
                    {style.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <motion.button
        className={`mt-8 w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${
          canContinue
            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground neon-glow-purple"
            : "bg-muted text-muted-foreground"
        }`}
        whileTap={canContinue ? { scale: 0.97 } : {}}
        onClick={handleContinue}
        disabled={!canContinue}
        animate={canContinue ? { boxShadow: ["0 0 20px hsl(260 60% 58% / 0.3)", "0 0 30px hsl(260 60% 58% / 0.5)", "0 0 20px hsl(260 60% 58% / 0.3)"] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {step === 0 ? "Get Started" : step === 2 ? "Start Learning" : "Continue"}
        <ArrowRight size={16} />
      </motion.button>

      {/* Step dots */}
      <div className="flex gap-2 mt-6">
        {[0, 1, 2].map((s) => (
          <motion.div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              s === step ? "w-8 bg-primary" : s < step ? "w-3 bg-primary/40" : "w-3 bg-muted"
            }`}
            layout
          />
        ))}
      </div>
    </div>
  );
};
