import ThemeToggle from './ThemeToggle'
import { siteIdentity } from '../../data/site'
import SiteNavigation from './SiteNavigation'

export default function SiteHeader({
  variant = 'home',
  activePage,
  navigation = {},
  theme,
  onThemeToggle,
  children,
}) {
  const isHome = variant === 'home'

  return (
    <header className={`top-nav${isHome ? '' : ` ${variant}-top-nav`}`}>
      <a
        className={`left-logo-home${isHome ? '' : ` ${variant}-logo-link`}`}
        href="/"
        onClick={navigation.home}
      >
        {siteIdentity.brand}
      </a>
      <div className="nav-actions">
        <SiteNavigation navigation={navigation} activePage={activePage} />
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
        {children}
      </div>
    </header>
  )
}
