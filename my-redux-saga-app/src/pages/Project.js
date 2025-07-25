import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchProject, createProject, deleteProject } from '../redux/actions/projectActions';
import { fetchCustomer } from '../redux/actions/customerActions';
function Project() {
  const dispatch = useDispatch();
  const projects = useSelector(state => state.project.projects);
  const customers = useSelector(state => state.customer.customers);
  console.info("projects", projects);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    customerID: '',
    startDate: '',
    dueDate: '',
    status: '',
    employeeID: '',
    source: '',
    userID: '',
    createdOn: '',
    costCenter: '',
    budget: '',
    costType: '',
    completionDate: '',
    projectContract: ''
  });

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      projectName: '',
      customerID: '',
      startDate: '',
      dueDate: '',
      status: '',
      employeeID: '',
      source: '',
      userID: '',
      createdOn: '',
      costCenter: '',
      budget: '',
      costType: '',
      completionDate: '',
      projectContract: ''
    });
  };
  const handleSubmit = () => {
    dispatch(createProject({ ...formData }));
    handleCloseModal();
  };
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getCustomerName = (id) => {
    const customer = customers.find(a => a.id === id);
    return customer ? customer.name : 'N/A';
  }
  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);
  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="card-title">Project List</div>
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>


          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Customer ID</th>
                  <th>Start Date</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Employee ID</th>
                  <th>Budget</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.projectName}</td>
                    <td>{getCustomerName(item.customerID)}</td>
                    <td>{item.startDate?.slice(0, 10)}</td>
                    <td>{item.dueDate?.slice(0, 10)}</td>
                    <td>{item.status}</td>
                    <td>{item.employeeID}</td>
                    <td>{item.budget}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => dispatch(deleteProject(item.id))}
                      >
                        Delete
                      </button>
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
        <div className="modal d-block" tabIndex="-1" style={{
          backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Project</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input type="text" name="projectName" placeholder="Project Name" className="form-control mb-2" onChange={handleChange} />
                <select
                  name="customerID"
                  value={formData.customerID}
                  onChange={handleChange}
                  className="form-control mb-2"
                >
                  <option value="">-- Select Customer --</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name}
                    </option>
                  ))}
                </select>


                <input type="date" name="startDate" placeholder="Start Date" className="form-control mb-2" onChange={handleChange} />
                <input type="date" name="dueDate" placeholder="Due Date" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="status" placeholder="Status" className="form-control mb-2" onChange={handleChange} />
                <input type="number" name="employeeID" placeholder="Employee ID" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="source" placeholder="Source" className="form-control mb-2" onChange={handleChange} />
                <input type="number" name="userID" placeholder="User ID" className="form-control mb-2" onChange={handleChange} />
                <input type="date" name="createdOn" placeholder="Created On" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="costCenter" placeholder="Cost Center" className="form-control mb-2" onChange={handleChange} />
                <input type="number" step="0.01" name="budget" placeholder="Budget" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="costType" placeholder="Cost Type" className="form-control mb-2" onChange={handleChange} />
                <input type="date" name="completionDate" placeholder="Completion Date" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="projectContract" placeholder="Project Contract" className="form-control mb-2" onChange={handleChange} />


              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Project