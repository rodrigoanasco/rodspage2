import { useEffect, useState } from 'react'

function readSavedTheme() {
  try {
    return window.localStorage.getItem('theme') === 'light' ? 'light' : 'dark'
  } catch {
    return 'dark'
  }
}

export default function useThemePreference() {
  const [theme, setTheme] = useState(readSavedTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    try {
      window.localStorage.setItem('theme', theme)
    } catch {
      // The current theme still works when browser preference storage is blocked.
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  return { theme, toggleTheme }
}
