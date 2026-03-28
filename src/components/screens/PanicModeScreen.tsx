import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ArrowLeft, ArrowRight, Clock, Bookmark, Lightbulb, Zap, ChevronRight } from "lucide-react";

interface PanicModeScreenProps {
  onNavigate: (screen: string) => void;
}

interface TopicData {
  title: string;
  subject: string;
  keyPoints: string[];
  quickTricks: string[];
}

const panicTopics: TopicData[] = [
  {
    title: "Newton's Laws of Motion",
    subject: "Physics",
    keyPoints: [
      "1st Law: Object at rest stays at rest unless acted on by external force",
      "2nd Law: F = ma — Force equals mass times acceleration",
      "3rd Law: Every action has an equal and opposite reaction",
      "Inertia is the tendency of an object to resist change in motion",
    ],
    quickTricks: [
      "🧠 \"FMA\" — Force = Mass × Acceleration",
      "🎯 Think of a seatbelt for 1st law (inertia)",
      "🔄 Rocket pushes gas down → gas pushes rocket up (3rd law)",
    ],
  },
  {
    title: "Cell Biology Basics",
    subject: "Biology",
    keyPoints: [
      "Mitochondria = powerhouse of the cell (ATP production)",
      "Chloroplast = photosynthesis in plant cells",
      "Nucleus contains DNA and controls cell activity",
      "Cell membrane is selectively permeable",
    ],
    quickTricks: [
      "🏭 Mitochondria = \"Mighty\" power factory",
      "🌿 Chloroplast = \"Chloro\" means green = plants",
      "👑 Nucleus = \"Brain\" / \"Boss\" of the cell",
    ],
  },
  {
    title: "Chemical Bonding",
    subject: "Chemistry",
    keyPoints: [
      "Ionic bonds: electron transfer (metals + non-metals)",
      "Covalent bonds: electron sharing (non-metals)",
      "Metallic bonds: sea of delocalized electrons",
      "Electronegativity difference determines bond type",
    ],
    quickTricks: [
      "💍 Ionic = \"I give you\" (electron transfer like a gift)",
      "🤝 Covalent = \"Co-sharing\" (sharing electrons)",
      "🏊 Metallic = electrons swim freely like a pool",
    ],
  },
  {
    title: "Differentiation Rules",
    subject: "Math",
    keyPoints: [
      "Power Rule: d/dx(xⁿ) = nxⁿ⁻¹",
      "Product Rule: d/dx(uv) = u'v + uv'",
      "Chain Rule: d/dx(f(g(x))) = f'(g(x)) · g'(x)",
      "d/dx(sin x) = cos x, d/dx(cos x) = -sin x",
    ],
    quickTricks: [
      "📐 Power Rule: \"Bring down the power, reduce by 1\"",
      "✖️ Product Rule: \"First d-second + second d-first\"",
      "🔗 Chain Rule: \"Outside-inside\" method",
    ],
  },
  {
    title: "Indian Constitution",
    subject: "UPSC/Civics",
    keyPoints: [
      "Part III: Fundamental Rights (Art 14-32)",
      "Part IV: Directive Principles (Art 36-51)",
      "42nd Amendment: \"Mini Constitution\"",
      "Right to Education added by 86th Amendment (Art 21A)",
    ],
    quickTricks: [
      "🏛️ \"FRiDge\" = Fundamental Rights in part III (3 looks like a fridge)",
      "📜 42nd = \"Mini Constitution\" — think 42 = \"for two\" (added so much it was like a second constitution)",
      "✏️ Art 21A = \"21 Always educate\"",
    ],
  },
];

const PANIC_DURATION = 600; // 10 minutes in seconds

