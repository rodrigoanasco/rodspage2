export default function CertificateCard({ certificate }) {
  return (
    <a
      className="certificate-card"
      href={certificate.href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Open ${certificate.title} certificate`}
    >
      <figure className="certificate-preview">
        <img
          src={certificate.image}
          alt={`${certificate.title} certificate`}
          loading="lazy"
          decoding="async"
        />
      </figure>
      <div className="certificate-card-body">
        <p className="certificate-meta">
          {certificate.issuer} / {certificate.date}
        </p>
        <h3>{certificate.title}</h3>
        <span className="certificate-link-label">Open certificate -&gt;</span>
      </div>
    </a>
  )
}
