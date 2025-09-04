# WTWR (What to Wear?) — Back End

This is the back-end for the WTWR app. It’s a Node.js/Express server with MongoDB that handles users and clothing items. You can create, read, update, delete, and like/unlike items.

---

## What it does

- **Users**
  - `POST /users` → add a user
  - `GET /users` → get all users
  - `GET /users/:userId` → get a single user

- **Clothing Items**
  - `POST /items` → add an item
  - `GET /items` → list all items
  - `PUT /items/:itemId` → update an item’s image
  - `DELETE /items/:itemId` → remove an item
  - `PUT /items/:itemId/likes` → like
  - `DELETE /items/:itemId/likes` → unlike

---

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- Validator for URL checks
- ESLint (Airbnb + Prettier) for clean code
- Nodemon + Postman for dev and testing

## Server Config

By default the server runs on **PORT 3001** and connects to: mongodb://127.0.0.1:27017/wtwr_db