export const PanicModeScreen = ({ onNavigate }: PanicModeScreenProps) => {
  const [currentTopic, setCurrentTopic] = useState(0);
  const [timer, setTimer] = useState(PANIC_DURATION);
  const [isActive, setIsActive] = useState(true);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (!isActive || timer <= 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [isActive, timer]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((PANIC_DURATION - timer) / PANIC_DURATION) * 100;
  const urgency = timer <= 60;

  const nextTopic = useCallback(() => {
    setDirection(1);
    setCurrentTopic((c) => (c + 1) % panicTopics.length);
  }, []);

  const prevTopic = useCallback(() => {
    setDirection(-1);
    setCurrentTopic((c) => (c - 1 + panicTopics.length) % panicTopics.length);
  }, []);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -60) nextTopic();
    else if (info.offset.x > 60) prevTopic();
  };

  const topic = panicTopics[currentTopic];

  return (
    <div className="space-y-4 pb-4">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Zap size={16} className={urgency ? "text-neon-orange" : "text-neon-purple"} />
          <span className="text-base font-display gradient-text-primary">⚡ Panic Mode</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {currentTopic + 1}/{panicTopics.length}
        </span>
      </motion.div>

      {/* Timer bar */}
      <motion.div
        className={`glass p-3 transition-all duration-500 ${urgency ? "border-neon-orange/40" : ""}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Clock
              size={14}
              className={urgency ? "text-neon-orange animate-pulse" : "text-muted-foreground"}
            />
            <span className={`text-xs ${urgency ? "text-neon-orange font-bold" : "text-muted-foreground"}`}>
              Time Left
            </span>
          </div>
          <motion.span
            className={`text-lg font-display tabular-nums ${
              urgency ? "text-neon-orange" : "gradient-text-primary"
            }`}
            animate={urgency ? { scale: [1, 1.05, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {formatTime(timer)}
          </motion.span>
        </div>
        <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={`h-full rounded-full transition-colors duration-500 ${
              urgency
                ? "bg-gradient-to-r from-neon-orange to-destructive"
                : "bg-gradient-to-r from-primary to-secondary"
            }`}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Topic indicator */}
      <div className="flex gap-1 justify-center">
        {panicTopics.map((_, i) => (
          <motion.div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === currentTopic ? "w-6 bg-primary" : "w-2 bg-muted hover:bg-muted-foreground/40"
            }`}
            onClick={() => {
              setDirection(i > currentTopic ? 1 : -1);
              setCurrentTopic(i);
            }}
            layout
          />
        ))}
      </div>

      {/* Swipeable content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentTopic}
          className="space-y-4"
          custom={direction}
          initial={{ x: direction * 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 200, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          {/* Topic header */}
          <div className="glass p-4">
            <span className="text-[10px] uppercase tracking-widest text-primary/70 font-semibold">
              {topic.subject}
            </span>
            <h2 className="text-lg font-display text-foreground mt-1">{topic.title}</h2>
          </div>

          {/* Key Points */}
          <div className="glass p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Bookmark size={14} className="text-primary" />
              <h3 className="text-xs font-bold text-primary uppercase tracking-wider">
                📌 Key Points
              </h3>
            </div>
            <div className="space-y-2.5">
              {topic.keyPoints.map((point, i) => (
                <motion.div
                  key={i}
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <p className="text-sm text-foreground/90 leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Tricks */}
          <div className="glass p-4 space-y-3 border-accent/20">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-accent" />
              <h3 className="text-xs font-bold text-accent uppercase tracking-wider">
                💡 Quick Tricks
              </h3>
            </div>
            <div className="space-y-2.5">
              {topic.quickTricks.map((trick, i) => (
                <motion.div
                  key={i}
                  className="glass-subtle p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <p className="text-xs text-foreground/85 leading-relaxed">{trick}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <motion.button
          className="glass-subtle p-3 disabled:opacity-30"
          onClick={prevTopic}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeft size={18} className="text-foreground" />
        </motion.button>
        <motion.button
          className="flex-1 bg-gradient-to-r from-primary to-secondary py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-primary-foreground"
          whileTap={{ scale: 0.97 }}
          onClick={nextTopic}
        >
          Next Topic
          <ChevronRight size={16} />
        </motion.button>
        <motion.button
          className="glass-subtle p-3 disabled:opacity-30"
          onClick={nextTopic}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowRight size={18} className="text-foreground" />
        </motion.button>
      </div>

      {/* Swipe hint */}
      <p className="text-center text-[10px] text-muted-foreground">
        Swipe left/right to navigate • Tap dots to jump
      </p>
    </div>
  );
};
