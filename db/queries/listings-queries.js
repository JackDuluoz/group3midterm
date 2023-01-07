//All SQL queries related to item listings

const db = require('../connection');

//filtering by max price, min price and favorites
const getListings = (options) => {

  const queryParams = [];

  let queryString = `SELECT listings.* FROM listings `;

  if (options && options.favorites) {
    queryString += `
    INNER JOIN favorites ON listings.id = favorites.listing_id
    JOIN users ON users.id = favorites.user_id
    WHERE users.id = ${options.currentUser}
     `;
  }

  if (options && options.minPrice) {
    queryParams.push(`${options.minPrice}`);

    if (options.favorites) {
      queryString += `AND price >= $${queryParams.length} `;
    } else {
      queryString += `WHERE price >= $${queryParams.length} `;
    }
  }

  if (options && options.maxPrice) {
    queryParams.push(`${options.maxPrice}`);

    if (options.minPrice || options.favorites) {
      queryString += `AND price <= $${queryParams.length} `;
    } else {
      queryString += `WHERE price <= $${queryParams.length} `;
    }
  }

  //console.log(queryString);
  //console.log(queryParams);

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


//get listing name for email subject header
const getListingName = (listing_id) => {
  return db.query('SELECT name FROM listings WHERE id = $1', [listing_id])
    .then((res) => {
      return res.rows[0].name; //name.rows[0]
    });
};

//delete listing in mylistings
const deleteListingQuery = (listing_id) => {
  return db.query('DELETE FROM listings WHERE listings.id = $1', [listing_id])
    .then((res) => {
      console.log('listing deleted', res);
    });
};

// adds new item to listings
const addListing = (user_id, name, description, price, size, gender, condition) => {
  return db.query(`INSERT INTO listings (user_id, name, description, price, photo_url, size, gender, condition, listing_date, sold_date, isSold)
                  VALUES ($1, $2, $3, $4, 'https://process.fs.grailed.com/AJdAgnqCST4iPtnUxiGtTz/auto_image/cache=expiry:max/rotate=deg:exif/output=quality:90/compress/PJz2ugNrQx28qykcwwFH', $5, $6, $7, CURRENT_TIMESTAMP, null, false) RETURNING *`,
  [user_id, name, description, price, size, gender, condition])
    .then(result => {
      console.log(result.rows[0]);
      return result.rows[0];
    });
};

//mark items as sold
const markAsSoldQuery = (listing_id) => {
  return db.query(`UPDATE listings SET name = 'SOLD', description = 'SOLD' WHERE listings.id = $1 `, [listing_id])
    .then((res) => {
      console.log('listing marked as sold', res);
    });
};


//favorites queries
const addToFavorites = (user_id, listing_id) => {
  return db.query(`INSERT INTO favorites (user_id, listing_id)
  VALUES ($1, $2)`, [user_id, listing_id]);
};

const deleteFromFavorites = (user_id, listing_id) => {
  return db.query(`DELETE FROM favorites WHERE user_id = $1 AND listing_id = $2`, [user_id, listing_id]);
};

// If favorited, it gives one result. If nothing, it does not give a result
const checkIfFavorited = (user_id, listing_id) => {
  return db.query(`SELECT 1 FROM favorites JOIN users ON favorites.user_id = users.id
  JOIN listings ON favorites.listing_id = listings.id
  WHERE users.id = $1 AND listings.id = $2
  GROUP BY users.id, listings.id, favorites.id;`, [user_id, listing_id]);
};


module.exports = { getListings, getListingById, getListingsByUser, getListingName, addListing, deleteListingQuery, markAsSoldQuery, addToFavorites, checkIfFavorited, deleteFromFavorites };
