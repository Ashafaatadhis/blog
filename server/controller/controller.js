const { updatePost, getAllPosts, addPost, getId } = require("../config/posts");
const jwt = require("jsonwebtoken");
const { getUser, isUserExist, getUserByRefreshToken, updateUser } = require("../config/users");
const moment = require("moment");

const postUpdate = async (req, res) => {
  const isUser = await isUserExist(req.body.username);
  if (!isUser) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  req.body.updated_at = date;
  const data = await updatePost({ post_id: req.body.post_id, title: req.body.title, content: req.body.content, image: req.body.image, slug: req.body.slug, updated_at: date });
  //   const data = await updatePost(req.body);
  if (data === false) {
    res.status(400).json({ msg: "Failed to update data" });
  } else {
    res.status(200).json({ msg: "success updated data" });
  }
};

const postAdd = async (req, res) => {
  const isExist = await isUserExist(req.body.username);
  if (!isExist) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const post_id = (await getId()) + 1;
  const dataPost = { post_id, title: req.body.title, slug: req.body.slug, image: req.body.image, content: req.body.content, created_at: date, updated_at: date };
  const added = await addPost(dataPost);
  if (!added) {
    res.status(400).json({ msg: "Post is exist" });
    return;
  }

  res.status(200).json({ msg: "Post has been added" });
};

const index = async (req, res) => {
  const isExist = await isUserExist(req.body.username);
  if (!isExist) {
    res.status(400).json({ msg: "User not found" });
  }

  const posts = await getAllPosts();
  res.status(200).json({ msg: "User founded", data: posts });
};

const login = async (req, res, next) => {
  if (req.cookies.refreshToken) {
    res.status(400).json({ msg: "You've logged in" });
    return;
  }
  const result = await getUser(req.body.username, req.body.password);

  if (!result) {
    res.status(400).json({ msg: "Login Failed!" });
    return;
  }
  const accessToken = jwt.sign({ username: result.username, password: result.password }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
  const refreshToken = jwt.sign({ username: result.username, password: result.password }, process.env.REFRESH_KEY, { expiresIn: "1d" });
  res.cookie("refreshToken", refreshToken, {
    maxAge: 86400000,
    httpOnly: true,
    secure: true,
  });
  updateUser(result.username, { refreshToken });
  res.status(200).json({ msg: "Login Success", accessToken });
  // addUser("admin", "ChitogeKirisaki123");
};

const logout = async (req, res) => {
  if (!req.cookies.refreshToken) {
    console.log(req.cookies.refreshToken);
    res.status(401).json({ msg: "Logout Failed" });
    return;
  }
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  updateUser("admin", { refreshToken: null });
  res.status(200).json({ msg: "Logout Success" });
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const isExist = await getUserByRefreshToken(token);
  if (!isExist) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  const accessToken = jwt.sign({ username: isExist.username, password: isExist.password }, process.env.PRIVATE_KEY, { expiresIn: "1d" });
  res.status(200).json({ msg: "success refresh token", accessToken });
};

module.exports = { postUpdate, login, logout, refreshToken, index, postAdd };
