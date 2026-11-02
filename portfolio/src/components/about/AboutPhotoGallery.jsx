export default function AboutPhotoGallery({ className, photos }) {
  return (
    <div className={className}>
      {photos.map(({ src, alt, label }) => (
        <figure key={label}>
          <img src={src} alt={alt} loading="lazy" decoding="async" />
          <figcaption>{label}</figcaption>
        </figure>
      ))}
    </div>
  )
}
