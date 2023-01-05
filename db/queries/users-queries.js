const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(users => {
      return users.rows;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
    .then(user => {
      return user.rows[0];
    });
};

const checkUserByEmail = (email) => {
  return db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(email => {
      // console.log(user.rows[0])
      return email.rows[0];
    });
};

const getUserIdByEmail = (email) => {
  return db.query('SELECT id FROM users WHERE email = $1', [email])
    .then(email => {
      // console.log(user.rows[0])
      return email.rows[0];
    });
};

const addUser = (email, password) => {
  return db.query(`INSERT INTO users (name, username, password, address, email, phone_number)
                  VALUES ('generic', 'generic', $2, 'generic', $1, 999) RETURNING *`, [email, password])
    .then(result => {
      console.log(result.rows[0])
      return result.rows[0];
    });

};

module.exports = { getUsers, getUserById, checkUserByEmail, addUser, getUserIdByEmail };
