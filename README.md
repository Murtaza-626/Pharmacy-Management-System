# Pharmacy Management System

A full stack web application built with the MERN stack that helps a pharmacy manage its daily work online. It stores medicine records, tracks stock, records sales, and shows everything on a simple dashboard. The goal is to replace manual register keeping with an easy web based system.

---

## Features

- **User Authentication** – Register and login with JWT tokens and hashed passwords
- **Medicine Inventory** – Add, view, update and delete medicines with name, category, manufacturer, price, stock and expiry date
- **Stock Monitoring** – Low stock medicines are shown automatically so stock never runs out
- **Sales Management** – Record a sale, calculate the bill, and reduce the medicine stock automatically
- **Dashboard and Analytics** – Total medicines, available stock, total sales, monthly sales and most sold medicines using MongoDB aggregation
- **Responsive Interface** – Clean Tailwind CSS design that works on all screen sizes

---

## Tech Stack

**Frontend:** React, React Router, Redux Toolkit, Axios, Tailwind CSS  
**Backend:** Node.js, Express  
**Database:** MongoDB with Mongoose  
**Authentication:** JWT and bcryptjs

---

## Project Structure

```
Pharmacy-Management-System/
├── backend/
│   ├── config/         database connection
│   ├── controllers/    logic for users, medicines, sales, dashboard
│   ├── middleware/     token check for protected routes
│   ├── models/         mongoose schemas
│   ├── routes/         api routes
│   └── index.js        server entry file
└── frontend/
    └── src/
        ├── components/ navbar
        ├── pages/      Login, Register, Dashboard, Inventory, Sales
        ├── redux/      store and slices
        └── api.js      axios setup with token
```

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | /api/users/register | Create a new account |
| POST | /api/users/login | Login and get a token |
| GET | /api/medicines | Get all medicines |
| POST | /api/medicines | Add a medicine |
| PUT | /api/medicines/:id | Update a medicine |
| DELETE | /api/medicines/:id | Delete a medicine |
| GET | /api/medicines/lowstock | Get low stock medicines |
| GET | /api/sales | Get all sales |
| POST | /api/sales | Record a sale and update stock |
| GET | /api/dashboard | Get dashboard statistics |

All routes except register and login need a token.

---

## Getting Started

### Requirements

- Node.js and npm installed
- MongoDB installed and running on your machine

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/pharmacy
JWT_SECRET=yoursecretkey
```

Start the server:

```bash
npm run dev
```

The server runs on `http://localhost:5000`.

### Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The app opens on `http://localhost:3000`.

---

## How to Use

1. Make sure MongoDB is running, then start the backend and the frontend.
2. Register a new account and then login. The token is saved in the browser.
3. Go to **Inventory** and add your medicines.
4. Go to **Sales** to make a bill. The stock updates by itself.
5. Open the **Dashboard** to see totals, sales statistics and low stock alerts.

The `pharmacy` database with the `users`, `medicines` and `sales` collections appears in MongoDB Compass once you save your first record.

---

## Author

**Murtaza**  
University web project built with the MERN stack.
