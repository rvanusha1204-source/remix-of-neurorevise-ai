import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, Sparkles, BookOpen, Lightbulb, ListOrdered } from "lucide-react";

const quickButtons = [
  { icon: Sparkles, label: "Simplify", prompt: "Can you simplify this?" },
  { icon: Lightbulb, label: "Example", prompt: "Give me a real-world example" },
  { icon: ListOrdered, label: "Step-by-step", prompt: "Explain step by step" },
  { icon: BookOpen, label: "Explain", prompt: "Explain this concept in detail" },
];

interface Message {
  role: "ai" | "user";
  text: string;
}

const aiResponses: Record<string, string> = {
  "default": "That's a great question! Based on memory science, spaced repetition helps strengthen neural pathways. Would you like me to break this down further? 🧠",
  "simplify": "Here's the simple version: Think of your brain like a muscle. The more you practice recalling something, the stronger that memory gets. That's basically spaced repetition! 💪",
  "example": "Real-world example: Imagine learning to ride a bike. The first time is hard, but each practice session makes it easier. Your brain is literally building stronger connections each time! 🚴",
  "step-by-step": "Step-by-step breakdown:\n1️⃣ First exposure — your brain creates a new pathway\n2️⃣ Review after 1 day — pathway gets reinforced\n3️⃣ Review after 3 days — starting to stick\n4️⃣ Review after 7 days — moving to long-term\n5️⃣ Review after 30 days — nearly permanent! ✅",
  "explain": "Let me explain in depth: Memory consolidation happens during sleep and active recall. When you study, neurons fire together creating temporary connections. Through repeated exposure at optimal intervals, these become permanent long-term memories. This is why cramming doesn't work — you need time between sessions! 📚",
  "derivative": "The derivative measures the rate of change of a function. For sin(x), the derivative is cos(x). Think of it as: if sin(x) tells you your position on a wave, cos(x) tells you your velocity! 📐",
  "newton": "Newton's laws are the foundation of classical mechanics:\n• 1st: Objects stay at rest or in motion unless acted upon\n• 2nd: F = ma (Force equals mass times acceleration)\n• 3rd: Every action has an equal and opposite reaction ⚡",
  "mitochondria": "The mitochondria is the powerhouse of the cell! It produces ATP (adenosine triphosphate) through cellular respiration. Think of it as a tiny power plant inside every cell, converting glucose and oxygen into energy your body can use. 🔋",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("simplif")) return aiResponses["simplify"];
  if (lower.includes("example")) return aiResponses["example"];
  if (lower.includes("step")) return aiResponses["step-by-step"];
  if (lower.includes("explain")) return aiResponses["explain"];
  if (lower.includes("deriv") || lower.includes("sin") || lower.includes("calculus")) return aiResponses["derivative"];
  if (lower.includes("newton") || lower.includes("force") || lower.includes("f = ma")) return aiResponses["newton"];
  if (lower.includes("mitochond") || lower.includes("cell") || lower.includes("atp")) return aiResponses["mitochondria"];
  return aiResponses["default"];
}

interface ChatScreenProps {
  onNavigate: (screen: string) => void;
}

export const ChatScreen = ({ onNavigate }: ChatScreenProps) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Hi! I'm your AI study buddy. Ask me anything about your subjects — Math, Physics, Chemistry, Biology. I'll help you understand! 🧠" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    setTimeout(() => {
      const response = getAIResponse(text);
      setMessages(prev => [...prev, { role: "ai", text: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <motion.div className="flex items-center gap-3 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center">
            <Sparkles size={14} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-foreground">NeuroAI</h1>
            <p className="text-[9px] text-neon-green">Online</p>
          </div>
        </div>
      </motion.div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pb-4">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
              msg.role === "user"
                ? "bg-primary text-primary-foreground rounded-br-sm"
                : "glass rounded-bl-sm text-foreground"
            }`}>
              {msg.text}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="glass rounded-2xl rounded-bl-sm p-3 flex gap-1">
              <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </motion.div>
        )}
      </div>

      <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
        {quickButtons.map((btn) => (
          <button
            key={btn.label}
            className="glass-subtle px-3 py-1.5 flex items-center gap-1.5 shrink-0"
            onClick={() => sendMessage(btn.prompt)}
          >
            <btn.icon size={12} className="text-neon-purple" />
            <span className="text-[10px] text-foreground">{btn.label}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass flex items-center gap-2 p-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted-foreground outline-none px-2"
        />
        <button type="submit" className="p-2 rounded-xl bg-primary" disabled={!input.trim()}>
          <Send size={14} className="text-primary-foreground" />
        </button>
      </form>
    </div>
  );
};
