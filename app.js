require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const errorsHandler = require('./middlewares/errorsHandler');
const routes = require('./routes/index');
const { limiter, dataBase } = require('./utils/config');
const { messageValidationError } = require('./utils/const');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect(dataBase, {
  useNewUrlParser: true,
});
app.use(cors);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(routes);
app.use(errorLogger);
app.use(errors({ message: messageValidationError }));
app.use(errorsHandler);
app.listen(PORT, () => {
  console.log(`Сервер запущен на порте: ${PORT}`);
});
