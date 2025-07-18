const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/protected', protectedRoutes);
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(4000, () => console.log("Server running"));
  })
  .catch((err) => console.log(err));
