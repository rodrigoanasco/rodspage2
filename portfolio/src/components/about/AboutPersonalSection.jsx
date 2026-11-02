import { aboutPeruFlag, personalGallery } from '../../data/aboutContent'
import AboutPhotoGallery from './AboutPhotoGallery'

export default function AboutPersonalSection({ photos = personalGallery }) {
  return (
    <section className="about-personal about-reveal">
      <div className="about-personal-copy">
        <p className="about-eyebrow">A personal side</p>
        <h2>Peru, Canada, and finding my rhythm here.</h2>
        <p>
          I moved to Canada in the summer of 2022 and quickly fell in love with Vancouver. The city
          has this calm mix of mountains, ocean, and movement that keeps me grounded.
        </p>
        <p>
          I am from Peru, and that is still a big part of me: family, food, culture, and the way I
          think about community. I like carrying both places with me.
        </p>
        <div className="about-peru-chip">
          <img src={aboutPeruFlag} alt="Peru flag" loading="lazy" decoding="async" />
          <span>Peru</span>
        </div>
      </div>

      <AboutPhotoGallery className="about-gallery" photos={photos} />
    </section>
  )
}
