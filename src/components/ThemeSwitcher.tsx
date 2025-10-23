'use client'

import { useTheme } from '@/components/ThemeProvider'
import { Sun, Moon, Palette } from 'lucide-react'

export const ThemeSwitcher = () => {
  const { theme, setTheme, themes } = useTheme()

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const renderIcon = () => {
    const className = "h-4 w-4 text-text-base"
    if (theme === 'dark') {
      return <Moon className={className} />
    }
    if (theme === 'light') {
      return <Sun className={className} />
    }
    return <Palette className={className} />
  }

  return (
    <button
      aria-label="Cycle Theme"
      onClick={cycleTheme}
      className="rounded-full p-2 transition-colors hover:bg-bg-card"
    >
      {renderIcon()}
    </button>
  )
}