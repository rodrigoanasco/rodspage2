import CertificateCard from './CertificateCard'

export default function CertificatesSection({ items }) {
  return (
    <section
      id="certificates"
      className="certificates-section"
      aria-labelledby="certificates-heading"
    >
      <header className="experience-section-heading">
        <h2 id="certificates-heading">Certificates</h2>
      </header>
      <div className="certificate-gallery">
        {items.map((certificate) => (
          <CertificateCard key={certificate.title} certificate={certificate} />
        ))}
      </div>
    </section>
  )
}
