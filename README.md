# WTWR (What to Wear?) — Back End

Node.js/Express server with MongoDB for users and clothing items: create, read, delete, and like/unlike items. JWT auth protects most routes.

---

## API

### Users

- `POST /signup` — register a new user
- `POST /signin` — sign in (returns JWT)
- `GET /users/me` — get current user
- `PATCH /users/me` — update current user (name, avatar)

### Clothing Items

- `POST /items` — add an item
- `GET /items` — list all items
- `DELETE /items/:itemId` — remove an item (owner only)
- `PUT /items/:itemId/likes` — like
- `DELETE /items/:itemId/likes` — unlike

> Auth: except for `/signup` and `/signin`, send `Authorization: Bearer <token>`.

---

## Tech stack

- Node.js + Express
- MongoDB + Mongoose
- validator for URL checks
- ESLint (Airbnb + Prettier)
- Nodemon + Postman for dev/testing

## Server config

By default the server runs on **PORT 3001** and connects to:
`mongodb://127.0.0.1:27017/wtwr_db`

## Error codes

Centralized in `utils/errors.js`: `400 BAD_REQUEST`, `401 UNAUTHORIZED`, `403 FORBIDDEN`, `404 NOT_FOUND`, `409 CONFLICT`, `500 INTERNAL_SERVER_ERROR`.
