const db = require('../connection');

const getListings = () => {
  return db.query('SELECT * FROM listings;')
    .then((data) => {
      console.log(data.rows)
      return data.rows;
    });
};

module.exports = { getListings };
