import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../constants/colors";
export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  background: string;
  surface: string;
  text: string;
  primary: string;
  border: string;
  statusStyle: ThemeMode;
}

export interface ThemeContextType {
  mode: ThemeMode;
  colors: ThemeColors;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    systemColorScheme || "light",
  );

  const toggleTheme = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const currentColors = Colors[themeMode];

  const contextValues = useMemo<ThemeContextType>(() => {
    return {
      mode: themeMode,
      colors: currentColors,
      toggleTheme,
    };
  }, [themeMode, currentColors, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValues}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("");
  }

  return context;
};
