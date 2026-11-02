import ExperienceImage from './ExperienceImage'

export default function ExperienceCard({ experience, index, onProjectDetail }) {
  return (
    <article
      className={`experience-panel experience-panel-${experience.accent} ${index % 2 ? 'experience-panel-reverse' : ''}`}
    >
      <div
        className={`experience-collage experience-collage-${experience.id}`}
        aria-label={`${experience.company} photos`}
      >
        {experience.media.map((item, mediaIndex) => (
          <ExperienceImage
            key={item.src}
            src={item.src}
            fallback={item.fallback}
            alt={item.alt}
            label={item.label}
            className={`collage-photo collage-photo-${mediaIndex} ${item.className}`}
          />
        ))}
      </div>

      <div className="experience-copy">
        <div className="experience-company-row">
          <img
            src={experience.logo}
            alt={`${experience.company} logo`}
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="experience-period">
              {experience.period} / {experience.location}
            </p>
            <h3>{experience.company}</h3>
            <p className="experience-role">{experience.role}</p>
          </div>
        </div>
        <h4>{experience.headline}</h4>
        <p className="experience-summary">{experience.summary}</p>
        <ul className="experience-highlights">
          {experience.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
        <a
          className="experience-cta"
          href={`/projects#${experience.projectHash}`}
          onClick={onProjectDetail(experience.projectHash)}
        >
          View project
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </article>
  )
}
