const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const app = require('./app');

// const DATABASE_URL = process.env.DATABASE_URI.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION! shutting down gracefully.');
  process.exit(1);
});

mongoose.connect(process.env.DATABASE_LOCAL, {}).then(() => {
  console.log('Connected to database');
});

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! shutting down gracefully.');
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});
