import { Menu } from "lucide-react";

export default function Header({ onMenu }) {
  return (
    <header className="topbar">
      <button
        className="icon-button menu-button"
        aria-label="Open navigation"
        onClick={onMenu}
      >
        <Menu size={20} />
      </button>
      <div className="crumb">
        Library <span>›</span> <b>Management</b>
      </div>
    </header>
  );
}
