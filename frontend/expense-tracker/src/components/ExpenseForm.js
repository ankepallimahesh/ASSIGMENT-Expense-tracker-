
import './App1.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Toast, ToastContainer, Spinner } from "react-bootstrap";
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'react-bootstrap/Button';

function ExpenseForm({ editingExpense = null, onSave, onCancel }) {
  const [show, setShow] = useState(false);
  const [warn, setWarn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [warning, setWarning] = useState("");
  const [message, setMessage] = useState("");

  const schema = yup.object({
    amount: yup.string().required("Please Enter Amount"),
    category: yup.string().required("Please Enter Category"),
    description: yup.string().required("Please Provide Description"),
    date: yup.date().required("Please Select Date")
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (editingExpense) {
      reset({
        amount: editingExpense.amount || '',
        category: editingExpense.category || '',
        description: editingExpense.description || '',
        date: editingExpense.date?.slice(0, 10) || ''
      });
    } else {
      reset();
    }
  }, [editingExpense, reset]);

  async function handle(data) {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("User not authenticated.");

      
      await onSave(
        editingExpense ? { ...editingExpense, ...data } : data,
        token
      );

      reset();
      setMessage(editingExpense ? "Expense updated successfully!" : "Expense added successfully!");
      setShow(true);
    } catch (error) {
      setWarn(true);
      setWarning(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="out">
        <form className="inn" onSubmit={handleSubmit(handle)}>
          <FloatingLabel controlId="floatingAmount" label="Amount" className="mb-3 mt-1">
            <Form.Control
              type="text"
              {...register("amount")}
              placeholder="Amount"
              disabled={loading}
            />
            <p style={{ color: 'red' }}>{errors.amount?.message}</p>
          </FloatingLabel>

          <FloatingLabel controlId="floatingCategory" label="Category" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Category"
              {...register("category")}
              disabled={loading}
            />
            <p style={{ color: 'red' }}>{errors.category?.message}</p>
          </FloatingLabel>

          <FloatingLabel controlId="floatingDescription" label="Description" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Description"
              {...register("description")}
              disabled={loading}
            />
            <p style={{ color: 'red' }}>{errors.description?.message}</p>
          </FloatingLabel>

          <FloatingLabel controlId="floatingDate" label="Date" className="mb-3">
            <Form.Control
              type="date"
              placeholder="Date"
              {...register("date")}
              disabled={loading}
            />
            <p style={{ color: 'red' }}>{errors.date?.message}</p>
          </FloatingLabel>

          <div className="d-flex justify-content-between">
            <Button type="submit" className="bt" disabled={loading} variant='outline-light'>
              {loading ? <Spinner animation="border" size="sm" /> : editingExpense ? "Update" : "Add"}
            </Button>
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      <ToastContainer position="bottom-center">
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={3000}
          autohide
          style={{ backgroundColor: "green", color: "white" }}>
          <Toast.Header><strong className="me-auto">Success</strong></Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>

      <ToastContainer position="bottom-center">
        <Toast
          onClose={() => setWarn(false)}
          show={warn}
          delay={3000}
          autohide
          style={{ backgroundColor: "red", color: "white" }}>
          <Toast.Header><strong className="me-auto">Error</strong></Toast.Header>
          <Toast.Body>{warning}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default ExpenseForm;