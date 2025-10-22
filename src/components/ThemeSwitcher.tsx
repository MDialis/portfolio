'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react' 
export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Evita piscar a UI no carregamento
    return <div className="h-8 w-8" /> 
  }

  return (
    <button
      aria-label="Toggle Theme"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 transition-colors hover:bg-bg-surface"
    >
      {theme === 'dark' ? (
        <Sun className="h-4 w-4 text-text-base" />
      ) : (
        <Moon className="h-4 w-4 text-text-base" />
      )}
    </button>
  )
}