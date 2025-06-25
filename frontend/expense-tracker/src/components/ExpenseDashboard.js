import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import { Container, Row, Col } from 'react-bootstrap';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function ExpenseDashboard() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/expenses', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const monthlyTotals = expenses.reduce((acc, exp) => {
    const month = new Date(exp.date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const categoryColors = [
    '#60a5fa', '#34d399', '#fbbf24', '#f87171', '#a78bfa',
    '#fd7e14', '#6f42c1', '#20c997', '#dc3545', '#0dcaf0'
  ];

  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} lg={6} className="mb-4">
          <h4 className="mb-3 text-center">Category Breakdown</h4>
          <div style={{ width: '100%', height: '400px' }}>
            <Pie
              data={{
                labels: Object.keys(categoryTotals),
                datasets: [{
                  data: Object.values(categoryTotals),
                  backgroundColor: categoryColors.slice(0, Object.keys(categoryTotals).length),
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Col>

        <Col xs={12} lg={6}>
          <h4 className="mb-3 text-center">Monthly Expenses</h4>
          <div style={{ width: '100%', height: '400px' }}>
            <Bar
              data={{
                labels: Object.keys(monthlyTotals),
                datasets: [{
                  label: 'Monthly Expenses',
                  data: Object.values(monthlyTotals),
                  backgroundColor: '#3b82f6',
                }]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ExpenseDashboard;
