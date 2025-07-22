import React from "react";
import Sidebar from '../components/Sidebar';
import Headers from "../components/Headers";

import { Outlet } from 'react-router-dom';

function MainLayouts() {
  return (
    <div className="wrapper">
      <Headers />
      <Sidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayouts