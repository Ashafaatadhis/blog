const router = require("express").Router();
const {
  index,
  login,
  logout,
  refreshToken,
  postUpdate,
  postAdd,
  postDel,
  postSlug,
  createCategory,
  getCategory,
  getPostByCategory,
} = require("../controller/controller");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/uploadFile");

router.get("/post", index);
router.get("/post/:slug", postSlug);

router.post("/post", upload, verifyToken, postAdd);
router.post("/category", createCategory);
router.get("/category/:post", getPostByCategory);
router.get("/category", getCategory);
router.delete("/post", verifyToken, postDel);
router.patch("/post", postUpdate);
router.post("/login", login);
router.delete("/logout", logout);
router.get("/refreshToken", refreshToken);
// router.post('/addUser', (req, res) => {
// addUser(req.body.username, req.body.password);
// })
module.exports = router;
