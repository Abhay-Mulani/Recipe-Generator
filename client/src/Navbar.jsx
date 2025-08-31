
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 30px', background: '#eee' }}>
      <div>
        <Link to="/home" style={{ marginRight: 20 }}>Home</Link>
        <Link to="/generate">Generate Recipe</Link>
        <Link to="/favourites" style={{ marginLeft: 20 }}>Favourite Recipes</Link>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
