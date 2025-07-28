import React, { useEffect, useState } from 'react';


function Headers({ toggleSidebar }) {
  const [user, setUser] = useState({ loginName: '', loginPwd: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 shadow-sm">
      <button className="btn btn-outline-light me-3 d-lg-none" onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>

      <a className="navbar-brand d-flex align-items-center" href="/">
        <img
          src="assets/img/kaiadmin/logo_light.svg"
          alt="Logo"
          height="30"
          className="me-2"
        />
       
      </a>

      <div className="collapse navbar-collapse" id="navbarContent">
        {/* Search Bar */}
        <form className="d-none d-md-flex ms-auto me-3">
          <div className="input-group input-group-sm">
            <input
              className="form-control"
              type="text"
              placeholder="Search..."
              aria-label="Search"
            />
            <button className="btn btn-outline-light" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </form>

        {/* User Profile Dropdown */}
        <ul className="navbar-nav ms-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="assets/img/profile.jpg"
                alt="Profile"
                className="rounded-circle"
                width="35"
                height="35"
              />
              <span className="ms-2 text-light d-none d-md-inline">
                {user.loginName || 'Guest'}
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li className="px-3 py-2">
                <strong>{user.loginName || 'Guest'}</strong>
                {user.loginPwd && (
                  <div
                    className="small text-muted mt-1"
                    style={{ cursor: 'pointer' }}
                    onClick={togglePassword}
                  >
                    Password:{' '}
                    {showPassword
                      ? user.loginPwd
                      : '*'.repeat(user.loginPwd.length)}
                  </div>
                )}
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item" href="/logout">
                  <i className="bi bi-box-arrow-right me-2"></i> Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Headers;
