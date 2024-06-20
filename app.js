import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Improved Mongoose connection handling:
const MONGOURL = process.env.MONGOURL;

mongoose.connect(MONGOURL)
.then(() => console.log('MongoDB database connected successfully'))
.catch(error => {
  console.error('Error connecting to MongoDB:', error);
  // Optional: Throw an error to stop server startup
  // throw error;
});

// Error handling for server startup:
const PORT = process.env.PORT || 7000;

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
.on('error', (error) => {
  console.error('Error starting server:', error);
});

const DocumentSchema = new mongoose.Schema({
  file: { type: String, required: true },
  activity: { type: String, required: true },
  generation: { type: String, required: true },
  createdon: { type: Date,required:true } // Adjust data type if needed
});


const DocumentModel = mongoose.model("document", DocumentSchema);

// API endpoint to retrieve documents
app.get("/api/getDoc", async (req, res) => {
  try {
    const documentData = await DocumentModel.find();
    res.json(documentData);
  } catch (error) {
    console.error('Error retrieving doc data:', error);
    res.status(500).json({ message: 'Error retrieving doc data' });
  }
});

// const express = require('express');
// const cors = require('cors'); // (if needed)
// const bodyParser = require('body-parser'); // (if needed)

// const app = express();
// const port = process.env.PORT || 3000; // Use environment variable for flexibility

// // CORS configuration (if needed)
// app.use(cors({ origin: 'http://localhost:4200' })); // Replace with your Angular app's origin

// // Body parser configuration (if needed)
// app.use(bodyParser.json());

// // Define your Express routes here (e.g., API endpoints)
// app.get('/api/data', (req, res) => {
//   // Example API endpoint to return some data
//   res.json({ message: 'Hello from Express!' });
// });

// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });




// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// var app = express();
// var cors = require('cors')
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
