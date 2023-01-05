const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(users => {
      // console.log(users.rows)
      return users.rows;
    });
};

const getUserById = (id) => {
  return db.query('SELECT * FROM users WHERE id = $1', [id])
    .then(user => {
      // console.log(user.rows[0])
      return user.rows[0];
    });
};

const getBuyerEmail = (buyerId) => {
  /* return db.query('SELECT email FROM users WHERE id = $1', [buyerId])
  .then(res => {
    return res.rows[0].email;
  }) */
  return Promise.resolve('bob@bob.com');
};

const getSellerEmail = (listingId) => {
/*   return db.query('SELECT email FROM users JOIN listings ON listings.user_id = users.id WHERE listings.id = $1', [listingId])
  .then(res => {
    return res.rows[0].email;
  }) */
  return Promise.resolve('kirstenhammondrvn@gmail.com');
};

const getUserName = (buyerId) => {
  /* return db.query('SELECT name FROM users WHERE users.id = $1', [buyerId])
  .then(res => {
    return res.rows[0].name;
  }) */
  return Promise.resolve('bob');
};

module.exports = { getUsers, getUserById, getBuyerEmail, getSellerEmail, getUserName };
