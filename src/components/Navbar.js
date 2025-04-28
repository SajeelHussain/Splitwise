import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="Container">
        <Link className="navbar-brand" to="/">
          Splitwise
        </Link>
        <div className="navbar-nav">
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
