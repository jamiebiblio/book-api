const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book');
const userRoutes = require('./routes/users');
const config = require('./config');

//DB setup
mongoose.connect(
  config.MONGO_URI,
  { useNewUrlParser: true }
);

app.use(bodyParser.json({ type: '*/*' }));

app.use('/users', userRoutes);
app.use('/', bookRoutes);

app.listen(3000, () =>
  console.log(`Open http://localhost:3000 to see a response.`)
);

