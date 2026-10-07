"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  let activeTheme = "system";
  try {
    const themeContext = useTheme();
    if (themeContext?.theme) {
      activeTheme = themeContext.theme;
    } else {
      activeTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
  } catch {
    activeTheme = typeof document !== "undefined" && document.documentElement.classList.contains("dark") ? "dark" : "light";
  }

  return (
    <Sonner
      theme={activeTheme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
