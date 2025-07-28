import React from 'react';

const Dashboard = () => {
  return (
    <div className="container-fluid px-4 py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Dashboard</h2>
        <button className="btn btn-primary">
          <i className="bi bi-download me-2"></i>Export Report
        </button>
      </div>

      <div className="row g-3">
        {/* Card 1 */}
        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Users</h6>
              <h3 className="fw-semibold">1,240</h3>
              <p className="text-success mb-0"><i className="bi bi-arrow-up-right-circle-fill me-1"></i> +12% this month</p>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h6 className="card-title text-muted">New Orders</h6>
              <h3 className="fw-semibold">320</h3>
              <p className="text-danger mb-0"><i className="bi bi-arrow-down-left-circle-fill me-1"></i> -8% this month</p>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h6 className="card-title text-muted">Revenue</h6>
              <h3 className="fw-semibold">$45,700</h3>
              <p className="text-success mb-0"><i className="bi bi-arrow-up-right-circle-fill me-1"></i> +18% this month</p>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="col-md-6 col-xl-3">
          <div className="card border-0 shadow-sm rounded-3">
            <div className="card-body">
              <h6 className="card-title text-muted">Visitors</h6>
              <h3 className="fw-semibold">8,940</h3>
              <p className="text-muted mb-0"><i className="bi bi-person-lines-fill me-1"></i> Updated just now</p>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder for charts */}
      <div className="row mt-4">
        <div className="col-lg-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Sales Chart</h6>
              <div className="text-muted small">[ Chart Placeholder ]</div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6 className="card-title">Visitors Map</h6>
              <div className="text-muted small">[ Map Placeholder ]</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
