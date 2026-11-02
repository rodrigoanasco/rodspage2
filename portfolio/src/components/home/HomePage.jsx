import {
  certificateItems,
  featuredExperiences,
  technologies,
  volunteerExperiences,
} from '../../data/homeContent'
import SiteFooter from '../layout/SiteFooter'
import CertificatesSection from './CertificatesSection'
import ExperienceSection from './ExperienceSection'
import HomeHero from './HomeHero'
import TechnologyStackSection from './TechnologyStackSection'
import VolunteerSection from './VolunteerSection'

export default function HomePage({
  navigation,
  theme,
  onThemeToggle,
  onProjectDetail,
  presentation,
}) {
  return (
    <div className="page">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <HomeHero
        navigation={navigation}
        theme={theme}
        onThemeToggle={onThemeToggle}
        presentation={presentation}
      />
      <main id="main-content" tabIndex="-1" className="background">
        <div className="content-shell">
          <div className={`experience-wrapper ${presentation.workVisible ? 'is-visible' : ''}`}>
            <div className="experience-inner">
              <ExperienceSection items={featuredExperiences} onProjectDetail={onProjectDetail} />
              <VolunteerSection items={volunteerExperiences} />
              <CertificatesSection items={certificateItems} />
            </div>
          </div>
          <TechnologyStackSection
            items={technologies}
            isVisible={presentation.stackVisible}
            onProjects={navigation.projects}
          />
        </div>
      </main>
      <SiteFooter navigation={navigation} />
    </div>
  )
}
