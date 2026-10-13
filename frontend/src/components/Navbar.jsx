import { NavLink, Link } from "react-router-dom";
import { APP_NAME, ROUTES } from "../utils/constants";
import "../styles/navbar.css";

// ============================================================
// NAVBAR COMPONENT
// ============================================================
// Sticky top navbar with:
//  - Animated logo (gradient + glow)
//  - NavLinks with active state + hover underline
//  - CTA button ("+ Add Employee")

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* 🎨 Logo */}
        <Link to={ROUTES.HOME} className="navbar-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">{APP_NAME}</span>
        </Link>

        {/* 🧭 Navigation Links */}
        <nav className="navbar-nav">
          <NavLink
            to={ROUTES.HOME}
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to={ROUTES.EMPLOYEE_LIST}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            Employees
          </NavLink>
        </nav>

        {/* ➕ CTA Button */}
        <Link to={ROUTES.ADD_EMPLOYEE} className="navbar-cta">
          <span className="cta-icon">+</span>
          <span>Add Employee</span>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;