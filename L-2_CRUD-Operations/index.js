const express = require('express');
const app = express();
const port = 4000
app.use(express.json());

let users = [
  { id: 1, name: 'Aman', email: 'aman@gmail.com', city: 'Sonipat', password: '1234' },
  { id: 2, name: 'Srishti', email: 'sri@example.com', city: 'Delhi', password: '4321' }
];

// get request
app.get('/', (req, res) => {
  res.send('lets learn middlewares and CRUD operations!');
});

app.get('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send("user not found");
  }
  res.json(user)
})

//post request 
app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  res.send(`Thank youu, ${name},  we have got your email: ${email} `)
})

// put request
app.put('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);

  const { name, email } = req.body;

  const user = users.find(u => u.id === userId);

  if (!user) {
    console.log("User not found");
    return res.status(404).send('User not found');
  }

  if (name) user.name = name;
  if (email) user.email = email;

  res.send(`User with ID ${userId} updated successfully`);
})

app.put('/user/:id/city', (req, res) => {
  const userId = parseInt(req.params.id);
  const { city } = req.body
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  user.city = city;
  res.send(`City of user ID ${userId} updated to ${city} `);
})

app.put('/user/:id/password', (req, res) => {
  const userId = parseInt(req.params.id);
  const { password } = req.body;

  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send('User not found');
  }

  user.password = password;
  res.send(`Password of user ID ${userId} updated `);
});

//delete request
app.delete('/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).send('User not found');
  }
  users.splice(user, 1);

  res.send(`User with ID ${userId} deleted successfully `);
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
