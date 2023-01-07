//All SQL queries related to users

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
      console.log(result.rows[0]);
      return result.rows[0];
    });

};

//Queries for populating email to ,from and name
const getBuyerEmail = (buyerId) => {
  return db.query('SELECT email FROM users WHERE id = $1', [buyerId])
    .then(res => {
      return res.rows[0].email;
    });
};

const getSellerEmail = (listingId) => {
  return db.query('SELECT email FROM users JOIN listings ON listings.user_id = users.id WHERE listings.id = $1', [listingId])
    .then(res => {
      return res.rows[0].email;
    });
};

const getUserName = (buyerId) => {
  return db.query('SELECT name FROM users WHERE users.id = $1', [buyerId])
    .then(res => {
      return res.rows[0].name;
    });
};

module.exports = { getUsers, getUserById, checkUserByEmail, addUser, getUserIdByEmail, getBuyerEmail, getSellerEmail, getUserName};
