import { mainNavigation } from '../../data/navigation'

export default function SiteNavigation({
  navigation = {},
  activePage,
  className,
  label = 'Main navigation',
  showHomeLink = true,
}) {
  return (
    <nav className={className} aria-label={label}>
      {mainNavigation
        .filter(({ id }) => showHomeLink || id !== 'home')
        .map(({ id, href, label: linkLabel }) => (
          <a
            key={id}
            href={href}
            className={activePage === id ? 'is-active' : undefined}
            onClick={navigation[id]}
          >
            {linkLabel}
          </a>
        ))}
    </nav>
  )
}
