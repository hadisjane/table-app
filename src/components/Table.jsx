import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Table({ users, loading }) {
  const rowVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="table"
      >
        <p>Loading...</p>
      </motion.div>
    );
  }

  return (
    <div className="table">
      <h1>Пользователи</h1>
      <table>
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Возраст</th>
            <th>Номер</th>
            <th>Почта</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {users.map((item, index) => (
              <motion.tr
                key={item.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ delay: index * 0.1 }}
              >
                <td>{item.name}</td>
                <td>{item.surname}</td>
                <td>{item.age}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: users.length * 0.1 }}
          >
            Всего пользователей: {users.length}
          </motion.p>
      </table>
    </div>
  );
}

export default Table;