require('dotenv').config();
// async errors
require('express-async-errors');

const express = require('express');
const app = express();

// ConnectDB
const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');

// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">Product Route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route
app.use(notFoundMiddleware);
app.use(notFound);

const port = process.env.PORT || 3000;

// on start-up
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();