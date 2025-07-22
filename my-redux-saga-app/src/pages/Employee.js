
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees,createEmployee,deleteEmployee } from '../redux/actions/employeeActions';

function Employye() {
  const dispatch = useDispatch();
  const employees = useSelector(state => state.employee.employees);


  console.info("employees", employees);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
  name: '',
  city: '',
  address: '',
  country: '',
  email: '',
  mobileNo: '',
  gender: '',
  loginName: '',
  loginPassword: '',
  jobTitle: '',
  state: '',
  userID: '',
  empType: '',
  payType: ''
});


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
  setShowModal(false);
  setFormData({
    name: '',
    city: '',
    address: '',
    country: '',
    email: '',
    mobileNo: '',
    gender: '',
    loginName: '',
    loginPassword: '',
    jobTitle: '',
    state: '',
    userID: '',
    empType: '',
    payType: ''
  });
};

  const handleSubmit = () => {
    dispatch(createEmployee({ ...formData }));
    handleCloseModal();
  };
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="container-fluid mt-3">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="card-title">Employee  List</div>
              <button className="btn btn-primary" onClick={handleOpenModal}>New Add</button>
            </div>


          </div>
          <div className="card-body">
            <table className="table table-hover">
          <thead>
  <tr>
    <th>#</th>
    <th>Name</th>
    <th>Email</th>
    <th>Mobile</th>
    <th>Gender</th>
    <th>Job Title</th>
    <th>Pay Type</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {employees?.map((emp, index) => (
    <tr key={emp.id}>
      <td>{index + 1}</td>
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>{emp.mobileNo}</td>
      <td>{emp.gender}</td>
      <td>{emp.jobTitle}</td>
      <td>{emp.payType}</td>
      <td>
        <button className="btn btn-sm btn-danger" onClick={() => dispatch(deleteEmployee(emp.id))}>
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
                <h5 className="modal-title">Add New Employee</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
             <div className="modal-body">
  <input type="text" name="name" placeholder="Name" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="city" placeholder="City" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="address" placeholder="Address" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="country" placeholder="Country" className="form-control mb-2" onChange={handleChange} />
  <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="mobileNo" placeholder="Mobile No" className="form-control mb-2" onChange={handleChange} />
  <select name="gender" className="form-control mb-2" onChange={handleChange}>
    <option value="">-- Select Gender --</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
  </select>
  <input type="text" name="loginName" placeholder="Login Name" className="form-control mb-2" onChange={handleChange} />
  <input type="password" name="loginPassword" placeholder="Password" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="jobTitle" placeholder="Job Title" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="state" placeholder="State" className="form-control mb-2" onChange={handleChange} />
  <input type="number" name="userID" placeholder="User ID" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="empType" placeholder="Employee Type" className="form-control mb-2" onChange={handleChange} />
  <input type="text" name="payType" placeholder="Pay Type" className="form-control mb-2" onChange={handleChange} />
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

export default Employye