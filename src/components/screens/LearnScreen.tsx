import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Eye, Headphones, Brain, Lightbulb, ChevronRight, Play, Pause } from "lucide-react";

const modes = [
  { id: "visual", icon: Eye, label: "Visual", desc: "Diagrams, mind maps, color-coded notes", gradient: "from-neon-blue to-neon-cyan" },
  { id: "audio", icon: Headphones, label: "Audio", desc: "Listen to AI-narrated summaries", gradient: "from-neon-purple to-neon-pink" },
  { id: "logical", icon: Brain, label: "Logical", desc: "Step-by-step problem solving", gradient: "from-neon-green to-neon-cyan" },
  { id: "memory", icon: Lightbulb, label: "Memory Tricks", desc: "Mnemonics, stories, associations", gradient: "from-neon-pink to-neon-purple" },
];

const modeContent: Record<string, { title: string; items: string[] }> = {
  visual: {
    title: "Visual Learning — Organic Chemistry",
    items: [
      "🎨 Color-coded functional groups: OH (blue), COOH (red), NH₂ (green)",
      "📊 Reaction flow: Alcohol → Aldehyde → Carboxylic Acid",
      "🗺️ Mind map: Carbon chains branch into Alkanes, Alkenes, Alkynes",
      "📐 3D molecular geometry: Tetrahedral (sp³), Trigonal planar (sp²)",
    ],
  },
  audio: {
    title: "Audio Summary — Physics",
    items: [
      "🔊 Newton's Laws: 3 core principles of classical mechanics...",
      "🎧 Electromagnetic Induction: Changing magnetic flux creates EMF...",
      "🔉 Wave-Particle Duality: Light behaves as both wave and particle...",
      "🎵 Thermodynamics: Energy cannot be created or destroyed...",
    ],
  },
  logical: {
    title: "Step-by-Step — Calculus",
    items: [
      "Step 1: Identify the function type (polynomial, trig, exponential)",
      "Step 2: Apply the appropriate differentiation rule",
      "Step 3: Simplify using algebraic manipulation",
      "Step 4: Verify by substituting test values",
    ],
  },
  memory: {
    title: "Memory Tricks — Biology",
    items: [
      "🧠 King Philip Came Over For Good Spaghetti (Kingdom → Species)",
      "💡 MRS GREN: Movement, Respiration, Sensitivity, Growth, Reproduction, Excretion, Nutrition",
      "🎭 DNA = Don't Need Advice (Deoxyribonucleic Acid)",
      "🔗 IPMAT: Interphase, Prophase, Metaphase, Anaphase, Telophase",
    ],
  },
};

interface LearnScreenProps {
  onNavigate: (screen: string) => void;
}

export const LearnScreen = ({ onNavigate }: LearnScreenProps) => {
  const [activeMode, setActiveMode] = useState("visual");
  const [isPlaying, setIsPlaying] = useState(false);
  const [sessionProgress, setSessionProgress] = useState(35);

  const content = modeContent[activeMode];

  const handleModeSelect = (modeId: string) => {
    setActiveMode(modeId);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-5 pb-4">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display gradient-text-primary">Adaptive Learning</h1>
      </motion.div>

      <motion.p className="text-xs text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        Choose how you want to learn. AI adapts content to your style.
      </motion.p>

      {/* Mode selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {modes.map((mode) => (
          <motion.button
            key={mode.id}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl shrink-0 transition-all ${
              activeMode === mode.id
                ? "bg-primary text-primary-foreground neon-glow-purple"
                : "glass-subtle text-foreground"
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleModeSelect(mode.id)}
          >
            <mode.icon size={14} />
            <span className="text-[10px] font-medium">{mode.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Active content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeMode}
          className="glass p-5 space-y-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
        >
          <h3 className="text-xs font-semibold text-foreground">{content.title}</h3>
          <div className="space-y-3">
            {content.items.map((item, i) => (
              <motion.div
                key={i}
                className="glass-subtle p-3 text-xs text-foreground/90 leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                {item}
              </motion.div>
            ))}
          </div>

          {activeMode === "audio" && (
            <div className="flex items-center gap-3 glass-subtle p-3">
              <motion.button
                className="p-2 rounded-full bg-primary"
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={14} className="text-primary-foreground" /> : <Play size={14} className="text-primary-foreground" />}
              </motion.button>
              <div className="flex-1">
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-neon-purple"
                    animate={{ width: isPlaying ? "100%" : "0%" }}
                    transition={{ duration: isPlaying ? 30 : 0, ease: "linear" }}
                  />
                </div>
              </div>
              <span className="text-[9px] text-muted-foreground">4:32</span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Continue session */}
      <motion.div className="glass p-4 space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Continue Session</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-cyan flex items-center justify-center">
            <Eye size={20} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-medium text-foreground">Organic Chemistry - Aldehydes</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1 rounded-full bg-muted">
                <motion.div
                  className="h-full rounded-full bg-neon-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${sessionProgress}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">{sessionProgress}%</span>
            </div>
          </div>
          <motion.button
            className="p-2 rounded-xl bg-primary"
            whileTap={{ scale: 0.9 }}
            onClick={() => setSessionProgress(p => Math.min(p + 10, 100))}
          >
            <ChevronRight size={16} className="text-primary-foreground" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};
