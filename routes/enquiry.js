// ✅ routes/enquiry.js
const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  async function generateEnquiryId() {
    const today = new Date().toISOString().slice(0, 10);
    const result = await pool.query('SELECT * FROM enquiry_ids WHERE date = $1', [today]);

    if (result.rows.length === 0) {
      await pool.query('INSERT INTO enquiry_ids (date, count) VALUES ($1, 1)', [today]);
      return 'KPH1600';
    } else {
      const newCount = result.rows[0].count + 1;
      await pool.query('UPDATE enquiry_ids SET count = $1 WHERE date = $2', [newCount, today]);
      return 'KPH' + (1600 + newCount - 1);
    }
  }

  router.post('/enquiry', async (req, res) => {
    const contact = req.body.contact;
    if (!contact || !req.body.course || !req.body.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const userRes = await pool.query(
        `SELECT first_name || ' ' || last_name AS full_name, contact AS email, dob FROM accounts WHERE contact = $1`,
        [contact]
      );
      if (userRes.rows.length === 0) return res.status(404).json({ error: 'User not found' });

      const { full_name, email, dob } = userRes.rows[0];
      const enquiryId = await generateEnquiryId();
      const date = new Date().toISOString().slice(0, 10);

      const {
        phone, course, source, education, passedOutYear,
        about, mode, batchTiming, language, status, comment
      } = req.body;

      await pool.query(
        `INSERT INTO enquiries (
          enquiry_id, date, full_name, phone, email, dob,
          course, source, education, passed_out_year, about,
          mode, batch_timing, language, status, comment
        ) VALUES (
          $1, $2, $3, $4, $5, $6,
          $7, $8, $9, $10, $11,
          $12, $13, $14, $15, $16
        )`,
        [
          enquiryId, date, full_name, phone, email, dob,
          course, source, education, passedOutYear, about,
          mode, batchTiming, language, status, comment
        ]
      );

      res.status(200).json({ enquiryId });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  return router;
};
