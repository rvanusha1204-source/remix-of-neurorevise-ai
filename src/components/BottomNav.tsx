import { motion } from "framer-motion";
import { Home, Brain, Gamepad2, MessageCircle, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Home", screen: "home" },
  { icon: Brain, label: "Memory", screen: "memory" },
  { icon: Gamepad2, label: "Games", screen: "game" },
  { icon: MessageCircle, label: "AI Chat", screen: "chat" },
  { icon: User, label: "Profile", screen: "progress" },
];

interface BottomNavProps {
  active: string;
  onNavigate: (screen: string) => void;
}

export const BottomNav = ({ active, onNavigate }: BottomNavProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass border-t border-glass-border/50 px-2 py-1 flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = active === item.screen;
          return (
            <motion.button
              key={item.screen}
              className="flex flex-col items-center gap-0.5 py-2 px-3 relative"
              onClick={() => onNavigate(item.screen)}
              whileTap={{ scale: 0.9 }}
            >
              {isActive && (
                <motion.div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full bg-primary"
                  layoutId="navIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon
                size={20}
                className={isActive ? "text-primary" : "text-muted-foreground"}
              />
              <span className={`text-[9px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
