export default function ContactFields({ form, onChange, loading }) {
  return (
    <>
      <label>
        <span>Name (optional)</span>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Your name"
          autoComplete="name"
          maxLength="100"
          disabled={loading}
        />
      </label>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="your.email@example.com"
          autoComplete="email"
          maxLength="254"
          required
        />
      </label>
      <label>
        <span>Message</span>
        <textarea
          name="message"
          value={form.message}
          onChange={onChange}
          placeholder="Hi Rodrigo, I wanted to reach out about..."
          rows="5"
          minLength="10"
          maxLength="5000"
          required
        />
      </label>
      <label className="contact-honeypot" aria-hidden="true">
        <span>Website</span>
        <input
          name="website"
          value={form.website}
          onChange={onChange}
          tabIndex="-1"
          autoComplete="off"
        />
      </label>
    </>
  )
}
