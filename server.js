const express = require('express');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/tables', require('./routes/api/tables'));
app.use('/api/menu', require('./routes/api/menu'));
app.use('/api/reservation', require('./routes/api/reservation'));
app.use('/api/lines', require('./routes/api/lines'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
