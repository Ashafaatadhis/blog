const {
  updatePost,
  getAllPosts,
  addPost,
  getId,
  deletePost,
  getPostBySlug,
  getPost,
} = require("../config/posts");
const jwt = require("jsonwebtoken");
const {
  getUser,
  isUserExist,
  getUserByRefreshToken,
  updateUser,
} = require("../config/users");
const moment = require("moment");

// const storage = multer.diskStorage({
//   destination: "./public/images",
//   filename: function (req, file, cb) {
//     console.log(file.originalname);
//     cb(null, file.originalname);
//   },

// });
// const uploadMulter = multer({ storage: storage }).array("file");
const postUpdate = async (req, res) => {
  const isUser = await isUserExist(req.body.username);
  if (!isUser) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  req.body.updated_at = date;
  const data = await updatePost({
    post_id: req.body.post_id,
    title: req.body.title,
    content: req.body.content,
    banner: req.body.banner,
    slug: req.body.slug,
    updated_at: date,
  });
  //   const data = await updatePost(req.body);
  if (data === false) {
    res.status(400).json({ msg: "Failed to update data" });
  } else {
    res.status(200).json({ msg: "success updated data" });
  }
};

const postAdd = async (req, res) => {
  // const isExist = await isUserExist(req.body.username);
  // if (!isExist) {
  //   res.status(401).json({ msg: "Unauthorized" });
  //   return;
  // }
  // uploadMulter(req, res, function (err) {
  //   if (err instanceof multer.MulterError) {
  //     return res.status(500).json(err);
  //   } else if (err) {
  //     return res.status(500).json(err);
  //   }
  //   console.log(req);
  //   return res.status(200).json({
  //     msg: "upload success",
  //     data: `${req.protocol}://${req.hostname}:${process.env.PORT}${req.originalUrl}`,
  //   });
  // });

  // return;
  // console.log("gfsdfgd", req.body);
  // return;
  // console.log("dsfafds", req.files.length);
  if (!req.files.length) {
    res.status(200).json({
      msg: "Only .png, .jpg and .jpeg format allowed!",
      color: "danger",
    });
    return;
  }
  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const post_id = (await getId()) + 1;
  const dataPost = {
    post_id,
    title: req.body.title,
    slug: req.body.slug,
    banner: req.body.banner,
    content: req.body.content,
    created_at: date,
    updated_at: date,
  };

  let whoNull = [];
  for (let key in dataPost) {
    if (dataPost[key] == null || dataPost[key] == "") {
      whoNull.push(key);
    }
  }

  // console.log(whoNull);
  if (whoNull.length !== 0) {
    // console.log("ppepepek");
    let awal = whoNull.slice(0, -2).join(", ");
    if (awal !== "") {
      let msg = awal + ", " + whoNull.slice(-2).join(" and ");
      res.status(200).json({ msg: msg + " cant be empty", color: "danger" });
      return;
    }
    let msg = awal + whoNull.slice(-2).join(" and ");
    res.status(200).json({ msg: msg + " cant be empty", color: "danger" });
    return;
  }

  const added = await addPost(dataPost);
  if (!added) {
    res.status(200).json({ msg: "slug is exist", color: "danger" });
    return;
  }
  // console.log(dataPost);

  res.status(200).json({ msg: "Post has been added", color: "success" });
};

const postSlug = async (req, res) => {
  // console.log(req.params);
  // return;
  const result = await getPostBySlug(req.params.slug);
  if (result == "") {
    res.status(200).json({ msg: "post doesn't exist", color: "danger" });
    return;
  }

  res.status(200).json({ msg: "post founded", color: "success", data: result });
};

const index = async (req, res) => {
  // const isExist = await isUserExist(req.body.username);
  // if (!isExist) {
  //   res.status(400).json({ msg: "User not found" });
  // }

  const posts = await getAllPosts();
  res.status(200).json({
    msg: "User founded",
    data: posts,
    serverUrl: `${req.protocol}://${req.hostname}:${process.env.PORT}/`,
  });
};

const login = async (req, res, next) => {
  console.log(req.cookies);
  if (req.cookies.refreshToken) {
    res.status(400).json({ msg: "You've logged in", color: "danger" });
    return;
  }
  const result = await getUser(req.body.username, req.body.password);

  if (!result) {
    res
      .status(400)
      .json({ msg: "username or password wrong!", color: "danger" });
    return;
  }
  const accessToken = jwt.sign(
    { username: result.username, password: result.password },
    process.env.PRIVATE_KEY,
    { expiresIn: "15s" }
  );
  const refreshToken = jwt.sign(
    { username: result.username, password: result.password },
    process.env.REFRESH_KEY,
    { expiresIn: "15s" }
  );
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
    // console.log(req.cookies.refreshToken);
    res.status(401).json({ msg: "Logout Failed" });
    return;
  }
  res.clearCookie("refreshToken", { httpOnly: true, secure: true });
  updateUser("admin", { refreshToken: null });
  res.status(200).json({ msg: "Logout Success" });
};

const postDel = async (req, res) => {
  const isUser = await isUserExist(req.body.username);
  if (!isUser) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  const data = await deletePost({ post_id: req.body.post_id });
  //   const data = await updatePost(req.body);
  if (data === false) {
    res.status(400).json({ msg: "Failed to delete data" });
  } else {
    res.status(200).json({ msg: "success delete data" });
  }
};

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  console.log("ini token", token);
  if (!token) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }
  const isExist = await getUserByRefreshToken(token);
  if (!isExist) {
    res.status(401).json({ msg: "Unauthorized" });
    return;
  }

  const accessToken = jwt.sign(
    { username: isExist.username, password: isExist.password },
    process.env.PRIVATE_KEY,
    { expiresIn: "15s" }
  );
  res.status(200).json({ msg: "success refresh token", accessToken });
};

module.exports = {
  postUpdate,
  login,
  logout,
  refreshToken,
  index,
  postAdd,
  postDel,
  postSlug,
};
