import { useEffect } from 'react'

export default function useRevealOnScroll(selector, threshold = 0.16) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold },
    )

    document.querySelectorAll(selector).forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [selector, threshold])
}
