let products = [
    { id: 1, name: 'Laptop', price: 60000 },
    { id: 2, name: 'Phone', price: 30000 }
];

//get req
exports.getAllProducts = (req, res) => {
    res.json(products)
}

exports.getProductById = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId)
    if (!product) return res.status(404).send('product does not exist')
    res.send(product)
}

//post req
exports.createProduct = (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
   res.status(201).json(newProduct); 

}

//put req
exports.updateProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const product = products.find(p => p.id === productId)
    if (!product) return res.status(404).send('product does not exist')
    if (name) product.name = name;
    if (price) product.price = price;
    res.send(`product updated at id : ${productId}`)
}

//delete req 
exports.deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === productId)
    if (index === -1) return res.status(404).send('product does not exist')
    products.splice(index, 1);
    res.send(`Product ID ${productId} deleted`);

}

//search product 
exports.searchProducts = (req,res)=>{
    const keyword = req.query.name;
    if (!keyword) return res.status(400).send('provide product name to search')
         const results = products.filter(product => product.name.toLowerCase().includes(keyword.toLowerCase()));
  res.json(results);
}