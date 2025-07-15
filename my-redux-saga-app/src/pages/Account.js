import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createAccount, deleteAccount, fetchAccounts } from '../redux/actions/accountActions';

function Account() {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.account.accounts);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ rname: '', address: '', price: '' });

  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ rname: '', address: '', price: '' });
  };

  const handleSubmit = () => {
    dispatch(createAccount({ ...formData }));
    handleCloseModal();
  };

 const handleChange = (e) => {
  setFormData(prev => ({ ...prev, [e.target.rname]: e.target.value }));
};


  return (
    <div className="container mt-3">
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-end mb-3">
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>
            <div className="card-title">Account Table</div>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th><th>First</th><th>Last</th><th>Handle</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.rname}</td>
                    <td>{item.address}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="btn btn-sm btn-danger" onClick={() => dispatch(deleteAccount(item.id))}>
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
                <h5 className="modal-title">Add New Record</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input name="rname" placeholder="First" className="form-control mb-2" onChange={handleChange} />
                <input name="address" placeholder="Last" className="form-control mb-2" onChange={handleChange} />
                <input name="price" placeholder="Handle" className="form-control" onChange={handleChange} />
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
