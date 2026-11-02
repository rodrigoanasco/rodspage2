export default function AboutSectionHeading({ eyebrow, title }) {
  return (
    <div className="about-section-heading">
      <p className="about-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
    </div>
  )
}
