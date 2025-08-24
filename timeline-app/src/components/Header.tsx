import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const location = useLocation();

  return (
    <header role="banner">
      <nav 
        role="navigation" 
        aria-label="Main navigation"
        style={{ padding: "1rem" }}
      >
        <ul 
          style={{ 
            listStyle: "none", 
            margin: 0, 
            padding: 0, 
            display: "flex", 
            gap: "2rem" 
          }}
        >
          <li>
            <Link 
              to="/" 
              aria-current={location.pathname === "/" ? "page" : undefined}
              style={{
                textDecoration: "none",
                color: "#333333",
                fontWeight: location.pathname === "/" ? "bold" : "normal",
                padding: "0.5rem",
                borderRadius: "4px",
                borderBottom: location.pathname === "/" ? "2px solid #0066cc" : "none"
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid #0066cc';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/timeline"
              aria-current={location.pathname === "/timeline" ? "page" : undefined}
              style={{
                textDecoration: "none",
                color: "#333333",
                fontWeight: location.pathname === "/timeline" ? "bold" : "normal",
                padding: "0.5rem",
                borderRadius: "4px",
                borderBottom: location.pathname === "/timeline" ? "2px solid #0066cc" : "none"
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid #0066cc';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              Timeline
            </Link>
          </li>
          <li>
            <Link 
              to="/about"
              aria-current={location.pathname === "/about" ? "page" : undefined}
              style={{
                textDecoration: "none",
                color: "#333333",
                fontWeight: location.pathname === "/about" ? "bold" : "normal",
                padding: "0.5rem",
                borderRadius: "4px",
                borderBottom: location.pathname === "/about" ? "2px solid #0066cc" : "none"
              }}
              onFocus={(e) => {
                e.target.style.outline = '2px solid #0066cc';
                e.target.style.outlineOffset = '2px';
              }}
              onBlur={(e) => {
                e.target.style.outline = 'none';
              }}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;