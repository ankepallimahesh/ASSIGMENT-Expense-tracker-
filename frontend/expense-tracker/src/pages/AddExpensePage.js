// src/pages/AddExpensePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';

function AddExpensePage() {
  const [editingExpense, setEditingExpense] = useState(null);
  const location = useLocation();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const expenseId = queryParams.get('id');

    if (expenseId && token) {
      axios.get(`http://localhost:5000/expenses/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => setEditingExpense(res.data))
        .catch(err => console.error('Failed to load expense:', err));
    }
  }, [location.search, token]);

  const handleAddOrUpdate = async (expense) => {
    if (!expense) {
      console.error("No expense provided");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      if (expense._id) {
        await axios.put(`http://localhost:5000/expenses/${expense._id}`, expense, config);
      } else {
        await axios.post('http://localhost:5000/expenses', expense, config);
      }

      setEditingExpense(null);
      
    } catch (err) {
      console.error("Failed to save expense:", err);
      
    }
  };

  return (
    <div>
      <ExpenseForm
        onSave={handleAddOrUpdate}
        editingExpense={editingExpense}
        onCancel={() => setEditingExpense(null)}
      />
    </div>
  );
}

export default AddExpensePage;
