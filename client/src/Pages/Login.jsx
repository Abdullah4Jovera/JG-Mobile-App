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
      // Navigate based on userinfo role if userinfo is already logged in
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
      const response = await axios.post('/api/users/login', data);
      const userData = response.data.user;

      const token = userData.token;

      login(userData);

      // Navigate based on user role
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

  // const handleCancel = () => {
  //   navigate('/');
  // };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth" style={{}}  >
          <div className="row flex-grow"  >
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-left p-5">
                <div className="brand-logo"  >
                  {/* <img src="../../assets/images/logo.svg" /> */}
                  <h2 style={{ color: '#AE82CE' }} >JMA</h2>
                </div>
                <h4>Hello! let's get started</h4>
                <h6 className="font-weight-light">Sign in to continue.</h6>
                <form className="pt-3" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      id="exampleInputEmail1"
                      placeholder="Username"
                      {...register('email', { required: true })}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      {...register('password', { required: true })}
                    />
                  </div>
                  <div className="mt-3" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Button
                      variant="success"
                      type="submit"
                      disabled={isLoading}
                      className="blue-button"
                      style={{ backgroundColor: '#AE82CE', borderColor: '#AE82CE' }}
                    >
                      {isLoading ? <Spinner animation="border" size="sm" /> : 'Log in'}
                    </Button>
                    <Link to='/forgotpassword' style={{ color: 'black' }} >Forgot password?</Link>

                  </div>

                  {/* <div className="text-center mt-4 font-weight-light">
                    Don't have an account?
                    <Link to='/register' >Create</Link>

                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* content-wrapper ends */}
      </div>
      {/* page-body-wrapper ends */}
    </div>

  );
};

export default Login;