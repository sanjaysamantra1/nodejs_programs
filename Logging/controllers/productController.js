const products = [
  { id: 101, name: 'Laptop', price: 55000 },
  { id: 102, name: 'Phone', price: 25000 }
];

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

exports.createProduct = (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: products.length + 101, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
};
