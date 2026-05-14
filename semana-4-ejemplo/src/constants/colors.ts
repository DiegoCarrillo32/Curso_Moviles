import { ThemeColors, ThemeMode } from "../contexts/ThemeContext";

export const Colors: Record<ThemeMode, ThemeColors> = {
  light: {
    background: "#F9F6F0",
    surface: "#FFFFFF",
    text: "#2C2523",
    primary: "#8D6E63",
    border: "#EFEBE9",
    statusStyle: "dark",
  },
  dark: {
    background: "#1E1A1D",
    surface: "#2A2427",
    text: "#EFEBE9",
    primary: "#D7CCC8",
    border: "#3E3639",
    statusStyle: "light",
  },
};
