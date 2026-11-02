import landingImage from '../../assets/images/landing_page_image.png'
import { siteIdentity } from '../../data/site'
import SiteHeader from '../layout/SiteHeader'

export default function HomeHero({ navigation, theme, onThemeToggle, presentation }) {
  const { heroTextOpacity, heroImageOpacity, welcomeOpacity } = presentation

  return (
    <section id="home" className="hero-section">
      <div className="hero-sticky">
        <img
          src={landingImage}
          alt="Rodrigo Anasco portrait"
          className="hero-background-image"
          style={{ opacity: heroImageOpacity }}
          decoding="async"
          fetchPriority="high"
        />
        <SiteHeader
          navigation={navigation}
          theme={theme}
          onThemeToggle={onThemeToggle}
          showHomeLink={false}
          showThemeToggle={false}
        />

        <div className="hero-title-layer" style={{ opacity: heroTextOpacity }}>
          <div className="hero-name-row">
            <div className="rectangle rectangle-1">
              <div className="name-and-email">
                <h1 className="rodrigo" aria-label={'Rodrigo A\u00f1asco'}>
                  Rodrigo
                </h1>
                <p className="hero-email">{siteIdentity.email}</p>
              </div>
            </div>
            <div className="rectangle rectangle-2">
              <div className="name-text-wrap">
                <p className="anasco" aria-hidden="true">
                  Añasco
                </p>
              </div>
            </div>
          </div>
        </div>
        <p
          className="welcome-overlay"
          style={{
            margin: 0,
            opacity: welcomeOpacity,
            transform: `translateY(${(1 - welcomeOpacity) * 14}px)`,
          }}
        >
          welcome to my page :)
        </p>
      </div>
    </section>
  )
}
