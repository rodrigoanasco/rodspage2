import { aboutPortraits } from '../../data/aboutContent'
import AboutPhoto from './AboutPhoto'

export default function AboutIntroduction({ images = aboutPortraits }) {
  return (
    <header className="about-introduction">
      <div className="about-intro-copy">
        <h1 id="about-title">About me</h1>
        <p className="about-opening">
          Hey, I&apos;m Rodrigo! I&apos;m a Computing Science student at Simon Fraser University,
          with a particular interest in AI, software development, and how technology can solve
          real-world problems.
        </p>
        <p>
          I grew up in Peru and moved to Canada in the summer of 2022. Since then, Vancouver has
          become home, and I&apos;ve had the chance to explore new places, meet people from
          different backgrounds, and figure out what I enjoy doing along the way.
        </p>
      </div>
      <AboutPhoto photo={images.main} className="about-portrait" priority />
    </header>
  )
}
