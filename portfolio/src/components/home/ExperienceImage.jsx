import { useState } from 'react'

export default function ExperienceImage({ src, fallback, alt, label, className = '', style }) {
  const [failed, setFailed] = useState(false)
  const imageSource = failed ? fallback : src

  return (
    <figure className={`experience-image-card ${className}`} style={style}>
      <img
        src={imageSource}
        alt={alt}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
      <figcaption>{label}</figcaption>
    </figure>
  )
}
