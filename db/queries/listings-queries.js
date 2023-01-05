const db = require('../connection');

const getListings = (options) => {

  const queryParams = [];

  let queryString = `SELECT * FROM listings `;

  if (options && options.minPrice) {
    queryParams.push(`${options.minPrice}`);
    queryString += `WHERE price >= $${queryParams.length} `;
  }

  if (options && options.maxPrice) {
    queryParams.push(`${options.maxPrice}`);

    if (options.minPrice) {
      queryString += `AND price <= $${queryParams.length}`;
    } else {
      queryString += `WHERE price <= $${queryParams.length}`;
    }
  }

  console.log(queryString);
  console.log(queryParams);

  return db.query(queryString, queryParams)
    .then(res => res.rows);
};

const getListingById = (id) => {
  return db.query('SELECT * FROM listings WHERE id = $1', [id])
    .then((listing) => {
      return listing.rows[0];
    });
};

const getListingsByUser = (user_id) => {
  return db.query('SELECT * FROM listings WHERE user_id = $1', [user_id])
    .then((listings) => {
      return listings.rows;
    });
};

module.exports = { getListings, getListingById, getListingsByUser };

// \i db/schema/schema.sql
// \i db/seeds/seeds.sql
