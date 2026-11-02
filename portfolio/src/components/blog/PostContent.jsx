import { isAllowedBlogVideoUrl } from '../../../shared/blog-video'

export default function PostContent({ content }) {
  const safeVideo = isAllowedBlogVideoUrl(content.videoUrl)

  return (
    <div className="blog-post-content">
      <p className="blog-post-text" style={{ margin: 0 }}>
        {content.body}
      </p>
      {safeVideo && (
        <p>
          <a href={content.videoUrl} target="_blank" rel="noopener noreferrer">
            Watch the video (opens a new tab)
          </a>
        </p>
      )}
    </div>
  )
}
