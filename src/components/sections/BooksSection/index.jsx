import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FilePenLine,
  Search,
  Trash2,
} from "lucide-react";
import PageHeading from "../PageHeading";

export default function BooksSection({
  books,
  openModal,
  onDelete,
  search,
  setSearch,
  genre,
  setGenre,
  loading,
  error,
  onRetry,
  totalBooks,
  currentPage,
  totalPages,
  onPageChange,
  sortOrder,
  onToggleSort,
}) {
  return (
    <>
      <PageHeading
        title="Books"
        description="Manage your library's collection, update metadata, and curate the archival holdings."
        action="Add Book"
        onAction={() => openModal("add-book")}
      />
      <section className="table-panel">
        <div className="toolbar">
          <label className="search">
            <Search size={17} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, author, or ISBN..."
            />
          </label>
          <select
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
          >
            <option>All Genres</option>
            <option>Science</option>
            <option>Fiction</option>
            <option>Philosophy</option>
          </select>
          <button
            className="secondary-button sort-button"
            onClick={onToggleSort}
            title="Change book order"
          >
            <span aria-hidden="true">↕</span>
            {sortOrder === "desc" ? "Newest first" : "Oldest first"}
          </button>
        </div>
        {error && (
          <div className="api-message error-message">
            {error} <button onClick={onRetry}>Retry</button>
          </div>
        )}
        {loading && <div className="api-message">Loading books...</div>}
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Title & Author</th>
                <th>Genre</th>
                <th>Published</th>
                <th>Price (VND)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <div className="book-title">
                        <span className={`cover ${book.tone}`}>
                          <BookOpen size={18} />
                        </span>
                        <span>
                          <b>{book.title}</b>
                          <small>
                            {typeof book.author === "object"
                              ? book.author?.name
                              : book.author}
                          </small>
                        </span>
                      </div>
                    </td>
                    <td>{book.genre}</td>
                    <td className="mono">{book.publishedYear || "-"}</td>
                    <td className="mono">
                      {Number(book.price || 0).toLocaleString("en-US")}
                    </td>
                    <td>
                      <span className="status available">Available</span>
                    </td>
                    <td>
                      <div className="row-actions">
                        <button
                          aria-label="View details"
                          onClick={() => openModal("book-details", book)}
                        >
                          <BookOpen size={16} />
                        </button>
                        <button
                          aria-label="Edit book"
                          onClick={() => openModal("edit-book", book)}
                        >
                          <FilePenLine size={16} />
                        </button>
                        <button
                          aria-label="Delete book"
                          onClick={() => onDelete(book)}
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
            Showing {books.length} of {totalBooks} volumes
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
