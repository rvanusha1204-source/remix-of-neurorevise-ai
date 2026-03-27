import { motion } from "framer-motion";

const nodes = [
  { id: 1, label: "Physics", x: 50, y: 30, strength: 4, color: "neon-green" },
  { id: 2, label: "Chemistry", x: 25, y: 50, strength: 2, color: "destructive" },
  { id: 3, label: "Math", x: 75, y: 50, strength: 5, color: "neon-green" },
  { id: 4, label: "Biology", x: 40, y: 70, strength: 3, color: "neon-blue" },
  { id: 5, label: "English", x: 60, y: 70, strength: 1, color: "destructive" },
  { id: 6, label: "History", x: 50, y: 55, strength: 4, color: "neon-green" },
];

const connections = [
  [1, 2], [1, 3], [2, 4], [3, 6], [4, 5], [5, 6], [1, 6], [2, 6],
];

const SignalBars = ({ strength, size = 12 }: { strength: number; size?: number }) => {
  const bars = 5;
  return (
    <div className="flex items-end gap-[1px]" style={{ height: size }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-500 ${
            i < strength
              ? strength <= 2
                ? "signal-bar-weak"
                : strength <= 3
                ? "signal-bar-medium"
                : "signal-bar-strong"
              : "signal-bar-inactive"
          }`}
          style={{
            width: 2.5,
            height: `${((i + 1) / bars) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export const BrainVisualization = () => {
  return (
    <div className="relative w-full aspect-square max-w-xs mx-auto">
      {/* Ambient glow */}
      <div className="absolute inset-0 rounded-full bg-neon-purple/5 blur-3xl animate-pulse-glow" />
      
      {/* Brain outline */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Connections */}
        {connections.map(([from, to], i) => {
          const fromNode = nodes.find(n => n.id === from)!;
          const toNode = nodes.find(n => n.id === to)!;
          return (
            <motion.line
              key={i}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              stroke="hsl(270 80% 60% / 0.2)"
              strokeWidth={0.3}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: i * 0.1 }}
            />
          );
        })}

        {/* Brain shape - stylized */}
        <motion.ellipse
          cx="50" cy="45" rx="30" ry="28"
          fill="none"
          stroke="hsl(270 80% 60% / 0.15)"
          strokeWidth={0.5}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M 50 17 C 30 17, 20 30, 20 45 C 20 60, 30 73, 50 73 C 70 73, 80 60, 80 45 C 80 30, 70 17, 50 17"
          fill="none"
          stroke="hsl(220 90% 60% / 0.1)"
          strokeWidth={0.3}
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2 }}
        />
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          className="absolute flex flex-col items-center gap-1"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
        >
          <motion.div
            className={`w-3 h-3 rounded-full bg-${node.color} relative`}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          >
            <div className={`absolute inset-0 rounded-full bg-${node.color}/30 animate-ping`} />
          </motion.div>
          <span className="text-[7px] font-medium text-foreground/70 whitespace-nowrap">
            {node.label}
          </span>
          <SignalBars strength={node.strength} size={8} />
        </motion.div>
      ))}
    </div>
  );
};

export { SignalBars };
