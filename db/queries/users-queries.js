const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(users => {
      console.log(users.rows)
      return users.rows;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
    .then(user => {
      console.log(user.rows[0])
      return user.rows[0];
    });
};

module.exports = { getUsers, getUserById };
