require('dotenv').config();
const connectDB = require('./config/db');
const app = require('./server');

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});