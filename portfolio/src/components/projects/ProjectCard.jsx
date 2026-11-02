import ProjectVideo from './ProjectVideo'

export default function ProjectCard({ project }) {
  return (
    <article
      id={project.slug}
      className={`project-case${project.videoVariant === 'phone' ? ' project-case--phone' : ''}`}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="project-copy">
        <h2 id={`${project.slug}-title`}>{project.name}</h2>
        <p className="project-meta">
          {project.type} · {project.year}
        </p>
        <p>{project.summary}</p>
        <ul className="project-points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
        <p className="project-tools">Built with: {project.tags.join(' · ')}</p>
        {project.links?.map((link) => (
          <p key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          </p>
        ))}
        {project.processVideo && (
          <details className="project-process">
            <summary>See the development process</summary>
            <ProjectVideo
              src={project.processVideo.src}
              poster={project.processVideo.poster}
              title={project.processVideo.title}
            />
          </details>
        )}
      </div>
      <div className="project-media">
        <ProjectVideo
          src={project.video}
          poster={project.poster}
          title={`${project.name} project video`}
          variant={project.videoVariant}
        />
      </div>
      {project.featureImages && (
        <div className="project-photos">
          {project.featureImages.map((image) => (
            <figure key={image.label}>
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                width={image.width}
                height={image.height}
              />
              <figcaption>{image.label}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  )
}
