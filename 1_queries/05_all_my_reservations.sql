SELECT reservations.id AS id,
properties.title AS title,
reservations.start_date AS start_date,
properties.cost_per_night AS cost_per_night,
AVG(property_reviews.rating)
FROM property_reviews
JOIN reservations ON property_reviews.reservation_id = reservations.id
JOIN properties ON property_reviews.property_id = properties.id
WHERE property_reviews.guest_id = 4
GROUP BY reservations.id, properties.id
ORDER BY reservations.start_date ASC;
