import React, { useEffect, useState } from 'react';

function Headers() {
  const [user, setUser] = useState({ loginName: '', loginPwd: '' });

  useEffect(() => {
    const savedUser = JSON.parse(sessionStorage.getItem('user')); // Corrected from localStorage
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (

    <div className="main-header">
      <div className="main-header-logo">
        <div className="logo-header" data-background-color="dark">
          <a href="index.html" className="logo">
            <img
              src="assets/img/kaiadmin/logo_light.svg"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
          </a>
          <div className="nav-toggle">
            <button className="btn btn-toggle toggle-sidebar">
              <i className="gg-menu-right"></i>
            </button>
            <button className="btn btn-toggle sidenav-toggler">
              <i className="gg-menu-left"></i>
            </button>
          </div>
          <button className="topbar-toggler more">
            <i className="gg-more-vertical-alt"></i>
          </button>
        </div>
      </div>

      {/* Navbar Header */}
      <nav className="navbar navbar-header navbar-header-transparent navbar-expand-lg border-bottom">
        <div className="container-fluid">
          <nav className="navbar navbar-header-left navbar-expand-lg navbar-form nav-search p-0 d-none d-lg-flex">
            <div className="input-group">
              <div className="input-group-prepend">
                <button type="submit" className="btn btn-search pe-1">
                  <i className="fa fa-search search-icon"></i>
                </button>
              </div>
              <input
                type="text"
                placeholder="Search ..."
                className="form-control"
              />
            </div>
          </nav>

          <ul className="navbar-nav topbar-nav ms-md-auto align-items-center">
       
            <li className="nav-item topbar-user dropdown hidden-caret">
              <a
                className="dropdown-toggle profile-pic"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                <div className="avatar-sm">
                  <img
                    src="assets/img/profile.jpg"
                    alt="..."
                    className="avatar-img rounded-circle"
                  />
                </div>
                <span className="profile-username ms-2 mr-6">
                  <span className="op-7">{user?.loginName || 'Guest'}</span>
                  <span className="fw-bold ms-1" onClick={togglePassword} style={{ cursor: 'pointer' }}>
                    {user?.loginPwd
                      ? showPassword
                        ? user.loginPwd
                        : '*'.repeat(user.loginPwd.length)
                      : ''}
                  </span>

                </span>

              </a>

              <ul className="dropdown-menu dropdown-user animated fadeIn">
                <li className="user-box px-3 py-2">
                  <div className="u-text">
                    <h5 className="mb-0">{user?.loginName || 'Guest'}</h5>
                    <small className="text-muted" onClick={togglePassword} style={{ cursor: 'pointer' }}>
                      Password: {user?.loginPwd
                        ? showPassword
                          ? user.loginPwd
                          : '*'.repeat(user.loginPwd.length)
                        : ''}
                    </small>
                  </div>
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
      </nav>
      {/* End Navbar */}
    </div>

  )
}

export default Headers