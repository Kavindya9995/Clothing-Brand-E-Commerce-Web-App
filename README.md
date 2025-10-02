# Clothing-Brand-E-Commerce-Web-App
Develop a fully functional e-commerce web application for a fictional clothing brand using the MERN stack (MongoDB, Express.js,React, Node.js). The app should allow users to browse clothing items, register &amp; log in, manage a shopping cart, and complete a checkout process.
<!-- For Client -->
1.cd client
 2. `npm install`
 3. `npm start` to start server
 4. start backend and change if backend port is not 4000



<!-- For server -->

1.cd server and  Copy `.env.example` to `.env` and set values.
 2. `npm install`
 3. `npm run seed` to create sample products and an admin user 
(admin@brand.test / password)
4. create database name sample_order_app using MongoDBCompass 
 4. `npm run dev` to start server
 ## Endpoints- `POST /api/auth/register` — register- `POST /api/auth/login` — login- `GET /api/products` — list products (q, category, brand, minPrice, maxPrice, 
size, color, page, limit, sort)- `POST /api/checkout` — create order (protected)- `GET /api/orders` — list user orders (protected)
 ...and more (see routes folder)
 ## Notes- Emails use Ethereal by default for development — the console logs a preview 

URL.- Totals are calculated server-side. Prices are stored as integer cents.