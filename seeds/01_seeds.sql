INSERT INTO users (name, email, password)
VALUES ('Darryl Mckael', 'dmme@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eva Stanley', 'es666@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dominic Parks', 'meowmeowmeow@shaw.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bedrooms, number_of_bathrooms, country, street, city, province, post_code, active)
VALUES (1, 'Cozy Central Apartment', 'description', 'photo_url', 'cover photo url', 189, 0, 1, 1, 'Canada', '186 Barlow Street', 'Vancouver', 'V6G 9D5', 'BC', true),
(2, 'Nice Bungalo', 'description', 'photo_url', 'cover photo url', 110, 1, 2, 2, 'Canada', '7865 22nd Avenue', 'Calgary', 'T5D 2FW', 'AB', false),
(3, 'Good Location Townhouse', 'description', 'photo_url', 'cover photo url', 175, 2, 1.5, 3, 'Canada', '4 Rue Varos', 'Montreal', 'X8B 1Y1', 'QC', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 3),
('2019-01-04', '2019-02-01', 2, 1),
('2021-10-01', '2021-10-14', 3, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (3, 1, 1, 4, 'message'),
(1, 2, 2, 2, 'message'),
(2, 3, 3, 5, 'message');