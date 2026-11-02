import VolunteerCard from './VolunteerCard'

export default function VolunteerSection({ items }) {
  return (
    <section id="volunteering" className="volunteer-panel" aria-labelledby="volunteering-heading">
      <header className="experience-section-heading">
        <h2 id="volunteering-heading">Volunteering Experience</h2>
      </header>
      <div className="volunteer-grid">
        {items.map((experience) => (
          <VolunteerCard key={experience.company} experience={experience} />
        ))}
      </div>
    </section>
  )
}
