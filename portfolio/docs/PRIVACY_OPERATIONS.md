# Owner privacy and publication checklist

Status: implementation prepared November 1, 2026; owner confirmations remain open. This file records work that source changes alone cannot complete. Keep permission evidence, account details, and request records private; do not put them in this public repository.

## Operator and applicability

- Confirm the operator's legal name. Public copy currently uses the existing portfolio name, Rodrigo Anasco.
- Confirmed by owner: British Columbia, Canada. Vercel is the hosting provider, while the portfolio owner is the site operator. Still confirm whether this is a personal or business activity and the jurisdictions served. Obtain jurisdiction-specific review if needed; do not claim BC PIPA, PIPEDA, CCPA/CPRA, or GDPR applicability or exemption without establishing the facts.
- Confirm whether a business/service address or other disclosures are required. Do not publish a private residential address merely to fill a template.
- Keep `ro.anasco.s@gmail.com` monitored for privacy questions and requests.

## Provider configuration and retention

| System | Data handled in this implementation | Owner action still required |
| --- | --- | --- |
| Vercel | Request metadata, operational logs, contact-function execution | Confirm project region, request/log retention, access, firewall limits, and whether any dashboard analytics are enabled |
| Cloudflare Turnstile | Browser/device challenge signals, token, and IP sent for server verification | Confirm widget domains/action, account settings, and applicable processing terms |
| EmailJS and destination mailbox | Optional name, reply address, message, acknowledgement boolean and timestamp | Confirm destination, access permissions, provider retention and deletion, and fixed sender address; add `{{privacy_consent}}` and `{{privacy_acknowledged_at}}` to the live template if an email acknowledgement record is required |
| Clerk | Private manager sign-in/account/session information | Confirm invite/access restrictions, MFA, region and retention; readers should not initialize Clerk |
| Neon | Blog draft and published content, revision metadata | Confirm region, backups, access, and deletion/restore policy; do not place contact submissions in blog content |
| Browser | Theme preference; provider storage when a feature is explicitly opened | Reassess notice/consent before introducing trackers, embeds, or new providers |

Choose and document a real inbox retention period measured from the last relevant reply, plus any documented legal/security exceptions. Configure mailbox/provider deletion where available, or schedule a recurring owner review. No automatic inbox deletion exists in this repository. After the schedule is operational, update the public policy to match it. Do not promise a deadline that cannot be followed.

For access/correction/deletion requests: verify identity proportionately using existing correspondence, locate the inquiry and provider records, apply applicable exceptions/deadlines, perform the supported changes, and reply with the result and any retention limits (including backups). Record completion privately without duplicating the full inquiry. Provider logs/backups may have separate schedules; never promise immediate deletion from every system without verifying it.

## Media and claims clearance

The owner states that most materials are their own and suitable for publication. No individual third-party licenses, releases, or employer approvals were established by the code review. Review the actual files, including content inside videos/PDFs and visible names, signatures, identifiers, faces, and private screens. A disclaimer does not establish permission.

| Repository material | Evidence needed before publication sign-off |
| --- | --- |
| `public/experience/unify-group-formal.jpg`, `unify-group-social.jpg` | Photographer/source permission and appropriate clearance for identifiable people and employer/community use |
| Other `public/experience/` Unify/Subvision screenshots, hardware, CAD and point-cloud images | Ownership/license, employer approval, and confirmation that screens/designs reveal no confidential material |
| `src/assets/images/projects_images/` group/award images | Photo permissions, identifiable-person clearance where required, and award/organization claim verification |
| `public/certificates/` images and PDFs | Right to publish, issuer restrictions, and review/redaction of signatures or personal identifiers where appropriate |
| `src/assets/images/about_me_images/`, landing portrait and personal photos | Copyright/source rights and clearance for other identifiable people where required |
| Company/school/technology/social logos | Source/license or applicable permitted use, required attribution, and no misleading endorsement |
| `src/assets/videos/` videos and report | Coauthor/employer permission, music/media licenses, confidentiality and visible personal-data review |
| Portfolio experience/project/award descriptions | Dates, role and contribution accuracy; employer/school restrictions and endorsement implications |

Keep a private per-asset record: repository path, source/creator, permission or license, permitted use, attribution, identifiable-person review, approver/date, and any redaction. Remove or replace an asset in both source and deployed static output when clearance cannot be established. Existing files in `public/` remain directly accessible even if a page stops linking to them.

## Final publication checks

- Complete owner facts, media clearance and provider/retention confirmation above.
- Review the real anti-spam challenge with keyboard and screen reader, plus both themes and zoom/reflow.
- Verify live contact delivery and acknowledgement template fields using an owner-authorized test; do not send visitor data for testing.
- Verify deployment route rewrites and security headers. Local Vite tests do not execute Vercel routing/header rules.
- Approve merging and production deployment separately after reviewing the integrated branch.
