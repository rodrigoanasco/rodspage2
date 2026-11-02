import ExperienceCard from './ExperienceCard'

export default function ExperienceSection({ items, onProjectDetail }) {
  return (
    <section id="experience" aria-labelledby="work-heading">
      <header className="experience-section-heading">
        <h2 id="work-heading">Past Work Experience</h2>
      </header>

      <div className="experience-showcase">
        {items.map((experience, index) => (
          <ExperienceCard
            key={experience.id}
            experience={experience}
            index={index}
            onProjectDetail={onProjectDetail}
          />
        ))}
      </div>
    </section>
  )
}
