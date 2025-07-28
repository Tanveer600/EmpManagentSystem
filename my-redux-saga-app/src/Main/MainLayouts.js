// MainLayouts.jsx
import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import Headers from "../components/Headers";
import Footers from "../components/Footers";
import { Outlet } from 'react-router-dom';
import '../Main/MainLayouts.css'; // Include CSS shown below

function MainLayouts() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className={`sidebar-wrapper bg-dark ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className={`main-content flex-grow-1 ${collapsed ? 'expanded' : ''}`}>
        <Headers toggleSidebar={toggleSidebar} />
        <main className="p-3">
          <Outlet />
        </main>
        <footer className="bg-light border-top py-3 px-4">
          <Footers />
        </footer>
      </div>
    </div>
  );
}

export default MainLayouts;
