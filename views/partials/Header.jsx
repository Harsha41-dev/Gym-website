const React = require("react");

function Header({ isLoggedIn, userRole }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand text-danger" href="/">
          <i className="fa-solid fa-dumbbell me-2"></i>
          FitSync
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">
                <i className="fa-solid fa-home me-1"></i>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about">
                <i className="fa-solid fa-info-circle me-1"></i>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/gallery">
                <i className="fa-solid fa-images me-1"></i>
                Gallery
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/courses">
                <i className="fa-solid fa-calendar-alt me-1"></i>
                Courses
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/marketplace">
                <i className="fa-solid fa-shopping-cart me-1"></i>
                Marketplace
              </a>
            </li>
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/login">
                    <i className="fa-solid fa-sign-in-alt me-1"></i>
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/auth/register">
                    <i className="fa-solid fa-user-plus me-1"></i>
                    Register
                  </a>
                </li>
              </>
            ) : null}
            {isLoggedIn && userRole === "user" ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-user-circle me-1"></i>
                  My Account
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="/user/dashboard">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/profile">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" href="/auth/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : null}
            {isLoggedIn && userRole === "trainer" ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-user-circle me-1"></i>
                  Trainer Account
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="/trainer/dashboard">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/profile">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/trainer/bookings">
                      My Bookings
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="/courses/trainer-registration"
                    >
                      <i className="fa-solid fa-clipboard-list me-1"></i>
                      Register for Courses
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" href="/auth/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : null}
            {isLoggedIn && userRole === "admin" ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fa-solid fa-user-shield me-1"></i>
                  Admin
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <a className="dropdown-item" href="/admin/dashboard">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/admin/users">
                      Manage Users
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/admin/bookings">
                      Manage Bookings
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item text-danger" href="/auth/logout">
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

module.exports = Header;
