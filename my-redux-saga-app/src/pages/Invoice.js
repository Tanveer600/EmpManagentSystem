import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createInvoice,
  deleteInvoice,
  fetchInvoice
} from '../redux/actions/invoiceActions';
import { fetchCustomer } from '../redux/actions/customerActions';
import { fetchProject } from '../redux/actions/projectActions';

function Invoice() {
  const dispatch = useDispatch();

  // Use correct reducer state
  const projects = useSelector(state => state.project.projects);
    const invoices = useSelector(state => state.invoice.invoices);
    const customers = useSelector(state => state.customer.customers);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    invoiceNo: '',
    invoiceDate: '',
    customerID: '',
    projectID: '',
    taskID: '',
    userID: ''
  });

  useEffect(() => {
    dispatch(fetchInvoice());
  }, [dispatch]);
   useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);
   useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      invoiceNo: '',
      invoiceDate: '',
      customerID: '',
      projectID: '',
      taskID: '',
      userID: ''
    });
  };

  const handleSubmit = () => {
    dispatch(createInvoice(formData));
    handleCloseModal();
  };
const getCustomerName = (id) => {
  const customer = customers.find(a => a.id === id);
  return customer ? customer.name : 'N/A';
};
const getProjectName = (id) => {
  const project = projects.find(a => a.id === id);
  return project ? project.projectName : 'N/A';
};
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="card-title">Invoice List</div>
            <button className="btn btn-primary" onClick={handleOpenModal}>Add Invoice</button>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Project Name</th>
                  <th>Task Name</th>
                  <th>User Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr key={invoice.id}>
                    <td>{index + 1}</td>
                    <td>{invoice.invoiceNo}</td>
                    <td>{invoice.invoiceDate?.slice(0, 10)}</td>
                   <td>{getCustomerName(invoice.customerID)}</td>
                    <td>{getProjectName(invoice.projectID)}</td>
                    <td>{invoice.taskID}</td>
                    <td>{invoice.userID}</td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => dispatch(deleteInvoice(invoice.id))}
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
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Invoice</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input name="invoiceNo" placeholder="Invoice No" className="form-control mb-2" onChange={handleChange} value={formData.invoiceNo} />
                <input name="invoiceDate" type="date" className="form-control mb-2" onChange={handleChange} value={formData.invoiceDate} />
                {/* <input name="customerID" placeholder="Customer ID" className="form-control mb-2" onChange={handleChange} value={formData.customerID} /> */}
                 <select
                  name="customerID"
                  value={formData.customerID}
                  onChange={handleChange}
                  className="form-control mb-2"
                >
                  <option value="">-- Select Customer name --</option>
                  {customers.map(cus => (
                    <option key={cus.id} value={cus.id}>
                      {cus.name}
                    </option>
                  ))}
                </select>



                  <select
                  name="projectID"
                  value={formData.projectID}
                  onChange={handleChange}
                  className="form-control mb-2"
                >
                  <option value="">-- Select project name --</option>
                  {projects.map(pro => (
                    <option key={pro.id} value={pro.id}>
                      {pro.projectName}
                    </option>
                  ))}
                </select>

                {/* <input name="projectID" placeholder="Project ID" className="form-control mb-2" onChange={handleChange} value={formData.projectID} /> */}
                <input name="taskID" placeholder="Task ID" className="form-control mb-2" onChange={handleChange} value={formData.taskID} />
                <input name="userID" placeholder="User ID" className="form-control mb-2" onChange={handleChange} value={formData.userID} />
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

export default Invoice;
