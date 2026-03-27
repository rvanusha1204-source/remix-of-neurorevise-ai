import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, FileText, Image, Link, Sparkles, Upload, CheckCircle, Loader2, X, File } from "lucide-react";

interface UploadScreenProps {
  onNavigate: (screen: string) => void;
}

type UploadState = "idle" | "selected" | "processing" | "done";

interface UploadedFile {
  name: string;
  type: string;
  size: string;
}

const generatedContent = {
  flashcards: 12,
  summaryPoints: 8,
  quizQuestions: 15,
  topics: ["Organic Chemistry", "Reaction Mechanisms", "Functional Groups", "Nomenclature"],
};

export const UploadScreen = ({ onNavigate }: UploadScreenProps) => {
  const [state, setState] = useState<UploadState>("idle");
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [linkInput, setLinkInput] = useState("");
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const simulateProcessing = (fileName: string, fileType: string) => {
    setFile({ name: fileName, type: fileType, size: "2.4 MB" });
    setState("selected");

    setTimeout(() => {
      setState("processing");
      setProgress(0);
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setState("done"), 500);
            return 100;
          }
          return p + Math.random() * 15 + 5;
        });
      }, 300);
    }, 800);
  };

  const handleFileSelect = () => {
    // Simulate file selection
    simulateProcessing("organic_chemistry_notes.pdf", "PDF");
  };

  const handleImageSelect = () => {
    simulateProcessing("handwritten_notes.jpg", "Image");
  };

  const handleLinkSubmit = () => {
    if (linkInput.trim()) {
      simulateProcessing(linkInput.trim(), "Link");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    simulateProcessing("dropped_file.pdf", "PDF");
  };

  const reset = () => {
    setState("idle");
    setFile(null);
    setProgress(0);
    setLinkInput("");
  };

  return (
    <div className="space-y-6 pb-4">
      <motion.div className="flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <button onClick={() => onNavigate("home")} className="p-1">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-lg font-bold font-display gradient-text-primary">Smart Upload</h1>
      </motion.div>

      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Upload area */}
            <motion.div
              className="glass p-8 flex flex-col items-center gap-4 border-dashed border-2 border-neon-purple/30 cursor-pointer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleFileSelect}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="p-4 rounded-full bg-neon-purple/10 neon-glow-purple">
                <Upload size={32} className="text-neon-purple" />
              </div>
              <p className="text-sm text-foreground font-medium">Drop files or tap to upload</p>
              <p className="text-[10px] text-muted-foreground">AI will extract & organize content</p>
            </motion.div>

            <div className="space-y-3 mt-4">
              {[
                { icon: FileText, label: "Upload PDF", desc: "Notes, textbooks, papers", gradient: "from-neon-purple to-neon-blue", action: handleFileSelect },
                { icon: Image, label: "Scan Image", desc: "Handwritten notes, diagrams", gradient: "from-neon-blue to-neon-cyan", action: handleImageSelect },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  className="glass w-full p-4 flex items-center gap-4 text-left"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={item.action}
                >
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.gradient}`}>
                    <item.icon size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                  </div>
                </motion.button>
              ))}

              {/* Link input */}
              <motion.div
                className="glass p-4 space-y-3"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-neon-green to-neon-cyan">
                    <Link size={20} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Paste Link</h3>
                    <p className="text-[10px] text-muted-foreground">YouTube, articles, websites</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={linkInput}
                    onChange={(e) => setLinkInput(e.target.value)}
                    placeholder="https://..."
                    className="flex-1 bg-muted/50 rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none border border-glass-border"
                  />
                  <motion.button
                    className="bg-primary px-4 py-2 rounded-xl text-xs text-primary-foreground font-medium"
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLinkSubmit}
                    disabled={!linkInput.trim()}
                  >
                    Go
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {(state === "selected" || state === "processing") && file && (
          <motion.div key="processing" className="space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="glass p-4 flex items-center gap-3">
              <File size={20} className="text-neon-purple" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">{file.type} • {file.size}</p>
              </div>
              <button onClick={reset} className="p-1"><X size={16} className="text-muted-foreground" /></button>
            </div>

            <div className="glass p-6 text-center space-y-4">
              <motion.div animate={{ rotate: state === "processing" ? 360 : 0 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}>
                <Sparkles size={32} className="text-neon-purple mx-auto" />
              </motion.div>
              <p className="text-sm font-medium text-foreground">
                {state === "selected" ? "Ready to process" : "AI is analyzing your content..."}
              </p>
              {state === "processing" && (
                <>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-neon-purple to-neon-blue"
                      animate={{ width: `${Math.min(progress, 100)}%` }}
                    />
                  </div>
                  <div className="space-y-1">
                    {progress > 20 && <p className="text-[10px] text-neon-green">✓ Text extracted</p>}
                    {progress > 50 && <p className="text-[10px] text-neon-green">✓ Key concepts identified</p>}
                    {progress > 75 && <p className="text-[10px] text-neon-green">✓ Generating flashcards...</p>}
                    {progress > 90 && <p className="text-[10px] text-neon-green">✓ Creating quiz questions...</p>}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}

        {state === "done" && (
          <motion.div key="done" className="space-y-4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="glass p-6 text-center space-y-4">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                <CheckCircle size={48} className="text-accent mx-auto" />
              </motion.div>
              <p className="text-lg font-bold font-display gradient-text-accent">Processing Complete!</p>
              <p className="text-xs text-muted-foreground">AI has analyzed your content and generated study materials</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass p-4 text-center">
                <p className="text-xl font-bold font-display text-neon-purple">{generatedContent.flashcards}</p>
                <p className="text-[9px] text-muted-foreground">Flashcards</p>
              </div>
              <div className="glass p-4 text-center">
                <p className="text-xl font-bold font-display text-neon-blue">{generatedContent.quizQuestions}</p>
                <p className="text-[9px] text-muted-foreground">Quiz Questions</p>
              </div>
              <div className="glass p-4 text-center">
                <p className="text-xl font-bold font-display text-neon-green">{generatedContent.summaryPoints}</p>
                <p className="text-[9px] text-muted-foreground">Summary Points</p>
              </div>
              <div className="glass p-4 text-center">
                <p className="text-xl font-bold font-display text-neon-cyan">{generatedContent.topics.length}</p>
                <p className="text-[9px] text-muted-foreground">Topics Found</p>
              </div>
            </div>

            <div className="glass p-4 space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Topics Extracted</p>
              <div className="flex flex-wrap gap-2">
                {generatedContent.topics.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-neon-purple/10 text-neon-purple text-[10px] font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button className="flex-1 glass-subtle p-3 text-xs font-semibold text-foreground" whileTap={{ scale: 0.95 }} onClick={reset}>Upload More</motion.button>
              <motion.button className="flex-1 bg-primary p-3 rounded-xl text-xs font-semibold text-primary-foreground" whileTap={{ scale: 0.95 }} onClick={() => onNavigate("learn")}>Start Learning</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {state === "idle" && (
        <motion.div className="glass p-4 flex items-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          <Sparkles size={16} className="text-neon-purple animate-pulse" />
          <div>
            <p className="text-xs font-medium text-foreground">AI Processing Ready</p>
            <p className="text-[10px] text-muted-foreground">Auto-generates flashcards, summaries & quizzes</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};
