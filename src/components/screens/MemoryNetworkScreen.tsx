import { motion } from "framer-motion";
import { ArrowLeft, TrendingDown, TrendingUp } from "lucide-react";
import { SignalBars } from "../BrainVisualization";

const subjects = [
  {
    name: "Mathematics",
    strength: 5,
    trend: "up",
    topics: [
      { name: "Calculus", strength: 5 },
      { name: "Algebra", strength: 4 },
      { name: "Probability", strength: 3 },
    ],
  },
  {
    name: "Physics",
    strength: 4,
    trend: "up",
    topics: [
      { name: "Mechanics", strength: 5 },
      { name: "Electrostatics", strength: 2 },
      { name: "Optics", strength: 4 },
    ],
  },
  {
    name: "Chemistry",
    strength: 2,
    trend: "down",
    topics: [
      { name: "Organic", strength: 1 },
      { name: "Inorganic", strength: 3 },
      { name: "Physical", strength: 2 },
    ],
  },
  {
    name: "Biology",
    strength: 3,
    trend: "up",
    topics: [
      { name: "Genetics", strength: 4 },
      { name: "Ecology", strength: 2 },
      { name: "Cell Bio", strength: 3 },
    ],
  },
  {
    name: "English",
    strength: 1,
    trend: "down",
    topics: [
      { name: "Comprehension", strength: 1 },
      { name: "Grammar", strength: 2 },
      { name: "Vocabulary", strength: 1 },
    ],
  },
];

interface MemoryNetworkScreenProps {
  onNavigate: (screen: string) => void;
}

export const MemoryNetworkScreen = ({ onNavigate }: MemoryNetworkScreenProps) => {
  return (
    <div className="space-y-4 pb-4">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display gradient-text-primary">Memory Network</h1>
      </motion.div>

      <div className="space-y-3">
        {subjects.map((subject, i) => (
          <motion.div
            key={subject.name}
            className="glass p-4 space-y-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="text-sm font-semibold text-foreground">{subject.name}</h3>
                {subject.trend === "up" ? (
                  <TrendingUp size={14} className="text-neon-green" />
                ) : (
                  <TrendingDown size={14} className="text-destructive" />
                )}
              </div>
              <SignalBars strength={subject.strength} size={16} />
            </div>

            <div className="space-y-2">
              {subject.topics.map((topic) => (
                <div key={topic.name} className="flex items-center justify-between px-2">
                  <span className="text-xs text-muted-foreground">{topic.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          topic.strength <= 2
                            ? "bg-destructive"
                            : topic.strength <= 3
                            ? "bg-[hsl(45_90%_55%)]"
                            : "bg-accent"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(topic.strength / 5) * 100}%` }}
                        transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <SignalBars strength={topic.strength} size={10} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
