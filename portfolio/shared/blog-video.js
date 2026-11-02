const allowedVideoHosts = new Set([
  'youtube.com',
  'www.youtube.com',
  'youtu.be',
  'vimeo.com',
  'www.vimeo.com',
])

export function isAllowedBlogVideoUrl(value) {
  try {
    const url = new URL(value)
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      allowedVideoHosts.has(url.hostname)
    )
  } catch {
    return false
  }
}
