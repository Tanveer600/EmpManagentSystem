import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAccount, deleteAccount, fetchAccounts } from '../redux/actions/accountActions';

function Account() {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.account.accounts);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', openingbalance: '', openingdate: '' ,createdon: '',userid:'',costcenter:'' });

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({  name: '', openingbalance: '', openingdate: '' ,createdon: '',userid:'',costcenter:''  });
  };

  const handleSubmit = () => {
    dispatch(createAccount({ ...formData }));
    handleCloseModal();
  };

 const handleChange = (e) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};


  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="card-title">Account List</div>
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Opening Balance</th>
                    <th>Opening Date</th>
                     <th>Created On</th>
                      <th>User ID</th>
                       <th>Cost Center</th>
                    <th>Action</th>
                </tr>
              </thead>
             <tbody>
  {accounts.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td> {/* Serial # */}
      <td>{item.name}</td>
      <td>{item.openingBalance}</td>
      <td>{new Date(item.openingDate).toLocaleDateString()}</td>
      <td>{new Date(item.createdOn).toLocaleDateString()}</td>
      <td>{item.userID}</td>
      <td>{item.costCenter}</td>
      <td>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => dispatch(deleteAccount(item.id))}
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
                <h5 className="modal-title">Add New Account</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
             <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="openingbalance"
            placeholder="Opening Balance"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="date"
            name="openingdate"
            placeholder="Opening Date"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="date"
            name="createdon"
            placeholder="Created On"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="number"
            name="userid"
            placeholder="User ID"
            className="form-control mb-2"
            onChange={handleChange}
          />
          <input
            type="text"
            name="costcenter"
            placeholder="Cost Center"
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

export default Account;
