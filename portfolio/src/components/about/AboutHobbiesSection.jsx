import { aboutHobbies } from '../../data/aboutContent'
import AboutPhotoGallery from './AboutPhotoGallery'
import AboutSectionHeading from './AboutSectionHeading'

export default function AboutHobbiesSection({ photos = aboutHobbies }) {
  return (
    <section className="about-hobbies about-reveal">
      <AboutSectionHeading eyebrow="Outside tech" title="Things that keep me balanced." />
      <AboutPhotoGallery className="about-hobby-strip" photos={photos} />
    </section>
  )
}
