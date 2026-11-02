export default function BlogPagination({
  label,
  onPrevious,
  onNext,
  disabled = false,
  previousLabel = 'Previous',
  nextLabel = 'Next',
}) {
  return (
    <nav className="blog-pagination" aria-label={label}>
      {onPrevious && (
        <button className="blog-button" disabled={disabled} onClick={onPrevious}>
          {previousLabel}
        </button>
      )}
      {onNext && (
        <button className="blog-button" disabled={disabled} onClick={onNext}>
          {nextLabel}
        </button>
      )}
    </nav>
  )
}
