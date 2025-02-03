const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require('pg');

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'lightbnb'
});


/// USERS

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  // SQL query to select user by email
  const queryString = ` 
    SELECT * 
    FROM users 
    WHERE email = $1;
  `;
  const values = [email.toLowerCase()]; // Convert email to lowercase and store values array

  return pool // Execute the query
    .query(queryString, values)
    .then(res => {
      // If no user is found, return null
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0]; // Return the first user found
    })
    .catch(err => {
      // If error occurs, log the error and return null
      console.error('query error', err.stack);
      return null;
    });
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // SQL query to select user by ID
  const queryString = `
    SELECT * 
    FROM users 
    WHERE id = $1;
  `;
  const values = [id]; // Store the ID in values array

  // Execute the query
  return pool
    .query(queryString, values)
    .then(res => {
      // If no user is found, return null
      if (res.rows.length === 0) {
        return null;
      }
      return res.rows[0]; // Return first user found
    })
    .catch(err => {
      // If error occurs, log error and return null
      console.error('query error', err.stack);
      return null;
    });
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function(user) {
  // SQL query to insert a new user
  const queryString = `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [user.name, user.email, user.password]; // Store user details in values array

  // Execute the query
  return pool
    .query(queryString, values)
    .then(res => {
      // Return the newly added user
      return res.rows[0];
    })
    .catch(err => {
      // If error occurs, log error and return null
      console.error('query error', err.stack);
      return null;
    });
};

/// RESERVATIONS

/**
 * Get all reservations for a single user.
 * @param {number} limit The number of result to return
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) { // Get reservations for ONE guest, showing 10 results
  // SQL query to select reservations with property details and average rating
  const queryString = `
    SELECT reservations.*, properties.*, AVG(property_reviews.rating) as average_rating
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = $1
      AND reservations.end_date < now()::date
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date DESC
    LIMIT $2;
  `;
  const values = [guest_id, limit]; // Store guest_id and limit in the values array

  // Execute the query
  return pool
    .query(queryString, values)
    .then(res => res.rows)
    // Return the rows of results
    .catch(err => {
      // If error occurs, log error and return null
      console.error('query error', err.stack);
      return null;
    });
};

/// PROPERTIES

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = (options, limit = 10) => {
  const queryParams = []; // possible parameters for the query
  
  // WHERE 1=1 removes the check for an existing WHERE clause and allows the use of AND for all queries
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE 1=1 
  `;

  // City Search
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `AND LOWER(city) LIKE $${queryParams.length} `;
  }

  // Owner_id Search
  if (options.owner_id) {
    queryParams.push(options.owner_id);
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  //  Set Minimum Price
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
  }

  // Set Maximum Price
  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  // Adding queries after the WHERE clause, but before the HAVING clause
  queryString += `
    GROUP BY properties.id
  `;

  // Set Minimum Rating
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `HAVING AVG(property_reviews.rating) >= $${queryParams.length} `;
  }

  // Adding queries after the WHERE clause, but before the HAVING clause
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
  `;

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => {
      console.error('query error', err.stack);
      return null;
    });
};

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */

// RETURNING at the base of the code block, will return the full property record
const addProperty = function(property) {
  const queryString = `
    INSERT INTO properties (
      owner_id, title, description, thumbnail_photo_url, cover_photo_url, 
      cost_per_night, street, city, province, post_code, country, 
      parking_spaces, number_of_bathrooms, number_of_bedrooms
    )
    VALUES (
      $1, $2, $3, $4, $5, 
      $6, $7, $8, $9, $10, $11, 
      $12, $13, $14
    )
    RETURNING *; 
  `;
  
  const values = [
    property.owner_id, property.title, property.description, property.thumbnail_photo_url, property.cover_photo_url,
    property.cost_per_night, property.street, property.city, property.province, property.post_code, property.country,
    property.parking_spaces, property.number_of_bathrooms, property.number_of_bedrooms
  ];

  return pool
    .query(queryString, values)
    .then(res => res.rows[0]) // Return the added property
    .catch(err => {
      console.error('query error', err.stack);
      return null;
    });
};

module.exports = {
  query: (text, parameters) => pool.query(text, parameters),
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
