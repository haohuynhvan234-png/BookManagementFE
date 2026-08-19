import { Archive, ChevronDown } from "lucide-react";
import { useState } from "react";
import Modal from "../Modal";

function Field({
  label,
  required,
  value,
  placeholder,
  textarea,
  type = "text",
  className = "",
}) {
  return (
    <label className={`field ${className}`}>
      <span>
        {label}
        {required && <em> *</em>}
      </span>
      {textarea ? (
        <textarea
          name={label}
          defaultValue={value}
          placeholder={placeholder}
          rows="4"
        />
      ) : (
        <input
          name={label}
          defaultValue={value}
          placeholder={placeholder}
          type={type}
        />
      )}
    </label>
  );
}

function SelectField({ label, value, options = [] }) {
  return (
    <label className="field">
      <span>{label}</span>
      <span className="select-wrap">
        <select name={label} defaultValue={value}>
          <option value="">{value}</option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
        <ChevronDown size={15} />
      </span>
    </label>
  );
}

function ModalFooter({ label, onClose, submitting }) {
  return (
    <div className="modal-footer">
      <button className="text-button" onClick={onClose}>
        Cancel
      </button>
      <button className="primary-button" type="submit" disabled={submitting}>
        <Archive size={16} />
        {label}
      </button>
    </div>
  );
}

function sameValue(left, right) {
  if (left === undefined || left === null || left === "") {
    return right === undefined || right === null || right === "";
  }
  return String(left) === String(right);
}

export function AuthorForm({
  editing = false,
  author,
  onClose,
  onSubmit,
  submitting,
}) {
  const initial = author || {};
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("Full Legal Name"),
      nationality: form.get("Nationality"),
      birthYear: form.get("Birth Year")
        ? Number(form.get("Birth Year"))
        : undefined,
      bio: form.get("Biographical Overview"),
    };
    if (!payload.name) {
      setError("Author name is required.");
      return;
    }
    if (
      editing &&
      sameValue(payload.name, initial.name) &&
      sameValue(payload.nationality, initial.nationality) &&
      sameValue(payload.birthYear, initial.birthYear) &&
      sameValue(payload.bio, initial.bio)
    ) {
      setError("No changes were made. Please update at least one field.");
      return;
    }
    await onSubmit(payload, setError);
  };
  return (
    <Modal
      title={editing ? "Edit Author Profile" : "Add New Author"}
      subtitle={
        editing
          ? "Update the biographical details for this catalog entry."
          : "Enter the scholarly and biographical details for the new catalog entry."
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        {editing && (
          <div className="record-note">
            <b>RECORD ID: #AUTH-7782</b>
            <span>Last updated: 2 days ago by System Admin</span>
          </div>
        )}
        <div className="form-grid">
          <Field
            label="Full Legal Name"
            required
            value={editing ? initial.name : ""}
            placeholder="e.g., Gabriel García Márquez"
          />
          <Field
            label="Nationality"
            value={editing ? initial.nationality : ""}
            placeholder="e.g., Colombian"
          />
          <Field
            label="Birth Year"
            value={editing ? initial.birthYear : ""}
            placeholder="YYYY"
            type="number"
          />
          <Field
            className="full"
            label="Biographical Overview"
            value={editing ? initial.bio || "" : ""}
            placeholder="Provide a brief academic overview of the author's life, major works, and stylistic contributions..."
            textarea
          />
        </div>
        {error && <div className="api-message warning-message">{error}</div>}
        <ModalFooter
          label={editing ? "Save Changes" : "Save Author"}
          onClose={onClose}
          submitting={submitting}
        />
      </form>
    </Modal>
  );
}

export function BookForm({
  editing = false,
  book,
  authors = [],
  onClose,
  onSubmit,
  submitting,
}) {
  const initial = book || {};
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      title: form.get("Primary Title"),
      author: form.get("Author / Creator"),
      genre: form.get("Classification"),
      publishedYear: form.get("Year of Publication")
        ? Number(form.get("Year of Publication"))
        : undefined,
      price: form.get("Acquisition Value (VND)")
        ? Number(String(form.get("Acquisition Value (VND)")).replace(/,/g, ""))
        : undefined,
      description: form.get("Abstract / Summary"),
    };
    if (!payload.title || !payload.author) {
      setError("Title and author are required.");
      return;
    }
    const initialAuthor =
      typeof initial.author === "object" ? initial.author?._id : initial.author;
    if (
      editing &&
      sameValue(payload.title, initial.title) &&
      sameValue(payload.author, initialAuthor) &&
      sameValue(payload.genre, initial.genre) &&
      sameValue(payload.publishedYear, initial.publishedYear) &&
      sameValue(payload.price, initial.price) &&
      sameValue(payload.description, initial.description)
    ) {
      setError("No changes were made. Please update at least one field.");
      return;
    }
    await onSubmit(payload, setError);
  };
  return (
    <Modal
      title={editing ? "Edit Volume" : "Add New Book"}
      subtitle={
        editing
          ? "Update metadata for 'The Celestial Mechanics'."
          : "Add a new volume to the archival collection."
      }
      onClose={onClose}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <Field
            className="full"
            label="Primary Title"
            required
            value={editing ? initial.title : ""}
            placeholder="e.g., The Name of the Rose"
          />
          <SelectField
            label="Author / Creator"
            value={
              editing
                ? initial.author?._id || initial.author
                : "Select an author"
            }
            options={authors.map((author) => ({
              value: author._id,
              label: author.name,
            }))}
          />
          <SelectField
            label="Classification"
            value={editing ? initial.genre : "Select category"}
            options={["Fiction", "History", "Science", "Philosophy"]}
          />
          <Field
            label="Year of Publication"
            value={editing ? initial.publishedYear : ""}
            placeholder="YYYY"
            type="number"
          />
          <Field
            label="Acquisition Value (VND)"
            value={editing ? initial.price : ""}
            placeholder="0.00"
            type="number"
          />
          <Field
            className="full"
            label="Abstract / Summary"
            value={editing ? initial.description || "" : ""}
            placeholder="Brief synopsis or condition notes..."
            textarea
          />
        </div>
        {error && <div className="api-message warning-message">{error}</div>}
        <ModalFooter
          label={editing ? "Update Volume" : "Save Book"}
          onClose={onClose}
          submitting={submitting}
        />
      </form>
    </Modal>
  );
}
