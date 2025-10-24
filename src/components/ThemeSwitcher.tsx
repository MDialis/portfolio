'use client'

import { useTheme } from '@/components/ThemeProvider'
import { Sun, Moon, Palette } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type ThemeSwitcherProps = {
  className?: string
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
  const { theme, setTheme, themes } = useTheme()

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme)
    const nextIndex = (currentIndex + 1) % themes.length
    setTheme(themes[nextIndex])
  }

  const renderIcon = () => {
    const iconClass = twMerge(
      'h-5 w-5 text-base-content',
      className
    )
    if (theme === 'dark') {
      return <Moon className={iconClass} />
    }
    if (theme === 'light') {
      return <Sun className={iconClass} />
    }
    return <Palette className={iconClass} />
  }

  return (
    <button
      aria-label="Cycle Theme"
      onClick={cycleTheme}
      className="rounded-full p-2 transition-colors hover:bg-secondary"
    >
      {renderIcon()}
    </button>
  )
}