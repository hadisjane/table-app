import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Table from './components/Table';
import Form from './components/Form';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.slice().reverse());
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:5000/users', newUser);
      setUsers([response.data, ...users]);
      setPopupOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <Table users={users} loading={loading} />
      {error && <p>Error: {error}</p>}
      <div className="button-container">
        <button onClick={() => setPopupOpen(true)}>Отправить данные</button>
      </div>
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="popup-content"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <button className="close-btn" onClick={() => setPopupOpen(false)}>
                X
              </button>
              <Form onAddUser={addUser} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;