import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function SigninPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' });

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.userId);

      setToast({ show: true, message: 'Signed in successfully', variant: 'success' });

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error('Signin error:', err.response?.data || err.message);
      setToast({ show: true, message: 'Signin failed. Please check your credentials.', variant: 'danger' });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f1f5f9' }}
    >
      <div
        style={{
          backgroundColor: '#000',
          color: '#fff',
          padding: '30px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '500px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)'
        }}
      >
        <h2 className="text-center mb-4">Signin</h2>
        <form onSubmit={handleSignin}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <center><button type="submit" className="btn btn-secondary w-10">Signin</button></center>
        </form>
      </div>

      <ToastContainer position="bottom-center" className="mb-4">
        <Toast
          onClose={() => setToast({ ...toast, show: false })}
          show={toast.show}
          delay={3000}
          autohide
          bg={toast.variant}
        >
          <Toast.Header>
            <strong className="me-auto">{toast.variant === 'success' ? 'Success' : 'Error'}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default SigninPage;
