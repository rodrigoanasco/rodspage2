import { aboutPortraits } from '../../data/aboutContent'

export default function AboutHero({ images = aboutPortraits }) {
  return (
    <section className="about-hero about-reveal">
      <div className="about-hero-copy">
        <p className="about-eyebrow">Get to know me</p>
        <h1>About me</h1>
        <p className="about-hero-text">
          I&apos;m Rodrigo, a Computer Science student at Simon Fraser University. I care about
          building software that feels practical, polished, and genuinely useful.
        </p>
        <p className="about-hero-support">
          My work usually sits somewhere between full stack development, data-driven systems, and
          product thinking. I like turning loose ideas into real interfaces and reliable systems.
        </p>
      </div>

      <div className="about-portrait-group" aria-label="Personal photos">
        <figure className="about-main-photo">
          <img
            src={images.main}
            alt="Rodrigo near the waterfront in Victoria"
            decoding="async"
            fetchPriority="high"
          />
        </figure>
        <figure className="about-side-photo about-side-photo-top">
          <img src={images.study} alt="Cooper" loading="lazy" decoding="async" />
        </figure>
        <figure className="about-side-photo about-side-photo-bottom">
          <img
            src={images.project}
            alt="Object recognition project preview"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}
