import { siteIdentity } from '../../data/site'

export default function ContactIntroduction() {
  return (
    <div className="contact-copy">
      <p className="contact-eyebrow">Contact</p>
      <h2>Let&apos;s build something useful.</h2>
      <p>
        Whether you want to collaborate, talk about an internship, discuss a project, or just say
        hi, send me a note and I&apos;ll do my best to respond soon.
      </p>
      <a className="contact-email-link" href={`mailto:${siteIdentity.email}`}>
        {siteIdentity.email}
        <span aria-hidden="true">-&gt;</span>
      </a>
    </div>
  )
}
