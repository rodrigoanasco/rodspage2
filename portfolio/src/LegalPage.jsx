import { useEffect } from 'react'
import LegalLinks from './components/layout/LegalLinks'
import LegalPageHeader from './components/legal/LegalPageHeader'
import LegalPageFooter from './components/legal/LegalPageFooter'
import LegalSection from './components/legal/LegalSection'
import { legalContent, policyUpdatedAt } from './data/legalContent'
import './LegalPage.css'

export default function LegalPage({ type }) {
  const page = legalContent[type] || legalContent.privacy

  useEffect(() => {
    document.title = `${page.title} | Rodrigo Anasco`
  }, [page.title])

  return (
    <div className="legal-page">
      <LegalPageHeader />
      <main id="main-content" className="legal-main">
        <p className="legal-updated">Last updated {policyUpdatedAt}</p>
        <h1>{page.title}</h1>
        <p className="legal-intro">{page.intro}</p>
        {page.sections.map(({ heading, body }) => (
          <LegalSection key={heading} heading={heading}>
            {body}
          </LegalSection>
        ))}
        <LegalLinks className="legal-related" />
      </main>
      <LegalPageFooter />
    </div>
  )
}
