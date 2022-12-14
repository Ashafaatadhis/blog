const {
  ref,
  set,
  get,
  update,
  child,
  query,
  push,
  limitToLast,
  equalTo,
  orderByChild,
  remove,
  startAfter,
} = require("firebase/database");
const database = require("./firebase");

const getAllPosts = async () => {
  const reference = ref(database, "posts");
  const snapshot = await get(reference);
  if (snapshot.exists()) {
    return snapshot.val();
    // console.log(snapshot.val());
  }
};

const addPost = async (data) => {
  const result = await getPostBySlug(data.slug);
  // console.log(l);

  if (!result == "") {
    console.log("kadafa");
    // const id = await countGetPostBySlug(data.slug);
    // console.log("anjing", id);
    // data.slug = data.slug += "-" + id;
    return false;
  }

  const reference = push(ref(database, "posts"));
  await set(reference, data);
  return true;
};

const countGetPostBySlug = async (slug) => {
  const reference = ref(database, "posts");
  const snapshot = await get(
    query(reference, orderByChild("slug"), equalTo(slug))
  );
  let count = 0;
  console.log(snapshot.val());
  if (snapshot.exists()) {
    snapshot.forEach((s) => {
      console.log("woiiisdfs", s.val());
      count += 1;
    });
  }
  return count;
};

const getPostBySlug = async (slug) => {
  const reference = ref(database, "posts");
  const snapshot = await get(
    query(reference, orderByChild("slug"), equalTo(slug))
  );
  let key = "";
  // console.log(snapshot.val());
  // return;
  if (snapshot.exists()) {
    snapshot.forEach((s) => {
      key = s.val();
    });
  }

  return key;
};
const updatePost = async (postData) => {
  const data = await getPost(postData.post_id);
  console.log(postData);
  if (!data) {
    return false;
  }
  try {
    return update(child(ref(database, "posts"), data), postData);
  } catch (e) {
    console.log(e);
  }
};

const deletePost = async (postData) => {
  const data = await getPost(postData.post_id);
  console.log("ini", data);
  if (!data) {
    return false;
  }
  try {
    return remove(child(ref(database, "posts"), data));
    // return update(child(ref(database, "posts"), data));
  } catch (e) {
    console.log(e);
  }
};

const postByCategory = async (category) => {
  const reference = ref(database, "posts");

  const snapshot = await get(
    query(reference, orderByChild("category"), equalTo(parseInt(category)))
  );

  if (snapshot.exists()) {
    return snapshot.val();
  }
};

const getPost = async (post_id) => {
  //   const dbRef = ref(database);
  post_id = parseInt(post_id);
  const reference = ref(database, "posts");
  const snapshot = await get(
    query(reference, orderByChild("post_id"), equalTo(post_id))
  );
  //   const snapshot = await get(query(reference, limitToLast(1)));
  let key = "";
  //   aih = "asdfsd";
  if (snapshot.exists()) {
    snapshot.forEach((s) => {
      //   return s.val().post_id;
      //   ah.push(s.val().post_id);

      key = s.key;
      //   totalData = s.val().post_id;
    });
  }
  return key;

  /////////////////////////////////////
  //   const reference = ref(database, "posts/" + post_id);
  //   const snapshot = await get(reference);
  //   if (snapshot.exists()) {
  //     return snapshot.val();
  //   } else {
  //     return false;
  //   }
  //////////////////////////////////////
  // .then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //     return snapshot.val();
  //   } else {
  //     console.log("No data available");
  //     return false;
  //   }
  // })
  // .catch((error) => {
  //   console.error(error);
  //   return false;
  // });
};

const getId = async () => {
  //   const reference = ref(database, "posts/post_id");
  //   //   console.log(reference.);
  //   const recentId = query(reference);
  //   console.log(recentId.toString());

  const reference = ref(database, "posts");
  const snapshot = await get(
    query(reference, orderByChild("post_id"), limitToLast(1))
  );
  //   const snapshot = await get(query(reference, limitToLast(1)));
  let currId = 0;

  if (snapshot.exists()) {
    // return snapshot.val();
    snapshot.forEach((s) => {
      //   console.log(s.val());
      currId = s.val().post_id;
    });
  }
  return currId;
};

module.exports = {
  addPost,
  updatePost,
  getPost,
  getId,
  getAllPosts,
  deletePost,
  getPostBySlug,
  postByCategory,
};
