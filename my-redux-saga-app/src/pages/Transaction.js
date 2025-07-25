import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTransaction, deleteTransaction, fetchTransactions } from '../redux/actions/transactionActions';
import { fetchAccounts } from '../redux/actions/accountActions';


function Transaction() {
  const dispatch = useDispatch();
  const transactions = useSelector(state => state.transaction?.transactions || []);
  const user = useSelector((state) => state.user.user);


  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    traDate: '',
    traDescription: '',
    debitAmount: '',
    creditAmount: '',
    accountID: '',
    createdOn: '',
    userID: ''
  });
  const accounts = useSelector(state => state.account.accounts);

  useEffect(() => {
    console.log("Transactions on mount:", transactions); // 👈 Add this
  }, [transactions]);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchAccounts());
  }, [dispatch]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      traDate: '',
      traDescription: '',
      debitAmount: '',
      creditAmount: '',
      accountID: '',
      createdOn: '',
      userID: ''
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const getAccountName = (id) => {
    const account = accounts.find(a => a.id === id);
    return account ? account.name : 'N/A';
  };

  const handleSubmit = () => {
    const transactionWithUser = {
      ...formData,
      userID: user?.id || 0 // fallback if user not found
    };

    dispatch(createTransaction(transactionWithUser));
    handleCloseModal();
  };

  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="card-title">Transaction List</div>
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Transaction Date</th>
                  <th>Description</th>
                  <th>Debit Amount</th>
                  <th>Credit Amount</th>
                  <th>Account Name</th>
                  <th>Created On</th>
                  <th>User ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(item.traDate).toLocaleDateString()}</td>
                    <td>{item.traDescription}</td>
                    <td>{item.debitAmount}</td>
                    <td>{item.creditAmount}</td>
                    <td>{getAccountName(item.accountID)}</td>

                    <td>{new Date(item.createdOn).toLocaleDateString()}</td>
                    <td>{item.userID}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => dispatch(deleteTransaction(item.id))}
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
                <h5 className="modal-title">Add New Transaction</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <input
                  type="date"
                  name="traDate"
                  className="form-control mb-2"
                  onChange={handleChange}
                  placeholder="Transaction Date"
                />
                <input
                  type="text"
                  name="traDescription"
                  className="form-control mb-2"
                  onChange={handleChange}
                  placeholder="Description"
                />
                <input
                  type="number"
                  name="debitAmount"
                  className="form-control mb-2"
                  onChange={handleChange}
                  placeholder="Debit Amount"
                />
                <input
                  type="number"
                  name="creditAmount"
                  className="form-control mb-2"
                  onChange={handleChange}
                  placeholder="Credit Amount"
                />
                <select
                  name="accountID"
                  value={formData.accountID}
                  onChange={handleChange}
                  className="form-control mb-2"
                >
                  <option value="">-- Select Account name --</option>
                  {accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.name}
                    </option>
                  ))}
                </select>

                <input
                  type="date"
                  name="createdOn"
                  className="form-control mb-2"
                  onChange={handleChange}
                  placeholder="Created On"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={user?.id || ''}
                  disabled
                  placeholder="User ID"
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

export default Transaction;
