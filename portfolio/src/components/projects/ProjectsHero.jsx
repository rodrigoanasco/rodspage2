import { gdscWinnersImage, sfuAwardImage } from '../../data/projectContent'

export default function ProjectsHero() {
  return (
    <section className="projects-hero projects-reveal">
      <p className="projects-eyebrow">Selected work</p>
      <div className="projects-hero-grid">
        <h1>Projects that turn ideas into working systems.</h1>
        <div className="projects-hero-side">
          <div className="projects-hero-visual" aria-hidden="true">
            <figure className="projects-hero-frame projects-hero-frame-main">
              <img src={gdscWinnersImage} alt="" decoding="async" fetchPriority="high" />
            </figure>
            <figure className="projects-hero-frame projects-hero-frame-secondary">
              <img src={sfuAwardImage} alt="" decoding="async" />
            </figure>
          </div>
          <p>
            A focused collection of mobile apps, computer vision tools, robotics algorithms,
            learning platforms, and data experiments. Together, they show how I approach software
            across product, algorithms, data, and real-time systems.
          </p>
        </div>
      </div>
    </section>
  )
}
