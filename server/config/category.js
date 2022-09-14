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

const addCategory = async (data) => {
  //   const result = await getPostBySlug(data.slug);
  // console.log(l);
  data.name =
    data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase();
  const isExist = await isExistCategory(data.name);
  if (isExist) {
    return false;
  }
  const category_id = (await getIdCategory()) + 1;
  console.log(category_id);
  const newData = { ...data, category_id };
  console.log(newData);
  //   if (!result == "") {
  //     console.log("kadafa");
  //     // const id = await countGetPostBySlug(data.slug);
  //     // console.log("anjing", id);
  //     // data.slug = data.slug += "-" + id;
  //     return false;
  //   }

  const reference = push(ref(database, "categories"));
  await set(reference, newData);
  return true;
};

const isExistCategory = async (name) => {
  const reference = ref(database, "categories");
  let key = 0;
  try {
    const snapshot = await get(
      query(reference, orderByChild("name"), equalTo(name))
    );
    if (snapshot.exists()) {
      snapshot.forEach((s) => {
        key = s.key;
      });
    }
  } catch (e) {}
  return key;
};

const getIdCategory = async (name) => {
  const reference = ref(database, "categories");
  const snapshot = await get(
    query(reference, orderByChild("category_id"), limitToLast(1))
  );
  //   const snapshot = await get(query(reference, limitToLast(1)));
  let currId = 0;

  if (snapshot.exists()) {
    // return snapshot.val();
    snapshot.forEach((s) => {
      //   console.log(s.val());
      currId = s.val().category_id;
    });
  }
  return currId;
};

module.exports = { addCategory };
