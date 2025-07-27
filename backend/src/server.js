const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { keyValueRouter } = require('./routes/store');
const { healthRouter } = require('./routes/health');

const app = express();

app.use(bodyParser.json());
app.use('/health', healthRouter);
app.use('/store', keyValueRouter);

console.log('Connecting to DB');
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(80, () => {
      console.log(`Listening on port 80`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB');
    console.error(err);
  });