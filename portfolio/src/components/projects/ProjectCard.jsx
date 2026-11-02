import ProjectVideo from './ProjectVideo'

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article
      id={project.slug}
      className={`project-case projects-reveal ${project.cardVariant ? `project-case--${project.cardVariant}` : ''}`}
    >
      <div className="project-copy">
        <div className="project-meta">
          <span>{project.type}</span>
          <span>{project.year}</span>
        </div>
        <h2>{project.name}</h2>
        <p className="project-summary">{project.summary}</p>
        <ul className="project-points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        {project.processVideo && (
          <div className="project-process-video">
            <div className="project-process-label">{project.processVideo.label}</div>
            <ProjectVideo
              src={project.processVideo.src}
              title={project.processVideo.title}
              variant="process"
            />
          </div>
        )}
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.links && (
          <div className="project-links">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label}
                <span aria-hidden="true">-&gt;</span>
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="project-media" style={{ '--project-delay': `${index * 80}ms` }}>
        <ProjectVideo
          src={project.video}
          title={`${project.name} project video`}
          variant={project.videoVariant}
        />
        {project.featureImages && (
          <div className="project-image-strip">
            {project.featureImages.map((image) => (
              <figure key={image.label}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
                <figcaption>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
