const {
  ref,
  set,
  get,
  update,
  child,
  query,
  push,
  equalTo,
  orderByChild,
} = require("firebase/database");
const bcrypt = require("bcrypt");
const database = require("./firebase");

const getAllUsers = async () => {
  const reference = ref(database, "users");
  const snapshot = await get(reference);
  if (snapshot.exists()) {
    return snapshot.val();
  }
};

const getUser = async (username, password) => {
  const reference = ref(database, "users");

  const snapshot = await get(
    query(reference, orderByChild("username"), equalTo(username))
  );
  //   console.log(snapshot.child("username").val());
  if (snapshot.exists()) {
    const result = await new Promise((resolve) => {
      snapshot.forEach(async (s) => {
        const hashing = await bcrypt.compare(password, s.val().password);
        if (!hashing) {
          resolve(false);
        }
        resolve({ username: s.val().username, password: s.val().password });
      });
    });
    console.log(result);
    return result;
  }
  return false;
  //   console.log(snapshot.val());
};

const getUserByRefreshToken = async (refreshToken) => {
  const reference = ref(database, "users");
  const snapshot = await get(
    query(reference, orderByChild("refreshToken"), equalTo(refreshToken))
  );
  if (snapshot.exists()) {
    const result = await new Promise((resolve) => {
      snapshot.forEach((s) => {
        resolve({ username: s.val().username, password: s.val().password });
      });
    });
    return result;
  }

  return false;
};

const getUserByUsername = async (username) => {
  const reference = ref(database, "users");
  const snapshot = await get(
    query(reference, orderByChild("username"), equalTo(username))
  );
  if (snapshot.exists()) {
    const result = await new Promise((resolve) => {
      snapshot.forEach((s) => {
        resolve({ username: s.val().username, password: s.val().password });
      });
    });
    return result;
  }
};

const isUserExist = async (username) => {
  const reference = ref(database, "users");
  let key = 0;
  const snapshot = await get(
    query(reference, orderByChild("username"), equalTo(username))
  );
  if (snapshot.exists()) {
    snapshot.forEach((s) => {
      //   return s.val().post_id;
      //   ah.push(s.val().post_id);

      key = s.key;
      //   totalData = s.val().post_id;
    });
  }

  return key;
};

const updateUser = async (id, dataUser) => {
  const data = await isUserExist(id);
  if (!data) {
    return false;
  }
  //   console.log(title);
  return update(child(ref(database, "users"), data), dataUser);
};

const addUser = (username, password) => {
  const reference = push(ref(database, "users"));
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) console.log(err);
    console.log(hash);
    set(reference, {
      username,
      password: hash,
    });
  });
};

module.exports = {
  getUser,
  getUserByRefreshToken,
  addUser,
  updateUser,
  getAllUsers,
  getUserByUsername,
  isUserExist,
};
