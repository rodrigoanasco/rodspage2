import { useEffect } from 'react'
import './LegalPage.css'

const updated = 'November 1, 2026'

const content = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This notice explains what information this portfolio handles, why it is used, and how to ask about it. Rodrigo Anasco operates this personal portfolio from British Columbia, Canada. Vercel provides the website hosting.',
    sections: [
      ['Information collected', <><p>If you use the contact form, the site receives your email address and message, plus a record that you acknowledged the privacy notice, so Rodrigo can respond. A name is optional. The form also uses an anti-spam check. When enabled, Cloudflare Turnstile receives technical information needed to assess the check, which can include your IP address, browser and device signals, and a verification token. A hidden honeypot field helps detect automated submissions.</p><p>Hosting and security systems may create routine request and error logs, which can include an IP address, requested URL, and technical browser information. The public blog requests published entries from the site database. It does not ask readers to create accounts. Clerk authentication is used only for the private blog manager sign-in when configured.</p></>],
      ['How information is used', <p>Contact details and message content are used to answer your inquiry. Technical information is used to deliver the site, prevent abuse, troubleshoot errors, and secure the private blog manager. The site has no advertising, analytics, or marketing tracking code in its current implementation.</p>],
      ['Service providers and disclosures', <p>The site is hosted on <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noreferrer">Vercel</a>. Contact form delivery uses <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noreferrer">EmailJS</a>. <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare</a> provides the anti-spam check. <a href="https://clerk.com/legal/privacy" target="_blank" rel="noreferrer">Clerk</a> provides private blog-manager authentication, and Neon stores published blog posts. These providers process information to provide their services under their own terms and privacy practices. The site does not sell personal information or share it for cross-context behavioral advertising. Information may also be disclosed if required by law or reasonably necessary to protect the site and its users.</p>],
      ['Storage and retention', <p>The selected color theme is saved in this browser’s local storage. Contact messages are delivered to the site owner’s email account and may remain there while needed to handle the inquiry and reasonable follow-up. Hosting, anti-abuse, authentication, and email providers may retain technical records under their own retention schedules. Published blog entries remain available until removed. The site does not currently publish a fixed deletion schedule; contact Rodrigo to request deletion, subject to legal and security requirements.</p>],
      ['Your choices and requests', <p>You can choose not to use the contact form. You may ask to access, correct, or delete information you submitted by emailing <a href="mailto:ro.anasco.s@gmail.com">ro.anasco.s@gmail.com</a>. Some technical information is required for security and site operation. Depending on where you live and which laws apply, you may have additional rights to access, correct, delete, or limit the use of personal information.</p>],
      ['International processing', <p>Service providers may process information in countries other than your own, including the United States. The laws in those countries may differ from the laws where you live.</p>],
      ['Children and changes', <p>This portfolio is intended for a general audience and is not designed to collect information from children. This policy may be updated when the site’s features or data practices change. The date above identifies the latest update.</p>],
      ['Contact', <p>Privacy contact: Rodrigo Anasco, <a href="mailto:ro.anasco.s@gmail.com">ro.anasco.s@gmail.com</a>. A separate business mailing address is not published on this personal portfolio.</p>],
    ],
  },
  terms: {
    title: 'Terms and Conditions',
    intro: 'These terms cover use of Rodrigo Anasco’s personal portfolio and blog. By using the site, you agree to use it lawfully and respectfully.',
    sections: [
      ['Site content', <p>The site presents personal project and experience information for general informational purposes. It is not professional, financial, legal, or other regulated advice. Project descriptions reflect personal work and may not represent the views or endorsements of an employer, school, or organization.</p>],
      ['Ownership and permissions', <><p>Unless otherwise identified, original writing and design on this site belong to Rodrigo Anasco. Names, logos, photographs, certificates, and other third-party materials may belong to their respective owners. Do not reuse material unless you have permission or a legal right to do so. Contact Rodrigo about permission for original portfolio material.</p><p>Locally served fonts include Inter, Roboto, and Intel One Mono under the SIL Open Font License. Their copyright notices and license terms are available for <a href="/licenses/fonts/inter-OFL.txt">Inter</a>, <a href="/licenses/fonts/roboto-OFL.txt">Roboto</a>, and <a href="/licenses/fonts/intel-one-mono-OFL.txt">Intel One Mono</a>.</p></>],
      ['Contact submissions', <p>Submit only information you are comfortable sharing for a reply. Do not send confidential, sensitive, unlawful, or someone else’s personal information without permission. You retain rights you have in what you submit; you allow the site owner to receive, store, and use it only to review and respond to your inquiry.</p>],
      ['Availability and external services', <p>The site and links to third-party websites are provided without a promise that they will always be available, current, secure, or error-free. Third-party sites and services have their own terms and privacy practices. Nothing here limits rights or remedies that cannot legally be limited.</p>],
      ['Changes and contact', <p>These terms may change as the site changes. Updates take effect when posted, except where applicable law requires notice or agreement. Questions: <a href="mailto:ro.anasco.s@gmail.com">ro.anasco.s@gmail.com</a>.</p>],
    ],
  },
  cookies: {
    title: 'Cookie Policy',
    intro: 'The current portfolio does not use advertising cookies or analytics trackers. It uses limited browser storage and third-party tools for site features.',
    sections: [
      ['Current browser storage', <p>The site stores your light or dark theme selection in local storage on your device. This is not a cookie and is used only to remember that preference. You can clear it through your browser’s site-data settings; the site will still work with its default theme.</p>],
      ['Feature providers', <p>Cloudflare Turnstile loads after you check the contact form’s privacy acknowledgement to prevent automated spam submissions. Clerk loads only after you choose Author sign-in on the blog page (or open the author workspace directly) to authenticate the private site manager when sign-in is configured. These services may use cookies, local storage, or similar technical signals for security and authentication. Their behavior is controlled in part by those providers and can change; see <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer">Cloudflare’s privacy policy</a> and <a href="https://clerk.com/legal/privacy" target="_blank" rel="noreferrer">Clerk’s privacy policy</a>.</p>],
      ['Your controls and consent', <p>You can manage or clear cookies and site storage in your browser. Blocking them may affect sign-in or anti-spam features. If the site adds analytics, advertising, or other non-essential tracking, it should first provide the choices required by the laws that apply to its visitors. At present, the only first-party preference storage is the theme setting; feature-related third-party tools are limited to the contact and manager sign-in functions.</p>],
      ['Questions', <p>For questions about this policy or a privacy request, email <a href="mailto:ro.anasco.s@gmail.com">ro.anasco.s@gmail.com</a>.</p>],
    ],
  },
  refunds: {
    title: 'Refund Policy',
    intro: 'This personal portfolio currently does not sell products, subscriptions, or paid services and does not collect payments. There are no purchases to refund under the current site offering.',
    sections: [
      ['If paid offerings are added', <p>Before offering anything for payment, this page and the applicable checkout terms should be updated to describe the item or service, total price, cancellation rights, refund eligibility, timelines, and contact method required by the laws that apply. Any mandatory consumer rights will continue to apply.</p>],
      ['Contact', <p>If you believe you were charged in connection with this site, contact <a href="mailto:ro.anasco.s@gmail.com">ro.anasco.s@gmail.com</a> with the date and payment reference so it can be investigated.</p>],
    ],
  },
}

export default function LegalPage({ type }) {
  const page = content[type] || content.privacy
  useEffect(() => { document.title = `${page.title} | Rodrigo Anasco` }, [page.title])

  return <div className="legal-page">
    <header className="legal-header"><a href="/" className="legal-brand">Rodrigo.A</a><a href="/contact">Contact</a></header>
      <main id="main-content" className="legal-main">
      <p className="legal-updated">Last updated {updated}</p>
      <h1>{page.title}</h1>
      <p className="legal-intro">{page.intro}</p>
      {page.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2>{body}</section>)}
      <nav className="legal-related" aria-label="Legal policies">
        <a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/cookies">Cookies</a><a href="/refunds">Refunds</a>
      </nav>
    </main>
    <footer className="legal-footer">© {new Date().getFullYear()} Rodrigo Anasco · <a href="mailto:ro.anasco.s@gmail.com">ro.anasco.s@gmail.com</a></footer>
  </div>
}
