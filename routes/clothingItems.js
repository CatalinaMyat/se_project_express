// routes/clothingItems.js
const router = require("express").Router();
// NOTE: no local `auth` import here — parent router already applies it

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// Public (you already expose GET /items in the parent router, but keeping
// this here is fine if you ever mount at "/")
router.get("/", getItems);

// Protected routes (auth is applied by the parent router)
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

// Likes
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", unlikeItem);

module.exports = router;
