import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/login" className="nav-link">
        Login
      </NavLink>
    </div>
  );
}
