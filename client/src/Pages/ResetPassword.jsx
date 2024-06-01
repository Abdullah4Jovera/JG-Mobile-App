import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Button, Spinner, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const token = location.state?.token;
  const email = location.state?.email;

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/users/reset-password', { ...data, token, email, newPassword: data.password });
      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      console.error('Error resetting password:', error);
      toast.error(error.response?.data?.message || 'Error resetting password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#AE82CE' }}>Reset Password</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formPassword">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              {...register('password', { required: 'Password is required' })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formConfirmPassword">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your new password"
              {...register('confirmPassword', { required: 'Please confirm your password' })}
              isInvalid={!!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', backgroundColor: '#AE82CE', borderColor: '#AE82CE', marginTop: '20px' }}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Reset Password'}
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default ResetPassword;
