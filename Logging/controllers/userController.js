const users = [
  { id: 1, name: 'Alice', email: 'alice@mail.com' },
  { id: 2, name: 'Bob', email: 'bob@mail.com' }
];

exports.getAllUsers = (req, res) => {
  res.json(users);
};

exports.getUserById = (req, res, next) => {
  try {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(user);
  } catch (err) {
    next(err); // send error to global handler
  }
};


exports.createUser = (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};
