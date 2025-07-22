import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayouts from './Main/MainLayouts';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account' ;
import Transaction from './pages/Transaction';
import Employee from './pages/Employee';
import Customer from './pages/Customer';
import Bill from './pages/Bill';
import ServiceOrder from './pages/ServiceOrder';
import Invoice from './pages/Invoice';
import Project from './pages/Project';
import Login from './pages/Login'

function App() {
  const user = useSelector((state) => state.user.user); // or however your state is structured

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      {user ? (
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<Dashboard />} />
          <Route path="transaction" element={<Transaction />} />
          <Route path="bill" element={<Bill />} />
          <Route path="employee" element={<Employee />} />
          <Route path="project" element={<Project />} />
          <Route path="customer" element={<Customer />} />
          <Route path="service" element={<ServiceOrder />} />
          <Route path="user" element={<Login />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="account" element={<Account />} />
        </Route>
      ) : (
        // Redirect to login if not authenticated
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

export default App;
