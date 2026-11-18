
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="main-header">

      <div className="topbar">
        <div className="topbar-left">
          <span>☎ +91 XXXXX XXXXX</span>
          <span>◷ Mon-Sun: 11:00 AM - 11:00 PM</span>
        </div>

        <a href="/contact" className="table-btn">
          Book a table
        </a>
      </div>

      <div className="navbar">
        <Link to="/" className="brand">
          Dehati Thiya
          <small>APNA DHABA</small>
        </Link>

        <nav className="nav-links">
          <Link to="/" className="active">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/menu">Menu</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>

    </header>
  );
}

export default Navbar;
