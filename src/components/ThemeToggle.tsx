
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-colors"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
