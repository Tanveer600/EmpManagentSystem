import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchCustomer,createCustomer,deleteCustomer } from '../redux/actions/customerActions';

function Customer() {
  const dispatch= useDispatch();
  const customers=useSelector(state=>state.customer.customers);
  const user = useSelector(state => state.user.user); // 👈 get logged-in user

  //console.info("cutsomers",customers);
  const[showModal,setShowModal]=useState(false);
  const[formData,setFormData]=useState({name:'',address:'',city:'',contact:'',country:'',email:'',userid:''});
  const handleOpenModal=()=>setShowModal(true);
  const handleCloseModal=()=>{
    setShowModal(false);
    setFormData({name:'',address:'',city:'',contact:'',country:'',email:'',userid:''});
  };



  const handleSubmit = () => {
  const CustomerWithUser = {
    ...formData,
    userid: user?.id || 0 // Auto-inject user ID
  };

   dispatch(createCustomer(CustomerWithUser));
  handleCloseModal();
};

  const handleChange=(e)=>{
    setFormData(prev=>({...prev,[e.target.name]:e.target.value}));
  };

  useEffect(() => {
    dispatch(fetchCustomer());
  }, [dispatch]);
  return (
    <div className="container-fluid mt-3">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
               <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="card-title">Customer List</div>
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>
            </div>
            <div className="card-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                      <th>City</th>
                       <th>Contact</th>
                        <th>Country</th>
                         <th>Email</th>
                        
                      <th>Action</th>
                  </tr>
                </thead>
               <tbody>
    {customers.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td> {/* Serial # */}
        <td>{item.name}</td>
        <td>{item.address}</td>
        <td>{item.city}</td>
        <td>{item.contact}</td>
        <td>{item.country}</td>
        <td>{item.email}</td>
         
        <td>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => dispatch(deleteCustomer(item.id))}
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
              type="text"
              name="address"
              placeholder="address"
              className="form-control mb-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="city"
              className="form-control mb-2"
              onChange={handleChange}
            />
            <input
              type="number"
              name="contact"
              placeholder="contact"
              className="form-control mb-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="country"
              className="form-control mb-2"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              className="form-control mb-2"
              onChange={handleChange}
            />  
              <input
                  type="number"
                  name="userid"
                  placeholder="User ID"
                  className="form-control mb-2"
                  value={user?.id || ""}
                  disabled
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
  )
}

export default Customer