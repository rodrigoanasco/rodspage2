import { siteIdentity } from '../../data/site'

export default function LegalPageHeader() {
  return (
    <header className="legal-header">
      <a href="/" className="legal-brand">
        {siteIdentity.brand}
      </a>
      <a href="/contact">Contact</a>
    </header>
  )
}
