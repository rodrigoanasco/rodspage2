import AboutPhoto from './AboutPhoto'

export default function AboutPhotoGallery({ className, photos, label }) {
  return (
    <div className={`about-photo-spread ${className}`} role="group" aria-label={label}>
      {photos.map((photo) => (
        <AboutPhoto key={photo.src} photo={photo} />
      ))}
    </div>
  )
}
