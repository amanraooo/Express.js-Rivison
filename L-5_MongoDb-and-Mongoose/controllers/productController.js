const Product = require('../models/productModel');

//get products (GET)
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).send('server error')
    }

}

//get products by id (GET)
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product  not found');
        res.json(product)
    } catch (err) {
        res.status(500).send('server error')
    }
};

//create product (POS)T
exports.createProduct = async (req, res) => {
    try {
        const { name, price } = req.body
        const newProduct = new Product({ name, price });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

//update product (PUT)
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        const { name, price } = req.body
        if (!product) return res.status(404).send('product not found');
        if (name) product.name = name
        if (price) product.price = price
        await product.save();
        res.json({ message: 'product updated', product })
    } catch (err) {
        res.status(500).send('server error')
    }
}

//delete product (DELETE)
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).send('product not found')
        res.send(`Product ID ${req.params.id} deleted`)
    } catch (err) {
        res.status(500).send('server error')
    }
}

exports.searchProducts = async (req, res) => {
  const keyword = req.query.name;

  if (!keyword) return res.status(400).send('Please provide a name to search');

  try {
    const result = await Product.find({
      name: { $regex: keyword, $options: 'i' } // case-insensitive match
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};
