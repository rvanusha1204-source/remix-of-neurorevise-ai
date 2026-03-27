import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";
import { HomeScreen } from "@/components/screens/HomeScreen";
import { MemoryNetworkScreen } from "@/components/screens/MemoryNetworkScreen";
import { GameModeScreen } from "@/components/screens/GameModeScreen";
import { PanicModeScreen } from "@/components/screens/PanicModeScreen";
import { UploadScreen } from "@/components/screens/UploadScreen";
import { ChatScreen } from "@/components/screens/ChatScreen";
import { LearnScreen } from "@/components/screens/LearnScreen";
import { NotificationsScreen } from "@/components/screens/NotificationsScreen";
import { ProgressScreen } from "@/components/screens/ProgressScreen";
import { RapidFireGame } from "@/components/screens/games/RapidFireGame";
import { MatchCardsGame } from "@/components/screens/games/MatchCardsGame";
import { WeakSpotGame } from "@/components/screens/games/WeakSpotGame";
import { BattleModeGame } from "@/components/screens/games/BattleModeGame";
import { PanicGame } from "@/components/screens/games/PanicGame";

const screens: Record<string, React.ComponentType<{ onNavigate: (screen: string) => void }>> = {
  home: HomeScreen,
  memory: MemoryNetworkScreen,
  game: GameModeScreen,
  panic: PanicModeScreen,
  upload: UploadScreen,
  chat: ChatScreen,
  learn: LearnScreen,
  notifications: NotificationsScreen,
  progress: ProgressScreen,
  "game-rapid": RapidFireGame,
  "game-match": MatchCardsGame,
  "game-weak": WeakSpotGame,
  "game-battle": BattleModeGame,
  "game-panic": PanicGame,
};

const Index = () => {
  const [activeScreen, setActiveScreen] = useState("home");

  const Screen = screens[activeScreen] || HomeScreen;

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[40%] rounded-full bg-neon-purple/5 blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[35%] rounded-full bg-neon-blue/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-4 pt-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Screen onNavigate={setActiveScreen} />
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav active={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
};

export default Index;
