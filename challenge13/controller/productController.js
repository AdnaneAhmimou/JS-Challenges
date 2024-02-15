
let products = [
  { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
  { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
  { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
  { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
  { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];

const getAllProducts = (req, res) => {
  res.json(products);
};

const createProduct = (req, res) => {
  const product = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
  };
  products.push(product);
  res.status(201).json(product);
};

const searchProducts = (req, res) => {
  let filteredProducts = products;

  if (req.query.q) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(req.query.q.toLowerCase())
    );
  }

  if (req.query.minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseFloat(req.query.minPrice)
    );
  }

  if (req.query.maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(req.query.maxPrice)
    );
  }

  res.json(filteredProducts);
};

const getProductById = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);
  if (!product) {
    res.status(404).send("The product with the given ID was not found");
    return;
  }
  res.json(product);
};

const updateProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((product) => product.id === productId);
  if (!product) {
    res.status(404).send("The product with the given ID was not found");
    return;
  }
  product.name = req.body.name;
  product.price = req.body.price;
  res.json(product);
};

const deleteProduct = (req, res) => {
  const productId = parseInt(req.params.id);
  const productIndex = products.findIndex(
    (product) => product.id === productId
  );
  if (productIndex === -1) {
    res.status(404).send("The product with the given ID was not found");
    return;
  }
  products.splice(productIndex, 1);
  res.status(200).send("Product deleted");
};

module.exports = { 
    getAllProducts, createProduct, 
    searchProducts, getProductById, 
    updateProduct, deleteProduct 
};