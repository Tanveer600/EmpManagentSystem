import React, { useState } from "react";
import Sidebar from '../components/Sidebar';
import Headers from "../components/Headers";
import Footers from "../components/Footers";
import { Outlet } from 'react-router-dom';
import '../Main/MainLayouts.css';

function MainLayouts() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(prev => !prev);

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      <div className={`sidebar-wrapper bg-dark ${collapsed ? 'collapsed' : ''}`}>
        <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content area */}
      <div className={`main-content d-flex flex-column flex-grow-1`}>
        <Headers toggleSidebar={toggleSidebar} />
        
        {/* Page content that pushes footer down */}
        <main className="flex-grow-1 p-3">
          <Outlet />
        </main>

        {/* Footer always at the bottom */}
        <footer className="bg-light border-top py-3 px-4">
          <Footers />
        </footer>
      </div>
    </div>
  );
}

export default MainLayouts;
