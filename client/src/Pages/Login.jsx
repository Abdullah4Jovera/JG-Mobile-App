import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './AuthContext.js';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { state: { userinfo }, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userinfo) {
      if (userinfo.role === 'personalloanmanger') {
        navigate('/personalloanmangerdashboard');
      } else if (userinfo.role === 'superadmin') {
        navigate('/superadmindashboard');
      } else if (userinfo.role === 'businessfinanceloanmanger') {
        navigate('/businessfinanceloanmangerdashboard');
      } else if (userinfo.role === 'realestateloanmanger') {
        navigate('/realestateloanmangerdashboard');
      } else if (userinfo.role === 'mortgageloanmanger') {
        navigate('/mortgageloanmangerdashboard');
      } else {
        navigate('/userdashboard');
      }
    }
  }, [userinfo, navigate]);

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/users/login', data);
      const userData = response.data.user;

      const token = userData.token;

      login(userData);

      if (userData.role === 'personalloanmanger') {
        navigate('/personalloanmangerdashboard');
      } else if (userData.role === 'superadmin') {
        navigate('/superadmindashboard');
      } else if (userData.role === 'businessfinanceloanmanger') {
        navigate('/businessfinanceloanmangerdashboard');
      } else if (userData.role === 'realestateloanmanger') {
        navigate('/realestateloanmangerdashboard');
      } else if (userData.role === 'mortgageloanmanger') {
        navigate('/mortgageloanmangerdashboard');
      } else {
        navigate('/userdashboard');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      toast.error('Error logging in. Username or Password incorrect.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2 style={{ color: '#AE82CE' }}>JMA</h2>
        </div>
        <h4>Hello! Let's get started</h4>
        <h6 className="font-weight-light">Sign in to continue.</h6>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Username"
              {...register('email', { required: true })}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register('password', { required: true })}
              style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              variant="success"
              type="submit"
              disabled={isLoading}
              style={{ backgroundColor: '#AE82CE', borderColor: '#AE82CE', padding: '10px 20px', borderRadius: '4px' }}
            >
              {isLoading ? <Spinner animation="border" size="sm" /> : 'Log in'}
            </Button>
            <Link to='/forgot-password' style={{ color: '#AE82CE' }}>Forgot password?</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </Container>
  );
};

export default Login;
