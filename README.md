# 💸 Expense Tracker App

A full-stack MERN application to track expenses with analytics and secure login system.

---
✅ 2. Install Dependencies
cd backend
npm install

cd ../frontend/expense-tracker
npm install

3. Run the Application
   🖥️ Open two terminals:
   Terminal 1 → Run Backend:
     cd backend
     node index.js
   Terminal 2 → Run Frontend:
    cd frontend/expense-tracker
    npm start

## 📁 Folder Structure

- **/backend** → Node.js + Express API with MongoDB
- **/frontend/expense-tracker** → React-based frontend


## 📦 Tech Stack

- **Frontend**: React.js, Chart.js, React Hook Form, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Auth**: JSON Web Tokens (JWT)
- **Data Flow**: REST API using Axios

---

## ⚙️ Application Flow

1. **User Signup/Login**
   - User sends credentials to backend
   - Backend verifies and returns JWT token

2. **Authenticated Routes**
   - Token is stored in localStorage
   - Sent as `Authorization: Bearer <token>` header

3. **Expense Management**
   - Users can add/edit/delete expenses
   - Backend saves data in MongoDB
   - Data is retrieved and shown in charts

4. **Visualization**
   - React + Chart.js shows spending trends by category/date
  ## 🔐 Security Notes

- For the purpose of evaluation, the `.env` file is kept inside the `backend/` directory and included in the repository.
- This is **not a best practice**. In real-world deployments, environment secrets (like DB URI and JWT secrets) should be stored securely using `.gitignore` and deployment environment variables (like in Render, Vercel, or Heroku).
