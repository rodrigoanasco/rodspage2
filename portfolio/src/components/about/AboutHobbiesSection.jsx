import { aboutHobbies } from '../../data/aboutContent'
import AboutPhotoGallery from './AboutPhotoGallery'

export default function AboutHobbiesSection({ photos = aboutHobbies }) {
  return (
    <section className="about-entry-section about-hobbies" aria-labelledby="about-hobbies-title">
      <div className="about-section-copy">
        <h2 id="about-hobbies-title">When I&apos;m away from my laptop</h2>
        <p>
          I like staying active, whether that&apos;s training Brazilian jiu-jitsu, playing table
          tennis, going to the gym, or getting outside for a hike.
        </p>
        <p>
          I also enjoy traveling, trying things I&apos;ve never done before, and spending time with
          my dog, Cooper.
        </p>
        <p>
          I&apos;m someone who likes having different things going on. Sometimes that&apos;s
          learning a new technology, sometimes it&apos;s working on a random project idea, and
          sometimes it&apos;s just going somewhere new without much of a plan.
        </p>
      </div>
      <AboutPhotoGallery
        className="about-pastimes"
        label="Travel, sports, and my dog"
        photos={photos}
      />
    </section>
  )
}
