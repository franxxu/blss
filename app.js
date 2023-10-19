const path = require('path');
const express = require('express');
const morgan = require('morgan');
const playerRouter = require('./routes/playerRoutes');
const gameRouter = require('./routes/gameRoutes');
const statsRouter = require('./routes/statsRoutes');
const viewRouter = require('./routes/viewRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  console.log('[', process.env.NODE_ENV, ']');
}

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1/players', playerRouter);
app.use('/api/v1/games', gameRouter);
app.use('/api/v1/stats', statsRouter);
app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
