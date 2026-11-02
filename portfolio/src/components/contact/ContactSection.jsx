import ContactForm from './ContactForm'
import ContactIntroduction from './ContactIntroduction'

export default function ContactSection({ isVisible }) {
  return (
    <section id="contact" className={`contact-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="contact-shell">
        <ContactIntroduction />
        <ContactForm />
      </div>
    </section>
  )
}
