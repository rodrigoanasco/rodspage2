import { lazy, Suspense } from 'react'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import HomePage from './components/home/HomePage'
import useHomeScrollPresentation from './hooks/useHomeScrollPresentation'
import usePortfolioNavigation, { legalRoutes } from './hooks/usePortfolioNavigation'
import useThemePreference from './hooks/useThemePreference'
import './App.css'

const BlogPage = lazy(() => import('./BlogPage'))
const ProjectsPage = lazy(() => import('./ProjectsPage'))
const LegalPage = lazy(() => import('./LegalPage'))
const publicPages = {
  about: AboutPage,
  projects: ProjectsPage,
  contact: ContactPage,
  blog: BlogPage,
}

export default function App() {
  const { route, navigation, navigateProjectDetail } = usePortfolioNavigation()
  const { theme, toggleTheme } = useThemePreference()
  const presentation = useHomeScrollPresentation(route)

  if (legalRoutes.includes(route)) {
    return (
      <Suspense fallback={<div className="route-loading">Loading policy...</div>}>
        <LegalPage type={route} />
      </Suspense>
    )
  }

  const PublicPage = publicPages[route]
  if (PublicPage) {
    return (
      <Suspense
        fallback={
          <div className="route-loading" role="status">
            Loading {route}...
          </div>
        }
      >
        <PublicPage
          onHome={navigation.home}
          onAbout={navigation.about}
          onProjects={navigation.projects}
          onBlog={navigation.blog}
          onContact={navigation.contact}
          theme={theme}
          onThemeToggle={toggleTheme}
        />
      </Suspense>
    )
  }

  return (
    <HomePage
      navigation={navigation}
      theme={theme}
      onThemeToggle={toggleTheme}
      onProjectDetail={navigateProjectDetail}
      presentation={presentation}
    />
  )
}
