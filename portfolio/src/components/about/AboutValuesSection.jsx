import { aboutValues } from '../../data/aboutContent'
import AboutSectionHeading from './AboutSectionHeading'

export default function AboutValuesSection({ values = aboutValues }) {
  return (
    <section className="about-values about-reveal">
      <AboutSectionHeading
        eyebrow="How I work"
        title="A simple way to describe my taste in projects."
      />
      <div className="about-value-list">
        {values.map((value) => (
          <article key={value.label}>
            <h3>{value.label}</h3>
            <p>{value.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
