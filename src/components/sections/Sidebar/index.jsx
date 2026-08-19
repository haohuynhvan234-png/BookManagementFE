import { BookOpen, Settings, UserRound } from "lucide-react";

function Brand() {
  return (
    <div className="brand">
      <span className="brand-mark">
        <BookOpen size={19} />
      </span>
      <span>Archivist</span>
    </div>
  );
}

export default function Sidebar({ page, setPage, open }) {
  const links = [
    ["books", "Books", BookOpen],
    ["authors", "Authors", UserRound],
  ];

  return (
    <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
      <Brand />
      <nav>
        {links.map(([id, label, Icon]) => (
          <button
            key={id}
            className={page === id ? "nav-item active" : "nav-item"}
            onClick={() => setPage(id)}
          >
            <Icon size={17} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <button className="nav-item settings">
        <Settings size={17} />
        <span>System Settings</span>
      </button>
    </aside>
  );
}
