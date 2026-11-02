import { aboutPortraits } from '../../data/aboutContent'
import AboutPhotoGallery from './AboutPhotoGallery'

export default function AboutWorkNotes({ onProjects }) {
  return (
    <section className="about-entry-section about-work" aria-labelledby="about-work-title">
      <div className="about-section-copy">
        <h2 id="about-work-title">What I like building</h2>
        <p>
          I&apos;ve always been curious about how things work, especially when different pieces of
          technology come together to create something useful.
        </p>
        <p>
          Over the past few years, I&apos;ve worked on everything from robotics and machine learning
          research to mobile applications and backend systems. These days, I&apos;m developing
          mobile apps at NeuroOpticDX and working on automation and internal systems at FISPAN, a
          fintech company.
        </p>
        <p>
          I&apos;ve realized that I enjoy designing how systems work just as much as actually
          writing the code. I like thinking through problems, connecting ideas, and turning them
          into something people can use.
        </p>
        <p>
          I&apos;m also constantly experimenting with new technologies and side projects. You can
          find some of those experiments on my{' '}
          <a href="/projects" onClick={onProjects}>
            projects page
          </a>
          .
        </p>
      </div>
      <AboutPhotoGallery
        className="about-at-work"
        label="University and project photos"
        photos={[aboutPortraits.study, aboutPortraits.project]}
      />
    </section>
  )
}
