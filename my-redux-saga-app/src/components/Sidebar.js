import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar" data-background-color="dark">
      <div className="sidebar-logo">
        <div className="logo-header" data-background-color="dark">
          <Link to="/" className="logo">
            <img
              src="assets/img/kaiadmin/logo_light.svg"
              alt="navbar brand"
              className="navbar-brand"
              height="20"
            />
          </Link>
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

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            <li className="nav-item active">
              <a data-bs-toggle="collapse" href="#dashboard" className="collapsed" aria-expanded="false">
                <i className="fas fa-home"></i>
                <p>Dashboard</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="dashboard">
                <ul className="nav nav-collapse">
                  <li>
                    <Link to="/">
                      <span className="sub-item">Dashboard 1</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fa fa-ellipsis-h"></i>
              </span>
              <h4 className="text-section">Components</h4>
            </li>

            <li className="nav-item">
              <Link to="/account" className="nav-link">
                <i className="fas fa-user-circle"></i>
                <p>Account</p>
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/project">
                <i className="fas fa-th-list"></i>
                <p>Project</p>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/employee">
                <i className="fas fa-th-list"></i>
                <p>Employee</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transaction">
                <i className="fas fa-th-list"></i>
                <p>Transaction</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bill">
                <i className="fas fa-th-list"></i>
                <p>Bill</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/service">
                <i className="fas fa-th-list"></i>
                <p>Service Order</p>
              </Link>
            </li>
         <li className="nav-item">
              <Link className="nav-link" to="/invoice">
                <i className="fas fa-th-list"></i>
                <p>Invoice</p>
              </Link>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#maps">
                <i className="fas fa-map-marker-alt"></i>
                <p>Maps</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="maps">
                <ul className="nav nav-collapse">
                  <li><Link to="/googlemaps"><span className="sub-item">Google Maps</span></Link></li>
                  <li><Link to="/jsvectormap"><span className="sub-item">Jsvectormap</span></Link></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <a data-bs-toggle="collapse" href="#charts">
                <i className="far fa-chart-bar"></i>
                <p>Charts</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="charts">
                <ul className="nav nav-collapse">
                  <li><Link to="/chartjs"><span className="sub-item">Chart Js</span></Link></li>
                  <li><Link to="/sparkline"><span className="sub-item">Sparkline</span></Link></li>
                </ul>
              </div>
            </li>

            <li className="nav-item">
              <Link to="/widgets">
                <i className="fas fa-desktop"></i>
                <p>Widgets</p>
                <span className="badge badge-success">4</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/documentation">
                <i className="fas fa-file"></i>
                <p>Documentation</p>
                <span className="badge badge-secondary">1</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
