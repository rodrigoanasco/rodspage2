import { useEffect, useState } from 'react'
import useMediaQuery from './useMediaQuery'

const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value))

export default function useHomeScrollPresentation(route) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const [workVisible, setWorkVisible] = useState(false)
  const [stackVisible, setStackVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState({ hero: 0 })

  useEffect(() => {
    if (route !== 'home') return undefined

    const readProgress = (id, offset = 0) => {
      const node = document.getElementById(id)
      if (!node) return 0
      const rect = node.getBoundingClientRect()
      const total = rect.height + window.innerHeight
      return clamp((window.innerHeight - rect.top + offset) / total)
    }

    const readHeroProgress = () => {
      const node = document.getElementById('home')
      if (!node) return 0
      const heroStart = node.offsetTop
      const heroScrollable = Math.max(node.offsetHeight - window.innerHeight, 1)
      return clamp((window.scrollY - heroStart) / heroScrollable)
    }

    const onScroll = () => {
      const hero = readHeroProgress()
      const workTop = document.getElementById('experience')?.getBoundingClientRect().top
      const stack = readProgress('stack', 120)

      setScrollProgress({
        hero,
      })

      if (workTop < window.innerHeight * 0.9) setWorkVisible(true)
      if (stack > 0.2) setStackVisible(true)

      if (hero < 0.42) {
        setWorkVisible(false)
        setStackVisible(false)
      }
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [route])

  return {
    workVisible,
    stackVisible,
    heroTextOpacity: reducedMotion ? 1 : clamp(1 - scrollProgress.hero / 0.35),
    heroImageOpacity:
      scrollProgress.hero < 0.2625 ? 1 : clamp(1 - (scrollProgress.hero - 0.2625) / 0.17),
    welcomeOpacity: scrollProgress.hero < 0.48 ? 0 : clamp((scrollProgress.hero - 0.48) / 0.1),
  }
}
