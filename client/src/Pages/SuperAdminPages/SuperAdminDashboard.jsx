import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import VideoUpload from '../../components/VideoUpload';
import { AuthContext } from '../AuthContext'; // Assuming the AuthContext is exported from this file
import MyNavbar from '../../components/Navbar';

const SuperAdminDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const { state } = useContext(AuthContext);
  const { userinfo } = state;

  useEffect(() => {
    // Establish socket connection if userinfo exists
    if (userinfo) {
      const socket = io('http://localhost:8080', {
        query: { userId: userinfo._id } // Pass the user ID as a query parameter
      });

      // Listen for 'newLoanApplication' event
      socket.on('newLoanApplication', (notification) => {
        setNotifications(prevNotifications => [...prevNotifications, notification]);
      });

      // Error handling for socket connection
      socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      // Clean up on component unmount
      return () => {
        socket.disconnect(); // Disconnect from Socket.IO server
      };
    }
  }, [userinfo]); // Reconnect socket when user changes

  return (
    <>
    <MyNavbar />
      <div>
        <h1>Super Admin Dashboard</h1>
        <h2>Notifications:</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification.message}</li>
          ))}
        </ul>
      </div>

      <div>
        <VideoUpload />
      </div>
    </>
  );
};

export default SuperAdminDashboard;
