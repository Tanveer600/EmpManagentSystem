import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

 const { user } = useSelector((state) => state.user); // ✅


  // Redirect on login success
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
  e.preventDefault();

  console.log('LoginName:', username);
  console.log('LoginPwd:', password);

  // Dispatch with correct property names matching C# model
  dispatch(loginUser({
    LoginName: username,
    LoginPwd: password
  }));
};


  return (
    <div className="auth-page-content mt-4">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-5">
            <div className="card mt-4">
              <div className="card-body p-4">
                <div className="text-center mt-2">
                  <h5 className="text-primary">Welcome Back!</h5>
                  <p className="text-muted">Sign in to continue to Velzon.</p>
                </div>

                <form onSubmit={handleSubmit} className="p-2 mt-4">
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password-input" className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-success w-100 mt-3">
                    Sign In
                  </button>
                </form>
              </div>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
