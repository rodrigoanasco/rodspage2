import LegalLinks from './LegalLinks'
import { siteIdentity } from '../../data/site'
import SiteNavigation from './SiteNavigation'
import SocialLinks from './SocialLinks'

export default function SiteFooter({ variant = 'home', navigation, showHomeLink = true }) {
  return (
    <footer className={variant === 'home' ? undefined : `${variant}-footer`}>
      <div className="footer-inner">
        <SocialLinks />
        <SiteNavigation
          navigation={navigation}
          className="footer-nav"
          label="Footer navigation"
          showHomeLink={showHomeLink}
        />
        <LegalLinks />
        <p>
          &copy; {new Date().getFullYear()} {siteIdentity.name}. All rights reserved
        </p>
      </div>
    </footer>
  )
}
