import './App.css';
import {  Routes, Route } from 'react-router-dom';
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
import User from './pages/User'

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<Dashboard />} />
         <Route path="transaction" element={<Transaction />} />
          <Route path="bill" element={<Bill />} />
           <Route path="employee" element={<Employee />} />
            <Route path="project" element={<Project />} />
             <Route path="customer" element={<Customer />} />
              <Route path="service" element={<ServiceOrder />} />
              <Route path="user" element={<User />} />
               <Route path="invoice" element={<Invoice />} />
                <Route path="account" element={<Account />} />
        {/* Add more nested routes here if needed */}
      </Route>
    </Routes>
  );
}

export default App;
