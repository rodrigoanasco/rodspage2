import { policyNavigation } from '../../data/navigation'

export default function LegalLinks({ className = 'footer-legal' }) {
  return (
    <nav className={className} aria-label="Legal policies">
      {policyNavigation.map(({ id, href, label }) => (
        <a key={id} href={href}>
          {label}
        </a>
      ))}
    </nav>
  )
}
