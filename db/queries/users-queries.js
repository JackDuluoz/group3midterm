const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      console.log(data.rows)
      return data.rows;
    });
};

module.exports = { getUsers };
