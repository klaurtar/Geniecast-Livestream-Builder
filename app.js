const express = require('express');
const path = require('path');
const morgan = require('morgan');
const User = require('./models/userModel');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss');
const hpp = require('hpp');
// const cors = require('cors');
const compression = require('compression');

const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const videoRoutes = require('./routes/videoRoutes');
const adminRoute = require('./routes/adminRoute');
const userRoutes = require('./routes/userRoutes');
const videoAPIRoutes = require('./routes/videoAPIRoutes');

const app = express();

//Set Security HTTP headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    policy: 'no-referrer',
  })
);

app.set('view engine', 'ejs');

// app.use(
//   cors({
//     origin: 'https://geniecast-video-page-builder.herokuapp.com/',
//   })
// );

//MIDDLEWARE

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan reporting in 😎');
}

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
}); //allows 100 requests from the same IP in one hour

app.use('/api', limiter);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Data Sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data Sanitization against XSS
// app.use(xss());

app.use(cookieParser());

app.use(compression());

app.use(express.static((__dirname, 'node_modules')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

app.get('/', (req, res) => {
  res.render('homePage');
});

app.use('/videos', videoRoutes);
app.use('/admin', adminRoute);
app.use('/v1/api/videos', videoAPIRoutes);
app.use('/v1/api/users', userRoutes);

app.all('*', (req, res, next) => {
  // respond with html
  if (req.accepts('html')) {
    res.render('404');
  }

  // respond with json
  if (req.accepts('json')) {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  }
});

app.use(globalErrorHandler);

module.exports = app;
