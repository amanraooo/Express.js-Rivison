const express = require('express');
const path = require('path');
const app = express();
const port = 5000;
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('Hello, Aman!');
});

app.get('/about', (req, res)=>{
  res.send('the about page');
});

//Route Parameters
app.get('/home/:naam', (req, res)=>{
  const  name = req.params.naam
   console.log("Route hit with name:", name);
  res.send(`haalo! ${name}`);
})

//query parameter
app.get('/search',  (req,res)=>{
    const Query = req.query.q;
    res.send(`you searched ${Query}`)
})

app.get('/weather',  (req,res)=>{
    const city = req.query.q;
    res.send(`you searched weather report for : ${city}`)
})

app.get('/products',  (req,res)=>{
    const product = req.query.product;
    const price = req.query.price;

    res.send(`you searched for product :${product} of price  : ${price}`)
})

//res.json()
app.get('/json', (req,res)=>{
  res.json({name:'aman', age:21})
})

//res.status()
app.get('/err',(req, res)=>{
  res.status(200).send('internal server error')
})

app.get('/user', (req, res) => {
  const user = { name: "Aman", role: "student" };
  res.status(200).json(user);
});


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
