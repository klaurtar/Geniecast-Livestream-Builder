const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT Exception! 🚒  Shutting down...');
  console.log(err.name, err.message);
  //SHUT DOWN GRACEFULLY
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE_OFFICIAL.replace(
  '<USERNAME>',
  process.env.DATABASE_USERNAME_OFFICIAL
)
  .replace('<PASSWORD>', process.env.DATABASE_PASSWORD_OFFICIAL)
  .replace('<DBNAME>', process.env.DATABASE_NAME_OFFICIAL);

console.log(DB);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! 🚒  Shutting down...');
  //SHUT DOWN GRACEFULLY
  server.close(() => {
    process.exit(1);
  });
});
