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

const getListingName = (listingId) => {
  return db.query('SELECT name FROM listings WHERE id = $1', [listingId])
    .then((res) => {
      return res.rows[0].name; //name.rows[0]
    });
};

const addListing = (userId, name, description, price, size, gender, condition) => {
  return db.query(`INSERT INTO listings (user_id, name, description, price, photo_url, size, gender, condition, listing_date, sold_date, isSold)
                  VALUES ($1, $2, $3, $4, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/PJz2ugNrQx28qykcwwFH', $5, $6, $7, CURRENT_TIMESTAMP, null, false) RETURNING *`,
    [userId, name, description, price, size, gender, condition])
    .then(result => {
      console.log(result.rows[0])
      return result.rows[0];
    });
};

module.exports = { getListings, getListingById, getListingsByUser, getListingName, addListing };
