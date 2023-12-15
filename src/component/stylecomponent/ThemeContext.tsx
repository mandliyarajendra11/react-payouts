import React, { createContext, useContext, useState, ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

export const ThemeContext = createContext<ThemeContextProps | undefined>(
  undefined
);

interface ThemeContextProps {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeValues: ThemeContextProps = {
    theme,
    toggleTheme,
  };
  document.body.style.backgroundColor =
    theme === "light" ? lightTheme.background : darkTheme.background;

  return (
    <ThemeContext.Provider value={themeValues}>
      <StyledThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const lightTheme = {
  tdBg: "rgba(244, 244, 244, 0.50)",
  tdColor: "#6F767E",
  background: "#FFF",
  thColor: "black",
  thBg: "#FFF",
  heading: "black",
  subHeading: "black",
  trBg: "#f5f5f5",
};

export const darkTheme = {
  tdBg: "#333333",
  tdColor: "#ECEDEE",
  background: "black",
  thColor: "#1E1E1E",
  thBg: "#75838D",
  heading: "#fff",
  subHeading: "#E0E0E0",
  trBg: "rgba(244, 244, 244, 0.50)",
};
