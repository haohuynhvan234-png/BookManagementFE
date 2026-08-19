import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import AuthorsSection from "../../components/sections/AuthorsSection";
import BooksSection from "../../components/sections/BooksSection";
import Header from "../../components/sections/Header";
import Sidebar from "../../components/sections/Sidebar";
import { AuthorForm, BookForm } from "../../components/sections/Forms";
import {
  AuthorDetails,
  BookDetails,
  ConfirmDeleteModal,
} from "../../components/sections/Details";
import { api } from "../../lib/api";

export default function Home() {
  const pageSize = 5;
  const [page, setPage] = useState("books");
  const [modal, setModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [bookSearch, setBookSearch] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [authorSearch, setAuthorSearch] = useState("");
  const [bookSortOrder, setBookSortOrder] = useState("desc");
  const [authorSortOrder, setAuthorSortOrder] = useState("desc");
  const [bookPage, setBookPage] = useState(1);
  const [authorPage, setAuthorPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");
  const [deleteTarget, setDeleteTarget] = useState(null);
  const closeModal = () => setModal(null);
  const [selected, setSelected] = useState(null);
  const openModal = (name, record = null) => {
    setSelected(record);
    setModal(name);
  };
  const navigate = (nextPage) => {
    setPage(nextPage);
    setSidebarOpen(false);
  };

  const loadData = useCallback(async () => {
    setError("");
    try {
      const [bookData, authorData] = await Promise.all([
        api.getBooks({ search: bookSearch, genre: bookGenre }),
        api.getAuthors(),
      ]);
      setBooks(
        (Array.isArray(bookData) ? bookData : []).sort(
          (left, right) =>
            new Date(right.createdAt || 0) - new Date(left.createdAt || 0),
        ),
      );
      setAuthors(
        (Array.isArray(authorData) ? authorData : []).sort(
          (left, right) =>
            new Date(right.createdAt || 0) - new Date(left.createdAt || 0),
        ),
      );
      setBookPage(1);
      setAuthorPage(1);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setLoading(false);
    }
  }, [bookSearch, bookGenre]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeoutId = window.setTimeout(() => setNotice(""), 3500);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const visibleAuthors = useMemo(
    () =>
      authors.filter((author) =>
        `${author.name} ${author.nationality || ""}`
          .toLowerCase()
          .includes(authorSearch.toLowerCase()),
      ),
    [authors, authorSearch],
  );
  const sortedBooks = useMemo(
    () =>
      [...books].sort((left, right) => {
        const difference =
          new Date(right.createdAt || 0) - new Date(left.createdAt || 0);
        return bookSortOrder === "desc" ? difference : -difference;
      }),
    [books, bookSortOrder],
  );
  const sortedAuthors = useMemo(
    () =>
      [...visibleAuthors].sort((left, right) => {
        const difference =
          new Date(right.createdAt || 0) - new Date(left.createdAt || 0);
        return authorSortOrder === "desc" ? difference : -difference;
      }),
    [visibleAuthors, authorSortOrder],
  );
  const pagedBooks = sortedBooks.slice(
    (bookPage - 1) * pageSize,
    bookPage * pageSize,
  );
  const pagedAuthors = sortedAuthors.slice(
    (authorPage - 1) * pageSize,
    authorPage * pageSize,
  );
  const bookTotalPages = Math.max(1, Math.ceil(sortedBooks.length / pageSize));
  const authorTotalPages = Math.max(
    1,
    Math.ceil(sortedAuthors.length / pageSize),
  );
  const selectedAuthorBooks = useMemo(() => {
    if (!selected?._id) return [];
    return books.filter((book) => {
      const authorId =
        typeof book.author === "object" ? book.author?._id : book.author;
      return authorId === selected._id;
    });
  }, [books, selected]);
  const mutate = async (action, payload, successMessage) => {
    setSubmitting(true);
    try {
      await action(payload);
      closeModal();
      setNotice(successMessage);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };
  const requestDelete = (record, type) => {
    if (record?._id) setDeleteTarget({ record, type });
  };
  const deleteRecord = async () => {
    const { record, type } = deleteTarget || {};
    if (!record?._id) return;
    setSubmitting(true);
    try {
      await (type === "book"
        ? api.deleteBook(record._id)
        : api.deleteAuthor(record._id));
      closeModal();
      setDeleteTarget(null);
      setNotice(`${type === "book" ? "Book" : "Author"} deleted successfully.`);
      await loadData();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      {notice && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          <span>{notice}</span>
          <button
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <X size={15} />
          </button>
        </div>
      )}
      <Sidebar page={page} setPage={navigate} open={sidebarOpen} />
      <div className="main">
        <Header onMenu={() => setSidebarOpen(!sidebarOpen)} />
        <main>
          {error && <div className="api-message error-message">{error}</div>}
          {page === "books" && (
            <BooksSection
              books={pagedBooks}
              totalBooks={books.length}
              sortOrder={bookSortOrder}
              onToggleSort={() => {
                setBookSortOrder((current) =>
                  current === "desc" ? "asc" : "desc",
                );
                setBookPage(1);
              }}
              currentPage={bookPage}
              totalPages={bookTotalPages}
              onPageChange={setBookPage}
              openModal={openModal}
              onDelete={(book) => requestDelete(book, "book")}
              search={bookSearch}
              setSearch={(value) => {
                setBookSearch(value);
                setBookPage(1);
              }}
              genre={bookGenre}
              setGenre={(value) => {
                setBookGenre(value === "All Genres" ? "" : value);
                setBookPage(1);
              }}
              loading={loading}
              error={!books.length && error ? error : ""}
              onRetry={loadData}
            />
          )}
          {page === "authors" && (
            <AuthorsSection
              authors={pagedAuthors}
              totalAuthors={visibleAuthors.length}
              sortOrder={authorSortOrder}
              onToggleSort={() => {
                setAuthorSortOrder((current) =>
                  current === "desc" ? "asc" : "desc",
                );
                setAuthorPage(1);
              }}
              currentPage={authorPage}
              totalPages={authorTotalPages}
              onPageChange={setAuthorPage}
              openModal={openModal}
              onDelete={(author) => requestDelete(author, "author")}
              search={authorSearch}
              setSearch={(value) => {
                setAuthorSearch(value);
                setAuthorPage(1);
              }}
              loading={loading}
              error={!authors.length && error ? error : ""}
              onRetry={loadData}
            />
          )}
        </main>
      </div>
      {modal === "add-book" && (
        <BookForm
          authors={authors}
          onClose={closeModal}
          submitting={submitting}
          onSubmit={(payload) =>
            mutate(api.createBook, payload, "Book added successfully.")
          }
        />
      )}
      {modal === "edit-book" && (
        <BookForm
          editing
          book={selected}
          authors={authors}
          onClose={closeModal}
          submitting={submitting}
          onSubmit={(payload) =>
            mutate(
              (data) => api.updateBook(selected._id, data),
              payload,
              "Book updated successfully.",
            )
          }
        />
      )}
      {modal === "add-author" && (
        <AuthorForm
          onClose={closeModal}
          submitting={submitting}
          onSubmit={(payload) =>
            mutate(api.createAuthor, payload, "Author added successfully.")
          }
        />
      )}
      {modal === "edit-author" && (
        <AuthorForm
          editing
          author={selected}
          onClose={closeModal}
          submitting={submitting}
          onSubmit={(payload) =>
            mutate(
              (data) => api.updateAuthor(selected._id, data),
              payload,
              "Author updated successfully.",
            )
          }
        />
      )}
      {modal === "book-details" && (
        <BookDetails
          book={selected}
          onClose={closeModal}
          onEdit={() => setModal("edit-book")}
          onDelete={(book) => requestDelete(book, "book")}
        />
      )}
      {modal === "author-details" && (
        <AuthorDetails
          author={selected}
          books={selectedAuthorBooks}
          onClose={closeModal}
          onEdit={() => setModal("edit-author")}
          onDelete={(author) => requestDelete(author, "author")}
        />
      )}
      {deleteTarget && (
        <ConfirmDeleteModal
          record={deleteTarget.record}
          type={deleteTarget.type}
          submitting={submitting}
          onClose={() => setDeleteTarget(null)}
          onConfirm={deleteRecord}
        />
      )}
    </div>
  );
}
