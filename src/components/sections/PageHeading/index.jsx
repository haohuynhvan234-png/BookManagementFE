import { CirclePlus } from "lucide-react";

export default function PageHeading({ title, description, action, onAction }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">LIBRARY / MANAGEMENT</p>
        <h1>{title}</h1>
        {description && <p className="description">{description}</p>}
      </div>
      {action && (
        <button className="primary-button" onClick={onAction}>
          <CirclePlus size={17} />
          {action}
        </button>
      )}
    </div>
  );
}
