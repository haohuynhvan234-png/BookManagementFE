import {
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  Search,
  Trash2,
  UserRound,
} from "lucide-react";
import PageHeading from "../PageHeading";

export default function AuthorsSection({
  authors,
  openModal,
  onDelete,
  search,
  setSearch,
  loading,
  error,
  onRetry,
  totalAuthors,
  currentPage,
  totalPages,
  onPageChange,
  sortOrder,
  onToggleSort,
}) {
  return (
    <>
      <PageHeading
        title="Authors Directory"
        description="Maintain the people, voices, and stories behind your collection."
        action="Add Author"
        onAction={() => openModal("add-author")}
      />
      <section className="table-panel">
        <div className="toolbar">
          <label className="search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search authors by name or nationality..."
            />
          </label>
          <button
            className="secondary-button sort-button"
            onClick={onToggleSort}
            title="Change author order"
          >
            <span aria-hidden="true">↕</span>
            {sortOrder === "desc" ? "Newest first" : "Oldest first"}
          </button>
          <span className="count">VIEWING {authors.length} AUTHORS</span>
        </div>
        {error && (
          <div className="api-message error-message">
            {error} <button onClick={onRetry}>Retry</button>
          </div>
        )}
        {loading && <div className="api-message">Loading authors...</div>}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Author Name</th>
                <th>Nationality</th>
                <th>Birth Year</th>
                <th>Books</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                authors.map((author) => (
                  <tr key={author._id}>
                    <td>
                      <div className="author-title">
                        <span className="author-avatar">
                          {author.name.charAt(0)}
                        </span>
                        <b>{author.name}</b>
                      </div>
                    </td>
                    <td>{author.nationality}</td>
                    <td className="mono">{author.birthYear}</td>
                    <td>
                      <b>{author.books}</b>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          aria-label="View author"
                          onClick={() => openModal("author-details", author)}
                        >
                          <UserRound size={16} />
                        </button>
                        <button
                          aria-label="Edit author"
                          onClick={() => openModal("edit-author", author)}
                        >
                          <FilePenLine size={16} />
                        </button>
                        <button
                          aria-label="Delete author"
                          onClick={() => onDelete(author)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <span>
            Showing {authors.length} of {totalAuthors} authors
          </span>
          <div>
            <button
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              <ChevronLeft size={17} />
            </button>
            <b>
              Page {currentPage} of {totalPages}
            </b>
            <button
              aria-label="Next page"
              disabled={currentPage === totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
