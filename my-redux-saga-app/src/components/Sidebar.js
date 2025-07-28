import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../redux/actions/roleActions";
import { logoutUser } from "../redux/actions/userActions";
import "../components/Sidebar.css";

function Sidebar({ collapsed, toggleSidebar }) {
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
    <div className={`sidebar d-flex flex-column ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button - always visible */}
  <div className="sidebar-logo d-flex align-items-center justify-content-center py-3">
  <Link to="/" className="d-flex align-items-center text-decoration-none">
    <img src="/assets/img/kaiadmin/logo_light.svg" alt="Logo" height="24" />
  </Link>
</div>

<button className="sidebar-toggle" onClick={toggleSidebar}>
  <i className={`bi ${collapsed ? "bi-list" : "bi-x-lg"}`}></i>
</button>


      <div className="sidebar-content flex-grow-1 overflow-auto">
        <ul className="nav flex-column mt-3">
          {can("canViewDashboard") && (
            <li className="nav-item">
              <Link to="/" className="nav-link text-white">
                <i className="fas fa-tachometer-alt me-2"></i>
                {!collapsed && "Dashboard"}
              </Link>
            </li>
          )}

          {!collapsed && (
            <li className="text-uppercase text-muted small mt-4 mb-2 px-3">Components</li>
          )}

          {(can("canViewAccounts") || can("canViewTransactions")) && (
            <li className="nav-item">
              <Link to="/account" className="nav-link text-white">
                <i className="fas fa-wallet me-2"></i>
                {!collapsed && "Accounts"}
              </Link>
            </li>
          )}

          {can("canViewTransactions") && (
            <li className="nav-item">
              <Link to="/transaction" className="nav-link text-white">
                <i className="fas fa-arrow-left-right me-2"></i>
                {!collapsed && "Transactions"}
              </Link>
            </li>
          )}

          {can("canViewCustomers") && (
            <li className="nav-item">
              <Link to="/customer" className="nav-link text-white">
                <i className="fas fa-users me-2"></i>
                {!collapsed && "Customers"}
              </Link>
            </li>
          )}

          {can("canViewProjects") && (
            <>
              <li className="nav-item">
                <Link to="/project" className="nav-link text-white">
                  <i className="fas fa-project-diagram me-2"></i>
                  {!collapsed && "Projects"}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/service" className="nav-link text-white">
                  <i className="fas fa-concierge-bell me-2"></i>
                  {!collapsed && "Service Orders"}
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/invoice" className="nav-link text-white">
                  <i className="fas fa-file-invoice me-2"></i>
                  {!collapsed && "Invoices"}
                </Link>
              </li>
            </>
          )}

          {can("canViewEmployees") && (
            <li className="nav-item">
              <Link to="/employee" className="nav-link text-white">
                <i className="fas fa-user-tie me-2"></i>
                {!collapsed && "Employees"}
              </Link>
            </li>
          )}

          {can("canViewBills") && (
            <li className="nav-item">
              <Link to="/bill" className="nav-link text-white">
                <i className="fas fa-receipt me-2"></i>
                {!collapsed && "Bills"}
              </Link>
            </li>
          )}

          {can("canViewuserRole") && (
            <li className="nav-item">
              <Link to="/role" className="nav-link text-white">
                <i className="fas fa-user-tag me-2"></i>
                {!collapsed && "Roles"}
              </Link>
            </li>
          )}

          {can("canViewUsers") && (
            <li className="nav-item">
              <Link to="/user" className="nav-link text-white">
                <i className="fas fa-user-cog me-2"></i>
                {!collapsed && "Users"}
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="p-3 border-top">
        <button className="btn btn-outline-light w-100 text-start" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i>
          {!collapsed && "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
