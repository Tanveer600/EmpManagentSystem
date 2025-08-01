import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRole, deleteRole, fetchRoles } from '../redux/actions/roleActions';

function Role() {
  const dispatch = useDispatch();
  const roles = useSelector(state => state.role.roles);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    canViewDashboard: false,
    canViewEmployees: false,
    canViewAccounts: false,
    canViewUsers: false,
    canViewCustomers: false,
    canViewBills: false,
    canViewTasks: false,
    canViewProjects: false,
    canViewTransactions: false,
    canViewuserRole: false,
  });

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      canViewDashboard: false,
      canViewEmployees: false,
      canViewAccounts: false,
      canViewUsers: false,
      canViewCustomers: false,
      canViewBills: false,
      canViewTasks: false,
      canViewProjects: false,
      canViewTransactions: false,
      canViewuserRole: false,
    });
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    dispatch(createRole(formData));
    handleCloseModal();
  };

  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="card-title">Role List</div>
            <button className="btn btn-primary" onClick={handleOpenModal}>Add Role</button>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Dashboard</th>
                  <th>Employees</th>
                  <th>Accounts</th>
                  <th>Users</th>
                  <th>Customers</th>
                  <th>Projects</th>
                  <th>Tasks</th>
                  <th>Transactions</th>
                  <th>User Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {roles?.map((role, index) => (
                  <tr key={role.id}>
                    <td>{index + 1}</td>
                    <td>{role.name}</td>
                    <td>{role.canViewDashboard ? 'Yes' : 'No'}</td>
                    <td>{role.canViewEmployees ? 'Yes' : 'No'}</td>
                    <td>{role.canViewAccounts ? 'Yes' : 'No'}</td>
                    <td>{role.canViewUsers ? 'Yes' : 'No'}</td>
                    <td>{role.canViewCustomers ? 'Yes' : 'No'}</td>
                    <td>{role.canViewProjects ? 'Yes' : 'No'}</td>
                    <td>{role.canViewTasks ? 'Yes' : 'No'}</td>
                    <td>{role.canViewTransactions ? 'Yes' : 'No'}</td>
                    <td>{role.canViewuserRole ? 'Yes' : 'No'}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteRole(role.id))}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Role</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input
                  name="name"
                  placeholder="Role Name"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                {[
                  'canViewDashboard',
                  'canViewEmployees',
                  'canViewAccounts',
                  'canViewUsers',
                  'canViewCustomers',
                  'canViewBills',
                  'canViewTasks',
                  'canViewProjects',
                  'canViewTransactions',
                  'canViewuserRole'
                ].map((field) => (
                  <div className="form-check" key={field}>
                    <input
                      type="checkbox"
                      name={field}
                      className="form-check-input"
                      id={field}
                      checked={formData[field]}
                      onChange={handleChange}
                    />
                    <label htmlFor={field} className="form-check-label">
                      {field.replace('canView', 'View ')}
                    </label>
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Role;