const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000
dotenv.config();

const app = express();
app.use(express.json());

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFile : true;
}));

const db = require('./config/database');
db.connect();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
