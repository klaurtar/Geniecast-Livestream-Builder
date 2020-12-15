const express = require('express');
const path = require('path');
const morgan = require('morgan');
const ejs = require('ejs');

const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const videoRoutes = require('./routes/videoRoutes');
const adminRoute = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoutes');
const videoAPIRoutes = require('./routes/videoAPIRoutes');

const app = express();

app.set('view engine', 'ejs');

//MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan reporting in 😎');
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static((__dirname, 'node_modules')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

app.use('/videos', videoRoutes);
app.use('/admin', adminRoute);
app.use('/v1/api/videos', videoAPIRoutes);
app.use('/v1/api/users', userRoutes);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
