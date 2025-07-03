const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const pool = require('./db'); // PostgreSQL pool

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Load route files
const authRoutes = require('./routes/auth').default(pool);
const accountRoutes = require('./routes/account')(pool);
const enquiryRoutes = require('./routes/enquiry')(pool);
const demoRoutes = require('./routes/demo')(pool);
const studentRoutes = require('./routes/student')(pool);


// ✅ Use routes
app.use('/api', authRoutes);
app.use('/api', accountRoutes);
app.use('/api', enquiryRoutes);
app.use('/api', demoRoutes);
app.use('/api', studentRoutes);


// ✅ Serve login.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
