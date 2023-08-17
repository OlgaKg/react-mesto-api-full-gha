const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(requestLogger);
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.use(cors({
  origin: ['http://localhost:3001', 'https://ypmesto.nomoreparties.co'],
  credentials: true,
  maxAge: 30,
}));

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(routes);

app.use(errorLogger);
routes.use(errors());
app.use(errorHandler);

mongoose.connect(config.mongodbURI, {
  useNewUrlParser: true,
});

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${config.port}`);
});
