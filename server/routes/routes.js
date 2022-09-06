const router = require("express").Router();
const { index, login, logout, refreshToken, postUpdate, postAdd } = require("../controller/controller");
const verifyToken = require("../middleware/verifyToken");

router.get("/post", verifyToken, index);
router.post("/post", verifyToken, postAdd);
// router.delete("/post", delPost);
router.patch("/post", verifyToken, postUpdate);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/refreshToken", refreshToken);
module.exports = router;
