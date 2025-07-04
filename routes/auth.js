const express = require('express');

module.exports = (pool) => {
  const router = express.Router(); // ✅ move inside exported function

  // === POST /api/first-login ===
  router.post('/first-login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const query = 'SELECT * FROM users WHERE email = $1';
      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }

      const user = result.rows[0];

      if (user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isFirstLogin = user.first_login === true;

      res.json({ message: 'Login successful', firstLogin: isFirstLogin });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  // === POST /api/change-password ===
  router.post('/change-password', async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

      if (result.rows.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }

      const user = result.rows[0];

      if (user.password !== oldPassword) {
        return res.status(403).json({ error: 'Old password is incorrect' });
      }

      await pool.query(
        'UPDATE users SET password = $1, first_login = false WHERE email = $2',
        [newPassword, email]
      );

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error during password change:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  return router;
};
