function TechnologyTrack({ items, variant }) {
  return (
    <div className={`stack-track stack-track-${variant}`}>
      {[...items, ...items].map(({ logo, name }, index) => (
        <div className="stack-pill" key={`${logo}-${variant}-${index}`}>
          <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" />
        </div>
      ))}
    </div>
  )
}

export default function TechnologyStackSection({ items, isVisible, onProjects }) {
  const midpoint = Math.ceil(items.length / 2)

  return (
    <section id="stack" className={`stack-section ${isVisible ? 'is-visible' : ''}`}>
      <h2 className="stack-title">My Tech Stack</h2>
      <p className="stack-subtitle">Tools and technologies I work with</p>
      <div id="projects" className="stack-carousel">
        <TechnologyTrack items={items.slice(0, midpoint)} variant="a" />
        <TechnologyTrack items={items.slice(midpoint)} variant="b" />
      </div>
      <a className="stack-projects-teaser" href="/projects" onClick={onProjects}>
        <span>Come see my projects</span>
        <span aria-hidden="true">&rarr;</span>
      </a>
    </section>
  )
}
