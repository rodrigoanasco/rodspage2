import { socialProfiles } from '../../data/site'

export default function SocialLinks() {
  return (
    <div className="footer-socials">
      {socialProfiles.map(({ name, href, image }) => (
        <a key={name} href={href} target="_blank" rel="noreferrer">
          <img src={image} alt={name} loading="lazy" decoding="async" />
        </a>
      ))}
    </div>
  )
}
