import { PaginationProps } from "@/types/Pagination"

function Pagination({
  items,
  currentPage,
  pageSize,
  onPageChange,
}: PaginationProps) {
  const pagesCount = Math.ceil(items / pageSize)
  const pages = Array.from({ length: pagesCount }, (_, i) => i + 1)

  const calculatePages = () => {
    if (pagesCount <= 5) return pages

    const visiblePages: (number | string)[] = [1]

    if (currentPage > 3) visiblePages.push("...")

    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(pagesCount - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i)
    }

    if (currentPage < pagesCount - 2) visiblePages.push("...")

    visiblePages.push(pagesCount)

    return visiblePages
  }

  const displayedPages = calculatePages()

  return (
    <div>
      <ul className="flex justify-between items-center gap-2 list-none">
        {displayedPages.map((page, index) => (
          <li key={index}>
            {typeof page === "number" ? (
              <a
                onClick={() => onPageChange(page)}
                className={`cursor-pointer ${
                  page === currentPage ? "font-bold" : ""
                }`}>
                {page}
              </a>
            ) : (
              <span>...</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination
