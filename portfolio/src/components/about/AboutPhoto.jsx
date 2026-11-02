export default function AboutPhoto({ photo, className = '', priority = false }) {
  return (
    <figure className={`about-photo ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : undefined}
        decoding="async"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
      <figcaption>{photo.label}</figcaption>
    </figure>
  )
}
