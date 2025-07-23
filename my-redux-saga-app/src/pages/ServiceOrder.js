import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceOrders,deleteServiceOrder,createServiceOrder } from '../redux/actions/serviceOrderActions';

function ServiceOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(state => state.serviceorder.serviceorders);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    soNo: '',
    soDate: '',
    customerID: '',
    projectID: '',
    taskID: '',
    description: '',
    userID: ''
  });

  const handleOpenModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      soNo: '',
      soDate: '',
      customerID: '',
      projectID: '',
      taskID: '',
      description: '',
      userID: ''
    });
  };

  const handleSubmit = () => {
    dispatch(createServiceOrder({ ...formData }));
    handleCloseModal();
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    dispatch(fetchServiceOrders());
  }, [dispatch]);

  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="card-title">Service Order List</div>
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>SO No</th>
                  <th>SO Date</th>
                  <th>Customer Name</th>
                  <th>Project Name</th>
                  <th>Task Name</th>
                  <th>Description</th>
                  <th>User Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.soNo}</td>
                    <td>{item.soDate}</td>
                    <td>{item.customerID}</td>
                    <td>{item.projectID}</td>
                    <td>{item.taskID}</td>
                    <td>{item.description}</td>
                    <td>{item.userID}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => dispatch(deleteServiceOrder(item.id))}
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
                <h5 className="modal-title">Add New Service Order</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  name="soNo"
                  placeholder="Service Order No"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="date"
                  name="soDate"
                  placeholder="Service Order Date"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="customerID"
                  placeholder="Customer ID"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="projectID"
                  placeholder="Project ID"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="taskID"
                  placeholder="Task ID"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="userID"
                  placeholder="User ID"
                  className="form-control mb-2"
                  onChange={handleChange}
                />
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
  );
}

export default ServiceOrder;
