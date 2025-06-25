import React from 'react';
import './App.css';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddExpensePage from './pages/AddExpensePage';
import ExpenseListPage from './pages/ExpenseListPage';
import ExpenseDashboard from './components/ExpenseDashboard';
import Navbar from './components/Navbar';
function App() {
  return (
    <div>
   
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/addexpense" element={<AddExpensePage/>}/>
        <Route path="/" element={<ExpenseListPage/>}/>
        <Route path="/dashboard" element={<ExpenseDashboard/>}/>

      </Routes>
    </Router>
  
   </div>
  );
}

export default App;