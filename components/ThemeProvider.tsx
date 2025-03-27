"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useTheme } from "next-themes"

const ThemeProviderContext = createContext({ theme: "dark", toggleTheme: () => {} })

export const ThemeProvider = ({ 
  children, 
  defaultTheme = "dark",
  storageKey = "theme",
  ...props
}) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // After mounting, we can show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ThemeProviderContext.Provider
      value={{
        theme: theme,
        toggleTheme
      }}
      {...props}
    >
      {mounted && children}
    </ThemeProviderContext.Provider>
  )
}

export const useAppTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useAppTheme must be used within a ThemeProvider")
  }
  return context
} 