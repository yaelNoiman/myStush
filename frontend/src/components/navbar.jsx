import { NavLink, Link } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="nav navbar navbar-expand-sm navbar-light bg-light shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">
          My <i className="fas fa-camera-retro"></i> Stush
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user && user.biz && (
              <li className="nav-item">
                <NavLink to="/home" className="nav-link">
                  My Posts
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/biz-signup" className="nav-link">
                    Business sign up
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Log out
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
