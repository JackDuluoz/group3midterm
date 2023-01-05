const db = require('../connection');

const minPrice = (price) => {
  return db.query('SELECT * FROM listings WHERE price >= $1', [price])
    .then((data) => {
      // console.log(data.rows)
      return data.rows;
    });
};

const maxPrice = (price) => {
  return db.query('SELECT * FROM listings WHERE price <= $1', [price])
    .then((data) => {
      // console.log(data.rows)
      return data.rows;
    });
};

const favorites = (user_id) => {
  return db.query(`SELECT * FROM favorites
   JOIN users ON users.id = $1
   `, [user_id]);
};

const available = () => {
  return db.query(`SELECT * FROM listings
  WHERE isSold = false
  `).then((data) => {
    // console.log(data.rows)
    return data.rows;
  });
};

const sold = () => {
  return db.query(`SELECT * FROM listings
  WHERE isSold = true
  `).then((data) => {
    // console.log(data.rows)
    return data.rows;
  });
};

const allListings = () => {
  return db.query(`SELECT * FROM listings
  `).then((data) => {
    // console.log(data.rows)
    return data.rows;
  });
};




