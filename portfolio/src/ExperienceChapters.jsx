import { useState } from 'react'
import './ExperienceChapters.css'

function ChapterImage({ src, fallback, alt, className }) {
  const [failed, setFailed] = useState(false)
  return <img className={className} src={failed && fallback ? fallback : src} alt={alt} loading="lazy" decoding="async"
    onError={() => { if (!failed && fallback && fallback !== src) setFailed(true) }} />
}

function Gallery({ experience }) {
  const items = experience.media || []
  if (!items.length) return null
  return <div className={`chapter-gallery ${experience.id === 'unify' ? 'chapter-gallery-phone' : ''}`} aria-label={`${experience.company} photos`}>
    {items.map((item, index) => <figure className={`chapter-photo chapter-photo-${index}`} key={item.src}>
      <ChapterImage src={item.src} fallback={item.fallback} alt={item.alt} />
      <figcaption>{item.label}</figcaption>
    </figure>)}
  </div>
}

function Chapter({ experience, onProjectClick, volunteer }) {
  const id = `chapter-${experience.id}`
  return <article id={id} className={`experience-chapter ${volunteer ? 'volunteer-chapter' : ''}`} aria-labelledby={`${id}-heading`}>
    <div className="chapter-stage">
      {volunteer && <ChapterImage className="chapter-volunteer-logo" src={experience.logo} alt="" />}
      <div className="chapter-copy">
        <h3 id={`${id}-heading`}>{experience.company}</h3>
        <p className="chapter-role">{experience.role}</p>
        <p className="chapter-period">{experience.period}{experience.location && <>{' · '}{experience.location}</>}</p>
        {experience.headline && <h4>{experience.headline}</h4>}
        <p className="chapter-summary">{experience.summary || experience.description}</p>
        {experience.highlights && <ul className="chapter-highlights">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
        {experience.projectHash && <a className="chapter-project-link" href={`/projects#${experience.projectHash}`} onClick={onProjectClick?.(experience.projectHash)}>
          View project
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="M4 16 16 4M5 4h11v11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>}
      </div>
      {!volunteer && <Gallery experience={experience} />}
    </div>
  </article>
}

export default function ExperienceChapters({ experiences, onProjectClick, volunteer = false }) {
  return <div className={`experience-chapters ${volunteer ? 'volunteer-chapters' : ''}`}>
    {experiences.map((experience) => <Chapter key={experience.id} experience={experience} onProjectClick={onProjectClick} volunteer={volunteer} />)}
  </div>
}
