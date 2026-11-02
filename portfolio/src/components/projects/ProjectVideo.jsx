import { useEffect, useRef, useState } from 'react'

export default function ProjectVideo({ src, poster, title, variant = 'wide' }) {
  const videoRef = useRef(null)
  const [active, setActive] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return undefined
    video.focus({ preventScroll: true })

    // Stop decoding when the visitor leaves the demo or starts another one.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause()
    })
    const pauseWhenHidden = () => {
      if (document.hidden) video.pause()
    }
    const pauseForOtherPlayer = (event) => {
      if (event.target instanceof HTMLMediaElement && event.target !== video) video.pause()
    }
    observer.observe(video)
    document.addEventListener('visibilitychange', pauseWhenHidden)
    document.addEventListener('play', pauseForOtherPlayer, true)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', pauseWhenHidden)
      document.removeEventListener('play', pauseForOtherPlayer, true)
    }
  }, [active])

  return (
    <figure className={`project-video project-video--${variant}`}>
      <div className="project-video-frame">
        {active ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            title={title}
            autoPlay
            muted
            playsInline
            controls
            preload="none"
            onError={() => setFailed(true)}
          />
        ) : (
          <button
            className="project-video-preview"
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Play ${title}`}
          >
            <img src={poster} alt="" loading="lazy" decoding="async" />
            <span className="project-play-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path d="M9 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption>
        {failed ? (
          <>
            This video couldn’t load. <a href={src}>Open the video directly</a>.
          </>
        ) : active ? (
          title
        ) : (
          `Play demo · ${title}`
        )}
      </figcaption>
    </figure>
  )
}
