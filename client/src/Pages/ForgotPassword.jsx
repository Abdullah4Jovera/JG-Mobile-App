import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Button, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post('http://localhost:8080/api/users/forgot-password', data);
      toast.success(response.data.message);
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (error) {
      console.error('Error sending OTP:', error);
      toast.error(error.response?.data?.message || 'Error sending OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div style={{ width: '100%', maxWidth: '400px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#AE82CE' }}>Forgot Password</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              {...register('email', { required: 'Email is required' })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="success"
            type="submit"
            disabled={isLoading}
            style={{ width: '100%', backgroundColor: '#AE82CE', borderColor: '#AE82CE', marginTop: '20px' }}
          >
            {isLoading ? <Spinner animation="border" size="sm" /> : 'Send OTP'}
          </Button>
        </Form>
        <ToastContainer />
      </div>
    </Container>
  );
};

export default ForgotPassword;
