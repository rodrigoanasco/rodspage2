export default function VolunteerCard({ experience }) {
  return (
    <article className="volunteer-card">
      <img
        src={experience.logo}
        alt={`${experience.company} logo`}
        loading="lazy"
        decoding="async"
      />
      <div>
        <p className="experience-period">{experience.period}</p>
        <h3>{experience.company}</h3>
        <h4>{experience.role}</h4>
      </div>
      <p>{experience.description}</p>
    </article>
  )
}
