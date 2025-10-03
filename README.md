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

5.add 20 products 
db.products.insertMany([
  {
    title: "Classic White T-Shirt",
    description: "100% cotton crew neck white T-shirt.",
    sku: "TSHIRT001",
    price: 15.99,
    brand: "AeonWear",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White"],
    images: ["white-tshirt.jpg"],
    inventory: 50
  },
  {
    title: "Slim Fit Blue Jeans",
    description: "Denim blue slim-fit jeans for everyday wear.",
    sku: "JEANS001",
    price: 45.99,
    brand: "AeonWear",
    category: "Bottoms",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["Blue"],
    images: ["slim-jeans.jpg"],
    inventory: 40
  },
  {
    title: "Black Hoodie",
    description: "Soft fleece hoodie with kangaroo pocket.",
    sku: "HOODIE001",
    price: 39.99,
    brand: "AeonWear",
    category: "Outerwear",
    sizes: ["M", "L", "XL"],
    colors: ["Black"],
    images: ["black-hoodie.jpg"],
    inventory: 25
  },
  {
    title: "Summer Floral Dress",
    description: "Lightweight cotton floral dress perfect for summer.",
    sku: "DRESS001",
    price: 55.0,
    brand: "AeonWear",
    category: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Red", "Yellow"],
    images: ["floral-dress.jpg"],
    inventory: 15
  },
  {
    title: "Leather Jacket",
    description: "Genuine leather biker jacket.",
    sku: "JACKET001",
    price: 120.0,
    brand: "AeonWear",
    category: "Outerwear",
    sizes: ["M", "L"],
    colors: ["Black"],
    images: ["leather-jacket.jpg"],
    inventory: 10
  },
  {
    title: "Running Sneakers",
    description: "Lightweight sneakers designed for running and training.",
    sku: "SHOES001",
    price: 75.99,
    brand: "AeonWear",
    category: "Shoes",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["Gray", "Blue"],
    images: ["running-sneakers.jpg"],
    inventory: 30
  },
  {
    title: "Polo Shirt",
    description: "Classic cotton polo shirt with collar.",
    sku: "POLO001",
    price: 25.99,
    brand: "AeonWear",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Navy", "White"],
    images: ["polo-shirt.jpg"],
    inventory: 20
  },
  {
    title: "Chino Pants",
    description: "Slim-fit chino pants with stretch fabric.",
    sku: "CHINO001",
    price: 49.99,
    brand: "AeonWear",
    category: "Bottoms",
    sizes: ["30", "32", "34", "36"],
    colors: ["Khaki", "Beige"],
    images: ["chino-pants.jpg"],
    inventory: 22
  },
  {
    title: "Wool Sweater",
    description: "Warm wool sweater with crew neck.",
    sku: "SWEATER001",
    price: 65.0,
    brand: "AeonWear",
    category: "Tops",
    sizes: ["M", "L", "XL"],
    colors: ["Gray", "Brown"],
    images: ["wool-sweater.jpg"],
    inventory: 18
  },
  {
    title: "Denim Jacket",
    description: "Classic denim jacket with button closure.",
    sku: "JACKET002",
    price: 85.0,
    brand: "AeonWear",
    category: "Outerwear",
    sizes: ["M", "L", "XL"],
    colors: ["Blue"],
    images: ["denim-jacket.jpg"],
    inventory: 12
  },
  {
    title: "Casual Shorts",
    description: "Lightweight cotton shorts for casual wear.",
    sku: "SHORTS001",
    price: 29.99,
    brand: "AeonWear",
    category: "Bottoms",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Navy"],
    images: ["casual-shorts.jpg"],
    inventory: 35
  },
  {
    title: "Graphic T-Shirt",
    description: "Printed graphic T-shirt with soft cotton.",
    sku: "TSHIRT002",
    price: 19.99,
    brand: "AeonWear",
    category: "Tops",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "White"],
    images: ["graphic-tshirt.jpg"],
    inventory: 45
  },
  {
    title: "Formal Shirt",
    description: "Slim fit formal shirt for office wear.",
    sku: "SHIRT001",
    price: 35.0,
    brand: "AeonWear",
    category: "Tops",
    sizes: ["M", "L", "XL"],
    colors: ["White", "Light Blue"],
    images: ["formal-shirt.jpg"],
    inventory: 28
  },
  {
    title: "Leather Belt",
    description: "Genuine leather belt with metal buckle.",
    sku: "BELT001",
    price: 20.0,
    brand: "AeonWear",
    category: "Accessories",
    sizes: ["M", "L"],
    colors: ["Brown", "Black"],
    images: ["leather-belt.jpg"],
    inventory: 50
  },
  {
    title: "Sports Cap",
    description: "Adjustable sports cap with breathable fabric.",
    sku: "CAP001",
    price: 12.0,
    brand: "AeonWear",
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Black", "Red"],
    images: ["sports-cap.jpg"],
    inventory: 60
  },
  {
    title: "Running Shorts",
    description: "Lightweight and quick-dry running shorts.",
    sku: "SHORTS002",
    price: 25.0,
    brand: "AeonWear",
    category: "Bottoms",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Gray"],
    images: ["running-shorts.jpg"],
    inventory: 30
  },
  {
    title: "Winter Coat",
    description: "Insulated winter coat with hood.",
    sku: "COAT001",
    price: 150.0,
    brand: "AeonWear",
    category: "Outerwear",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Navy"],
    images: ["winter-coat.jpg"],
    inventory: 8
  },
  {
    title: "Casual Sneakers",
    description: "Stylish sneakers for daily wear.",
    sku: "SHOES002",
    price: 60.0,
    brand: "AeonWear",
    category: "Shoes",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black"],
    images: ["casual-sneakers.jpg"],
    inventory: 25
  },
  {
    title: "Track Jacket",
    description: "Polyester track jacket with zipper.",
    sku: "JACKET003",
    price: 55.0,
    brand: "AeonWear",
    category: "Outerwear",
    sizes: ["M", "L", "XL"],
    colors: ["Black", "Red"],
    images: ["track-jacket.jpg"],
    inventory: 14
  },
  {
    title: "Cargo Pants",
    description: "Durable cotton cargo pants with pockets.",
    sku: "CARGO001",
    price: 52.0,
    brand: "AeonWear",
    category: "Bottoms",
    sizes: ["30", "32", "34", "36"],
    colors: ["Green", "Brown"],
    images: ["cargo-pants.jpg"],
    inventory: 18
  }
]);
