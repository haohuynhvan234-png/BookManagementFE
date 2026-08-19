import { BookOpen, FilePenLine, Trash2 } from "lucide-react";
import Modal from "../Modal";

export function ConfirmDeleteModal({
  record,
  type,
  onClose,
  onConfirm,
  submitting,
}) {
  const label = type === "book" ? "book" : "author";
  const name = record?.title || record?.name || "this record";

  return (
    <Modal
      title={`Delete ${label}`}
      subtitle="This action cannot be undone."
      onClose={onClose}
      className="confirm-modal"
    >
      <div className="confirm-copy">
        <p>
          Are you sure you want to delete <strong>{name}</strong>?
        </p>
        <span>The record will be permanently removed from the collection.</span>
      </div>
      <div className="modal-footer">
        <button className="text-button" onClick={onClose} disabled={submitting}>
          Cancel
        </button>
        <button
          className="danger-button"
          onClick={onConfirm}
          disabled={submitting}
        >
          <Trash2 size={15} />
          {submitting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </Modal>
  );
}

export function BookDetails({ book, onClose, onEdit, onDelete }) {
  return (
    <Modal
      title={book?.title || "Book details"}
      subtitle={`by ${typeof book?.author === "object" ? book.author?.name : book?.author || "Unknown author"}`}
      onClose={onClose}
      className="details-modal"
    >
      <div className="detail-stamp">ARCHIVE ENTRY #CM-1924</div>
      <div className="detail-grid">
        <div>
          <span>CLASSIFICATION</span>
          <b>{book?.genre || "-"}</b>
        </div>
        <div>
          <span>YEAR</span>
          <b>{book?.publishedYear || "-"}</b>
        </div>
        <div>
          <span>VALUATION</span>
          <b>{Number(book?.price || 0).toLocaleString("en-US")} VND</b>
        </div>
        <div>
          <span>LANGUAGE</span>
          <b>English</b>
        </div>
      </div>
      <p className="detail-copy">
        {book?.description || "No description provided."}
      </p>
      <blockquote>
        “To chart the heavens is not merely an exercise in mathematics...”
      </blockquote>
      <div className="modal-footer">
        <button className="secondary-button" onClick={onEdit}>
          <FilePenLine size={15} />
          Edit Record
        </button>
        <button className="danger-button" onClick={() => onDelete(book)}>
          <Trash2 size={15} />
          Purge
        </button>
      </div>
    </Modal>
  );
}

export function AuthorDetails({
  author,
  books = [],
  onClose,
  onEdit,
  onDelete,
}) {
  return (
    <Modal
      title={author?.name || "Author details"}
      subtitle={`${author?.nationality || "Unknown nationality"} · b. ${author?.birthYear || "-"}`}
      onClose={onClose}
      className="author-details"
    >
      <div className="detail-label">AUTHOR DOSSIER</div>
      <div className="bio-layout">
        <div className="bio-card">
          <h3>
            <BookOpen size={17} /> Biographical Overview
          </h3>
          <p>
            <span className="dropcap">{author?.name?.charAt(0) || "A"}</span>
            {author?.bio || "No biography provided."}
          </p>
        </div>
      </div>
      <section className="author-books">
        <div className="author-books-heading">
          <h3>
            <BookOpen size={17} /> Books by this author
          </h3>
          <span>
            {books.length} {books.length === 1 ? "book" : "books"}
          </span>
        </div>
        {books.length ? (
          <div className="author-books-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Genre</th>
                  <th>Published</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <b>{book.title}</b>
                    </td>
                    <td>{book.genre || "-"}</td>
                    <td className="mono">{book.publishedYear || "-"}</td>
                    <td className="mono">
                      {Number(book.price || 0).toLocaleString("en-US")} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="empty-books">
            No books by this author have been found.
          </p>
        )}
      </section>
      <div className="modal-footer">
        <button className="secondary-button" onClick={onEdit}>
          <FilePenLine size={15} />
          Edit Record
        </button>
        <button className="danger-button" onClick={() => onDelete(author)}>
          <Trash2 size={15} />
          Remove
        </button>
      </div>
    </Modal>
  );
}
