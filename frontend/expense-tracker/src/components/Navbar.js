import { Link, useNavigate } from 'react-router-dom';
import './App1.css';

function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/signin');
  };

  return (
    <div className="outer">
      <div className="inner1">
        Expense Tracker
      </div>
      <div>
       

        {!token ? (
          <>
            <Link to="/signin" className="inner">Signin</Link>
            <Link to="/signup" className="inner">Signup</Link>
          </>
        ) : (
          <>  <Link to="/" className="inner">Home</Link>
            <Link to="/dashboard" className="inner">Dashboard</Link>
            <Link to="/addexpense" className="inner">Add Expense</Link>
            <button onClick={handleLogout} className="inner" style={{  border: "none"}}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
