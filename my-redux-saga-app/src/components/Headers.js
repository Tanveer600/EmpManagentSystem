import React from 'react'

function Headers() {
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
              <li className="nav-item topbar-icon dropdown hidden-caret d-flex d-lg-none">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <i className="fa fa-search"></i>
                </a>
                <ul className="dropdown-menu dropdown-search animated fadeIn">
                  <form className="navbar-left navbar-form nav-search">
                    <div className="input-group">
                      <input
                        type="text"
                        placeholder="Search ..."
                        className="form-control"
                      />
                    </div>
                  </form>
                </ul>
              </li>

              {/* Message dropdown */}
              <li className="nav-item topbar-icon dropdown hidden-caret">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="messageDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-envelope"></i>
                </a>
                {/* ...Messages list can go here */}
              </li>

              {/* Notification dropdown */}
              <li className="nav-item topbar-icon dropdown hidden-caret">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="notifDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-bell"></i>
                  <span className="notification">4</span>
                </a>
                {/* ...Notifications list can go here */}
              </li>

              {/* Quick actions */}
              <li className="nav-item topbar-icon dropdown hidden-caret">
                <a
                  className="nav-link"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-expanded="false"
                >
                  <i className="fas fa-layer-group"></i>
                </a>
                {/* ...Quick actions menu can go here */}
              </li>

              {/* User dropdown */}
              <li className="nav-item topbar-user dropdown hidden-caret">
                <a
                  className="dropdown-toggle profile-pic"
                  data-bs-toggle="dropdown"
                  href="#"
                  aria-expanded="false"
                >
                  <div className="avatar-sm">
                    <img
                      src="assets/img/profile.jpg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                  <span className="profile-username">
                    <span className="op-7">Hi,</span>
                    <span className="fw-bold">Hizrian</span>
                  </span>
                </a>
                {/* ...User profile dropdown menu */}
              </li>
            </ul>
          </div>
        </nav>
        {/* End Navbar */}
      </div>
  
  )
}

export default Headers