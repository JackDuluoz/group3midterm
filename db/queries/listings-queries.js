const db = require('../connection');

const getListings = () => {
  return db.query('SELECT * FROM listings;')
    .then((data) => {
      // console.log(data.rows)
      return data.rows;
    });
};

const getListingById = (id) => {
  return db.query('SELECT * FROM listings WHERE id = $1', [id])
    .then((listing) => {
      // console.log(listing.rows[0])
      return listing.rows[0];
    });
};

const getListingByUser = (id) => {
  return db.query('SELECT * FROM listings WHERE user_id = $1', [user_id])
    .then((listing) => {
      // console.log(listing.rows[0])
      return listing.rows;
    });
};

module.exports = { getListings, getListingById, getListingByUser };

// \i db/schema/schema.sql
// \i db/seeds/seeds.sql
