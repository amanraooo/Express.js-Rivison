const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Bhaisaab!');
});

app.get('/about', (req, res)=>{
  res.send('the about page');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
