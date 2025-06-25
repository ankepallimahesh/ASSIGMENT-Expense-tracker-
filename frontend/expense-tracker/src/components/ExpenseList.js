import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import './App1.css';

function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <Container className="mb-5 mt-3">
      <h2 className="mb-4 text-center">Expenses</h2>
      <Row>
        {expenses.map(exp => (
          <Col key={exp._id} xs={12} sm={6} lg={3} className="mb-4">
            <Card className="glassStyle">
              <Card.Body>
                <Card.Title>₹{exp.amount} - {exp.category}</Card.Title>
                <Card.Text>
                  {exp.description}<br />
                  <small className="text-muted">
                    {new Date(exp.date).toLocaleDateString()}
                  </small>
                </Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <Button variant="outline-primary" size="sm" onClick={() => onEdit(exp)}>Edit</Button>
                  <Button variant="outline-danger" size="sm" onClick={() => onDelete(exp._id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ExpenseList;
