const router = require("express").Router();
const usersRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const auth = require("../middlewares/auth");
const { login, createUser } = require("../controllers/users");
const { getItems } = require("../controllers/clothingItems");
const { NOT_FOUND } = require("../utils/errors");
const {
  validateUserSignup,
  validateUserLogin,
} = require("../middlewares/validation");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserSignup, createUser);
router.get("/items", getItems);

router.use(auth);

router.use("/users", usersRouter);
router.use("/items", clothingItemsRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Router not found" });
});

module.exports = router;
