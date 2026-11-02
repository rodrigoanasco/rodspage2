export default function ContactPrivacyNotice({ acknowledged, onChange, disabled }) {
  return (
    <>
      <p className="contact-privacy-note">
        Your email, message, and optional name are delivered through EmailJS so I can reply. After
        acknowledgement, Cloudflare processes technical signals for the anti-spam check. Please
        avoid sending sensitive or confidential information.
      </p>
      <label className="contact-privacy-consent">
        <input
          type="checkbox"
          name="privacyConsent"
          checked={acknowledged}
          onChange={onChange}
          required
          disabled={disabled}
        />
        <span>
          I have read the{' '}
          <a href="/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{' '}
          and understand how my inquiry is handled. The anti-spam check loads after I acknowledge
          this notice.
        </span>
      </label>
    </>
  )
}
