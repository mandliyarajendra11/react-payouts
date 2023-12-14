import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface ThemeProviderProps {
  children: ReactNode;
}
export enum Color {
  ORANGE = "#F86F03",
  BLUE = "#525FE1",
  LIGHT_GRAY = "#F4F4F4",
  WHITE = "#FFF",
}

export type ThemeType = "dark" | "light";

export interface Theme {
  "--primary": Color;
  "--secondary": Color;
  "--background": Color;
}

const THEMES: Record<ThemeType, Theme> = {
  light: {
    "--primary": Color.ORANGE,
    "--secondary": Color.BLUE,
    "--background": Color.LIGHT_GRAY,
  },
  dark: {
    "--primary": Color.WHITE,
    "--secondary": Color.WHITE,
    "--background": Color.BLUE,
  },
};

interface ThemeContextProps {
  themeType: ThemeType;
  theme: Theme;
  setCurrentTheme: Dispatch<SetStateAction<ThemeType>> | null;
}

export const ThemeContext = createContext<ThemeContextProps>({
  themeType: "light",
  theme: THEMES["light"],
  setCurrentTheme: null,
});

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>("light");

  return (
    <ThemeContext.Provider
      value={{
        themeType: currentTheme,
        theme: THEMES[currentTheme],
        setCurrentTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
