import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../redux/actions/roleActions";
import { logoutUser } from "../redux/actions/userActions";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const roles = useSelector((state) => state.role.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const isAdmin = user?.userType === "admin" || user?.isAdmin === true;
  const matchedRole = roles.find((r) => r.id === user?.roleID) || {};

  const can = (permission) => isAdmin || matchedRole[permission];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

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
        </div>
      </div>

      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-secondary">
            {can("canViewDashboard") && (
              <li className="nav-item active">
                <a
                  data-bs-toggle="collapse"
                  href="#dashboard"
                  className="collapsed"
                  aria-expanded="false"
                >
                  <i className="fas fa-tachometer-alt"></i>
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
            )}

            <li className="nav-section">
              <span className="sidebar-mini-icon">
                <i className="fas fa-stream"></i>
              </span>
              <h4 className="text-section">Components</h4>
            </li>

            <li className="nav-item">
              <a
                data-bs-toggle="collapse"
                href="#account"
                className="collapsed"
                aria-expanded="false"
              >
                <i className="fas fa-wallet"></i>
                <p>Accounts</p>
                <span className="caret"></span>
              </a>
              <div className="collapse" id="account">
                <ul className="nav nav-collapse">
                  {can("canViewAccounts") && (
                    <li>
                      <Link to="/account">
                        <span className="sub-item">Account</span>
                      </Link>
                    </li>
                  )}
                  {can("canViewTransactions") && (
                    <li>
                      <Link to="/transaction">
                        <span className="sub-item">Transaction</span>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </li>

            {can("canViewCustomers") && (
              <li className="nav-item">
                <Link className="nav-link" to="/customer">
                  <i className="fas fa-users"></i>
                  <p>Customer</p>
                </Link>
              </li>
            )}

            {can("canViewProjects") && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/project">
                    <i className="fas fa-project-diagram"></i>
                    <p>Project</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/service">
                    <i className="fas fa-concierge-bell"></i>
                    <p>Service Order</p>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/invoice">
                    <i className="fas fa-file-invoice"></i>
                    <p>Invoice</p>
                  </Link>
                </li>
              </>
            )}

            {can("canViewEmployees") && (
              <li className="nav-item">
                <Link className="nav-link" to="/employee">
                  <i className="fas fa-user-tie"></i>
                  <p>Employee</p>
                </Link>
              </li>
            )}

            {can("canViewBills") && (
              <li className="nav-item">
                <Link className="nav-link" to="/bill">
                  <i className="fas fa-receipt"></i>
                  <p>Bill</p>
                </Link>
              </li>
            )}

            {can("canViewuserRole") && (
              <li className="nav-item">
                <Link className="nav-link" to="/role">
                  <i className="fas fa-user-tag"></i>
                  <p>Role</p>
                </Link>
              </li>
            )}

            {can("canViewUsers") && (
              <li className="nav-item">
                <Link className="nav-link" to="/user">
                  <i className="fas fa-user-cog"></i>
                  <p>User</p>
                </Link>
              </li>
            )}

            {/* Logout always visible */}
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{
                  background: "none",
                  border: "none",
                  padding: 0,
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  color: "inherit",
                  textAlign: "left",
                }}
              >
                <i className="fas fa-sign-out-alt"></i>
                <p className="ms-2">Logout</p>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
