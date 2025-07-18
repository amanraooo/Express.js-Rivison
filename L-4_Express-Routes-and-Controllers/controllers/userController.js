let users = [
  { id: 1, name: 'Aman', email: 'aman@gmail.com' },
  { id: 2, name: 'Srishti', email: 'sri@example.com' }
];

//get req
const getAllUsers = (req, res) => {
  res.json(users);
};
const getUserById = (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

//post req
const createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};

//put req
const updateUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const { email } = req.body;
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).send('User does not exist');
  if (email) user.email = email;
  res.send(`User ID ${userId} updated`);
};

//delete req
const deleteUser = (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === userId);
  if (index === -1) return res.status(404).send('User does not exist');
  users.splice(index, 1);
  res.send(`User ID ${userId} deleted`);
};

//search user
const searchUsers = (req, res) => {
  const keyword = req.query.name;
  if (!keyword) return res.status(400).send('provide name to search')
  const results = users.filter(user => user.name.toLowerCase().includes(keyword.toLowerCase()));
  res.json(results);
}


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers
};
