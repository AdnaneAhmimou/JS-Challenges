const express = require('express');
const app = express();
const { logger, errorHandler } = require('./middleware/productMiddleware');
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use(logger);
app.use('/products', productRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
