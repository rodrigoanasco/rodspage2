import { useEffect, useRef, useState } from 'react'
import useMediaQuery from '../../hooks/useMediaQuery'
import WindowChrome from '../media/WindowChrome'

export default function ProjectVideo({ src, title, variant = 'wide' }) {
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const shellRef = useRef(null)
  const [shouldLoad, setShouldLoad] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window),
  )

  useEffect(() => {
    if (shouldLoad) return undefined

    const node = shellRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShouldLoad(true)
        observer.disconnect()
      },
      { rootMargin: '700px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return (
    <div className={`project-video-shell project-video-shell--${variant}`} ref={shellRef}>
      <WindowChrome className="project-window-bar" />
      <video
        src={shouldLoad ? src : undefined}
        title={title}
        autoPlay={shouldLoad && !reducedMotion}
        muted
        loop
        playsInline
        controls
        preload={shouldLoad ? 'metadata' : 'none'}
      />
    </div>
  )
}
