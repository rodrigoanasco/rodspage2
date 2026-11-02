export default function LegalSection({ heading, children }) {
  return (
    <section>
      <h2>{heading}</h2>
      {children}
    </section>
  )
}
