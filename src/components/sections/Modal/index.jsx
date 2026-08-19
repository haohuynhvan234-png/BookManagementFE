import { X } from "lucide-react";

export default function Modal({
  title,
  subtitle,
  children,
  onClose,
  className = "",
}) {
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className={`modal ${className}`} role="dialog" aria-modal="true">
        <div className="modal-header">
          <div>
            <p className="eyebrow">ARCHIVE ENTRY</p>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button
            className="icon-button"
            aria-label="Close modal"
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}
