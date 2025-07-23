import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBill,deleteBill,fetchBills } from '../redux/actions/billActions';

function Bill() {
  const dispatch = useDispatch();
  const bills = useSelector(state => state.bill.bills);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    billNo: '',
    billDate: '',
    customerID: '',
    projectID: '',
    description: '',
    weekStart: '',
    weekEnd: '',
    hoursBilled: '',
    userID: '',
    createdOn: ''
  });

  useEffect(() => {
    dispatch(fetchBills());
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      billNo: '',
      billDate: '',
      customerID: '',
      projectID: '',
      description: '',
      weekStart: '',
      weekEnd: '',
      hoursBilled: '',
      userID: '',
      createdOn: ''
    });
  };

  const handleSubmit = () => {
    dispatch(createBill(formData));
    handleCloseModal();
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <div className="card-title">Bill List</div>
            <button className="btn btn-primary" onClick={handleOpenModal}>Add Bill</button>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Bill No</th>
                  <th>Date</th>
                  <th>Customer ID</th>
                  <th>Project ID</th>
                  <th>Description</th>
                  <th>Hours</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill, index) => (
                  <tr key={bill.id}>
                    <td>{index + 1}</td>
                    <td>{bill.billNo}</td>
                    <td>{bill.billDate}</td>
                    <td>{bill.customerID}</td>
                    <td>{bill.projectID}</td>
                    <td>{bill.description}</td>
                    <td>{bill.hoursBilled}</td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteBill(bill.id))}>Delete</button>
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
                <h5 className="modal-title">Add Bill</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input name="billNo" placeholder="Bill No" className="form-control mb-2" onChange={handleChange} />
                <input name="billDate" type="date" className="form-control mb-2" onChange={handleChange} />
                <input name="customerID" placeholder="Customer ID" className="form-control mb-2" onChange={handleChange} />
                <input name="projectID" placeholder="Project ID" className="form-control mb-2" onChange={handleChange} />
                <input name="description" placeholder="Description" className="form-control mb-2" onChange={handleChange} />
                <input name="weekStart" type="date" className="form-control mb-2" onChange={handleChange} />
                <input name="weekEnd" type="date" className="form-control mb-2" onChange={handleChange} />
                <input name="hoursBilled" placeholder="Hours Billed" className="form-control mb-2" onChange={handleChange} />
                <input name="userID" placeholder="User ID" className="form-control mb-2" onChange={handleChange} />
                <input name="createdOn" type="date" className="form-control mb-2" onChange={handleChange} />
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

export default Bill;
