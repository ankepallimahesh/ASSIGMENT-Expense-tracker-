import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExpenseList from '../components/ExpenseList';
import ExpenseDashboard from '../components/ExpenseDashboard';
import ExpenseForm from '../components/ExpenseForm';
import { Modal, Spinner } from 'react-bootstrap';

function ExpenseListPage() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); 

  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const fetchExpenses = async () => {
    setLoading(true); 
    try {
      const res = await axios.get('http://localhost:5000/expenses', config);
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`, config);
      fetchExpenses();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleSave = async (data) => {
    if (!data) return;
    try {
      if (data._id) {
        await axios.put(`http://localhost:5000/expenses/${data._id}`, data, config);
      } else {
        await axios.post('http://localhost:5000/expenses', data, config);
      }
      setShowModal(false);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      console.error("Error saving expense:", err);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Spinner animation="border" variant="primary" role="status" />
        </div>
      ) : expenses.length === 0 ? (
        <div className="text-center mt-5 text-muted fs-4">No expenses added</div>
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingExpense ? "Edit Expense" : "Add Expense"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExpenseForm
            editingExpense={editingExpense}
            onSave={handleSave}
            onCancel={() => setShowModal(false)}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ExpenseListPage;
