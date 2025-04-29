import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Splitwise
        </Link>
        <div className="navbar-nav">
          {user ? (
            <>
              <span className="nav-link">Hello, {user.name}</span>
              <button className="nav-link btn btn-link" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link className="nav-link" to="/">
              Login
            </Link>
          )}
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
          <Link className="nav-link" to="/add-expense">
            Add Expense
          </Link>
          <Link className="nav-link" to="/reports">
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
