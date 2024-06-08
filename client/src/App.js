import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login';
import SuperAdminRoute from './Pages/routes/SuperAdminRoute'
import BusinessRoute from './Pages/routes/BusinessRoute'
import MortgageRoute from './Pages/routes/MortgageRoute'
import PersonalRoute from './Pages/routes/PersonalRoute'
import UserRoute from './Pages/routes/UserRoute'
import RealestateRoute from './Pages/routes/RealestateRoute'
import SuperAdminDashboard from './Pages/SuperAdminPages/SuperAdminDashboard'
import BusinessManagerDashboard from './Pages/BusinessFinanceLoanManagerPages/BusinessManagerDashboard'
import UserDashboard from './Pages/UserPages/UserDashboard'
import PersonalManagerDashboard from './Pages/PersonalLoanManagerPages/PersonalManagerDashboard'
import RealestateManagerDashboard from './Pages/RealestateLoanManagerPages/RealestateMangerDashboard'
import MortgageManagerDashboard from './Pages/MortgageLoanManagerPages/MortagageManagerDashboard'
import Register from './Pages/Register';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import OTP from './Pages/OTP';
import Loans from './Pages/UserPages/Loans';
import LoanDetails from './Pages/UserPages/LoanDetails';
import Massages from './Pages/UserPages/Massages';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          
          {/* Super Admin Routes */}
          <Route path="/superadmindashboard" element={<SuperAdminRoute ><SuperAdminDashboard /></SuperAdminRoute>} />

          {/* Busines Routes */}
          <Route path="/businessfinanceloanmangerdashboard" element={<BusinessRoute ><BusinessManagerDashboard /></BusinessRoute>} />

          {/* Personal Routes */}
          <Route path="/personalloanmangerdashboard" element={<PersonalRoute ><PersonalManagerDashboard /></PersonalRoute>} />

          {/* Realestate Routes */}
          <Route path="/realestateloanmangerdashboard" element={<RealestateRoute ><RealestateManagerDashboard /></RealestateRoute>} />

          {/* Mortgage Routes */}
          <Route path="/mortgageloanmangerdashboard" element={<MortgageRoute ><MortgageManagerDashboard /></MortgageRoute>} />

          {/* User Routes */}
          <Route path="/userdashboard" element={<UserRoute ><UserDashboard /></UserRoute>} />
          <Route path="/loans" element={<UserRoute ><Loans /></UserRoute>} />
          <Route path="/loan/:loanType/:loanId" element={<UserRoute ><LoanDetails /></UserRoute>} />
          <Route path="/usermassages" element={<UserRoute ><Massages /></UserRoute>} />




        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
