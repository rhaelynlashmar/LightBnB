# LightBnB Summary

LightBnB is a MOCK web application for booking and managing short-term rentals. 
It allows users to browse available properties, make reservations, manage their bookings,
and leave guest reviews!

This app uses Javascript, Express, PostgreSQL, and SASS

This project is part of my learnings within the Web Development Program at Lighthouse Labs.

## Features

- View Listings
- Filter Listings using city, price, and average rating

--- If you're a "Registered User" you can: ---

- Create Listing, store and view said Listing
- View all previous Reservation history
- Leave reviews on those experiences

## Getting Started 

1. Clone Repository to your local device
2. Install Dependencies using npm install command in your terminal
3. Now use the psql command in the terminal
4. Type CREATE DATABASE lightbnb;
5. Once working in lightbnb database run \i migrations/01_schema.sql to create tables for data
6. Run \i seeds/01_seeds.sql and \i seeds/02_seeds.sql in the psql command line to add data to tables
7. Start the web server using the npm run local command
8. Go to http://localhost:3000/ in your browser

## Dependencies

bycrypt
cookie-session
express
nodemon
pg








