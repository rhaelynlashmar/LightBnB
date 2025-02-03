# LightBnB Summary

LightBnB is a MOCK web application for booking and managing short-term rentals. 
It allows users to browse available properties, make reservations, manage their bookings,
and leave guest reviews!

This app uses Javascript, Express, PostgreSQL, and SASS

This project is part of my learnings within the Web Development Program at Lighthouse Labs.

## Features

- View Listings
- Filter Listings using city, price, and average rating

**--- If you're a _Registered User_ you can: ---**

- Create Listing, store and view said Listing
- View all previous Reservation history
- Leave reviews on those experiences

## Getting Started 

1. Clone Repository to your local device
2. From the LightBnB directory on the terminal command line run ```psql``` 
3. In the psql command line type ```CREATE DATABASE lightbnb;```
5. Enter ```\c lightbnb;``` and use the command ```\i migrations/01_schema.sql``` to create the tables 
7. Run ```\i seeds/02_seeds.sql``` in the psql command line to add data to tables
6. Exit psql (```\q;```)
2. Change into the <ins>LightBnB-WebApp</ins> folder to install Dependencies using the command **npm install** 
8. Start the web server using the command ```npm run local```
9. Go to http://localhost:3000/ in your browser

## Dependencies

bycrypt
cookie-session
express
nodemon
pg








