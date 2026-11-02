import { aboutPeruFlag, personalGallery } from '../../data/aboutContent'
import AboutPhotoGallery from './AboutPhotoGallery'

export default function AboutPersonalSection({ photos = personalGallery }) {
  return (
    <section className="about-entry-section about-personal" aria-labelledby="about-personal-title">
      <div className="about-section-copy">
        <h2 id="about-personal-title">A little about where I&apos;m from</h2>
        <p>
          One of my favorite things about living in British Columbia is having mountains, forests,
          and the ocean so close together. There&apos;s almost always somewhere new to explore, even
          if it&apos;s just a trail or a place with a nice view.
        </p>
        <p>
          At the same time, Peru will always be a big part of who I am. I miss the food (especially
          ceviche), the culture, and the feeling of being back home.{' '}
          <img
            className="about-inline-flag"
            src={aboutPeruFlag}
            alt="Peru flag"
            width="24"
            height="16"
            loading="lazy"
            decoding="async"
          />
        </p>
        <p>
          Living between two countries has definitely shaped how I see the world, and it&apos;s
          something I appreciate more as time goes on.
        </p>
      </div>
      <AboutPhotoGallery
        className="about-places"
        label="Photos from life outside university"
        photos={photos}
      />
    </section>
  )
}
