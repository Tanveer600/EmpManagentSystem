import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, deleteUser, fetchUsers } from '../redux/actions/userActions';
import { fetchRoles } from '../redux/actions/roleActions';

function User() {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users || []);
    const roles = useSelector((state) => state.role.roles || []);
    const [showModal, setShowModal] = useState(false);
    const [imageFile, setImageFile] = useState(null); // <-- for image file

    const [formData, setFormData] = useState({
        Name: '',
        LoginName: '',
        LoginPwd: '',
        UserType: '',
        RoleID: '',
        CreatedOn: '',
        IsAdmin: false,
    });

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchRoles());
    }, [dispatch]);

    const getRoleName = (id) => {
        const role = roles.find((r) => r.id === id);
        return role ? role.name : 'N/A';
    };

    const handleOpenModal = () => setShowModal(true);

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            Name: '',
            LoginName: '',
            LoginPwd: '',
            UserType: '',
            RoleID: '',
            CreatedOn: '',
            IsAdmin: false,
            UserImage: '',
        });
        setImageFile(null); // Reset image
    };
    const handleEdit = (user) => {
        setFormData({
            ID: user.id,
            Name: user.name,
            LoginName: user.loginName,
            LoginPwd: user.loginPwd,
            UserType: user.userType,
            RoleID: user.roleID,
            CreatedOn: user.createdOn?.split('T')[0],
            IsAdmin: user.isAdmin,
            UserImage: user.userImage || '',
        });
        setImageFile(null); // optional: reset file input
        setShowModal(true);
    };

    const handleSubmit = () => {
        const form = new FormData();

        // Append all fields
        Object.keys(formData).forEach((key) => {
            form.append(key, formData[key]);
        });

        // Append image file if exists
        if (imageFile) {
            form.append('image', imageFile);
        }

        dispatch(createUser(form));
        handleCloseModal();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const val = type === 'checkbox' ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: val }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    return (
        <div className="container-fluid mt-3">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div className="card-title">User List</div>
                    <button className="btn btn-primary" onClick={handleOpenModal}>
                        Add User
                    </button>
                </div>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Login</th>
                                <th>Password</th>
                                <th>User Type</th>
                                <th>Role</th>
                                <th>Created On</th>
                                <th>Admin?</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.id || index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {user.userImage ? (
                                            <img
                                                src={`https://localhost:7043${user.userImage}`}
                                                alt="User"
                                                width="60"
                                                height="60"
                                                style={{ objectFit: 'cover', borderRadius: '50%' }}
                                            />
                                        ) : (
                                            <div style={{ width: 60, height: 60, backgroundColor: '#ccc', borderRadius: '50%' }}></div>
                                        )}
                                    </td>
                                    <td>{user.name}</td>
                                    <td>{user.loginName}</td>
                                    <td>{user.loginPwd}</td>
                                    <td>{user.userType}</td>
                                    <td>{getRoleName(user.roleID)}</td>
                                    <td>{user.createdOn?.split('T')[0]}</td>
                                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-warning me-1"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => dispatch(deleteUser(user.id))}
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

            {/* Modal */}
            {showModal && (
                <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', inset: 0, zIndex: 1050 }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {formData.ID > 0 ? 'Edit User' : 'Add User'}
                                </h5>

                                <button className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <input name="Name" placeholder="Name" className="form-control mb-2" value={formData.Name} onChange={handleChange} />
                                <input name="LoginName" placeholder="Login Name" className="form-control mb-2" value={formData.LoginName} onChange={handleChange} />
                                <input name="LoginPwd" placeholder="Password" type="password" className="form-control mb-2" value={formData.LoginPwd} onChange={handleChange} />
                                <input name="UserType" placeholder="User Type" className="form-control mb-2" value={formData.UserType} onChange={handleChange} />
                                <select name="RoleID" value={formData.RoleID} onChange={handleChange} className="form-control mb-2">
                                    <option value="">-- Select role name --</option>
                                    {roles.map((account) => (
                                        <option key={account.id} value={account.id}>
                                            {account.name}
                                        </option>
                                    ))}
                                </select>
                                <input name="CreatedOn" type="date" className="form-control mb-2" value={formData.CreatedOn} onChange={handleChange} />
                                <div className="form-check mb-2">
                                    <input name="IsAdmin" type="checkbox" className="form-check-input" checked={formData.IsAdmin} onChange={handleChange} />
                                    <label className="form-check-label">Is Admin</label>
                                </div>
                                <input type="file" accept="image/*" className="form-control mb-2" onChange={handleImageChange} />
                                {formData.UserImage && (
                                    <div className="text-center mb-2">
                                        <img
                                            src={`https://localhost:7043${formData.UserImage}`}
                                            alt="Preview"
                                            width="100"
                                            height="100"
                                            style={{ objectFit: 'cover', borderRadius: '50%' }}
                                        />
                                    </div>
                                )}

                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={handleCloseModal}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSubmit}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default User;
