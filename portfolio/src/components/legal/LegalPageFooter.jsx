import { siteIdentity } from '../../data/site'

export default function LegalPageFooter() {
  return (
    <footer className="legal-footer">
      &copy; {new Date().getFullYear()} {siteIdentity.name} &middot;{' '}
      <a href={`mailto:${siteIdentity.email}`}>{siteIdentity.email}</a>
    </footer>
  )
}
