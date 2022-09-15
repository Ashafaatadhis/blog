import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsUpload } from "react-icons/bs";
import AxiosJWT from "../api/axiosJWT";
import axios from "../api/axios";
import slugify from "react-slugify";
import "./admin.css";
import Alert from "react-bootstrap/Alert";

import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import useAuth from "../hooks/useAuth";

const Admin = () => {
  //   const handleArticle = (e) => {
  //     let kata = e.target.value;
  //     let cols = e.target.cols;
  //     let rows = 0;
  //     let result = kata.split("\n");
  //     result.forEach((l) => {
  //       rows += Math.ceil(l.length / cols);
  //     });
  //     e.target.rows = rows;
  //   };
  const [img, setImg] = useState();
  const { auth } = useAuth();
  const axiosJWT = AxiosJWT();
  const [category, setCategory] = useState({});
  const [content, setContent] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const [selectImg, setSelectImg] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [slug, setSlug] = useState("");
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState();

  useEffect(() => {
    console.log(auth);
    setIsLoading(true);
    const fetchCategory = async () => {
      const result = await axios.get("category");
      setCategory(result.data.result);
      setIsLoading(false);
    };
    fetchCategory();
  }, []);

  const formHandler = async (e) => {
    e.preventDefault();
    console.log("idiafjsf", selectCategory);
    // handlerAlert();
    setShow(false);
    let uploadImg = { imgContent: [] };

    // const regex = new RegExp(/!(\[.+\])({.+})/g);
    // console.log(regex.test(content));
    let imgMatch = Array.from(content.matchAll(/!\[.+\]({.+})/g));
    imgMatch = imgMatch.map((s) => {
      return s[1].substring(1, s[1].length - 1);
    });
    let tol = selectImg.filter((img) => {
      if (imgMatch.indexOf(img.nameFile) < 0) {
        return false;
      }
      return true;
    });

    uploadImg = { ...img, imgContent: [...tol] };

    // setImg((prev) => ({ ...prev, imgContent: [...tol] }));
    let data = new FormData();
    // let {imgC}
    // if(img)

    // if(img.banner !)

    if (uploadImg.banner !== undefined) {
      data.append("file", uploadImg.banner, uploadImg.banner.fileName);
      for (var x = 0; x < uploadImg.imgContent.length; x++) {
        // let nameFile = `images/${Date.now()}-${img.imgContent[x].name}`;
        data.append(
          "file",
          uploadImg.imgContent[x],
          uploadImg.imgContent[x].nameFile
        );
      }

      data.append("title", postTitle);
      data.append("content", content);
      data.append("category", selectCategory);
      data.append("slug", slug);
      data.append("banner", "images/" + uploadImg.banner.fileName);
      // data.append({
      //   title: postTitle,
      //   content: content,
      //   slug: slugify(postTitle),
      //   banner: uploadImg.banner.fileName,
      // });

      // document.getElementById("admin-img").style.backgroundColor = 0;
      try {
        setIsLoading((prev) => !prev);
        const result = await axiosJWT.post("post", data, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${auth?.accessToken}`,
          },
        });

        // document.querySelector(".message").innerHTML = "tdfsafds";
        setIsLoading((prev) => !prev);
        setErrMsg(result.data);

        setImg();
        setContent("");
        setSelectImg([]);
        setShow((prev) => !prev);
        setSlug("");
        setPostTitle("");

        document.getElementById("admin-img").style.backgroundImage = `url(0)`;
      } catch (e) {
        // console.log("tolo", e);
      }
    } else {
      // if == undefined
      setShow((prev) => !prev);
      setErrMsg({ msg: "Please upload banner image", color: "danger" });
    }
  };

  const handlerAlert = () => {
    setShow((prev) => !prev);
  };

  const selectHandler = (e) => {
    // console.log(e.target.value);
    setSelectCategory(e.target.value);
  };

  const handlerTitle = (e) => {
    setPostTitle(e.target.value);
    setSlug(slugify(e.target.value));
  };

  const handlerSlug = (e) => {
    setSlug(e.target.value);
  };

  const handleFilePreview = (e) => {
    const [file] = e.target.files;

    if (file) {
      document.getElementById(
        "admin-img"
      ).style.backgroundImage = `url(${URL.createObjectURL(file)})`;

      document.getElementById("admin-img").style.objectFit = "cover";
      // document.getElementById("admin-img").style.backgroundRepeat = "no-repeat";
      document.getElementById("admin-img").style.backgroundPosition = "50% 50%";
    }
    file.fileName = `${Date.now()}-banner-${file.name}`;
    setImg({ ...img, banner: file });
  };

  const handlerContent = (e) => {
    setContent(e.target.value);
  };

  const handlerUploadImage = async (e) => {
    // console.log(document.getElementById("article").value);

    const [file] = e.target.files;
    const tgl = Date.now();
    const nameFile = `![${file.name}]{images/${tgl}-${file.name}}`;
    file.nameFile = `images/${tgl}-${file.name}`;
    // setImg({ ...img, imgContent: [...img.imgContent, file] });
    setSelectImg([...selectImg, file]);
    setContent(content + nameFile);
    document.getElementById("article").value += nameFile;
  };

  return (
    <section className="admin">
      {!isLoading ? (
        <form encType="multipart/form-data" onSubmit={formHandler}>
          {console.log(category)}
          <div className="admin-jumbotron">
            <div className="bungkus">
              <div className="admin-back">
                <Link to="/">Back To Home</Link>
              </div>
              <textarea
                onChange={handlerTitle}
                className="admin-title"
                placeholder="title..."
                value={postTitle}
              />
              <div className="admin-img" id="admin-img">
                {/* <img src="https://placeimg.com/100/500/any" alt="" /> */}
                <div className="img-upload">
                  <input
                    type="file"
                    accept="img/*"
                    onChange={handleFilePreview}
                    hidden
                    id="banner-upload"
                  />
                  <label htmlFor="banner-upload">
                    <BsUpload />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="admin-ini-article">
            <div className="bungkus">
              {show && (
                <Alert
                  variant={errMsg.color}
                  onClose={handlerAlert}
                  dismissible
                >
                  {errMsg.msg}
                </Alert>
              )}
              <div className="admin-article">
                <Form.Select
                  aria-label="Default select example"
                  onChange={selectHandler}
                >
                  <option>Category</option>
                  {Object.keys(category).map((key, index) => (
                    <option key={index} value={category[key].category_id}>
                      {category[key].name}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="admin-article">
                <input
                  type="article"
                  className="article"
                  placeholder="slug..."
                  onChange={handlerSlug}
                  value={slug}
                />
              </div>
              <div className="admin-article">
                <textarea
                  className="article"
                  id="article"
                  placeholder="article..."
                  rows={20}
                  onChange={handlerContent}
                  value={content}
                />
                <input
                  type="file"
                  id="img-article"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handlerUploadImage}
                />
                <div className="img-article">
                  <label htmlFor="img-article">Upload image</label>
                </div>
                <button className="upload-article">Upload article</button>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form encType="multipart/form-data" onSubmit={formHandler}>
          <div className="admin-jumbotron">
            <div className="bungkus">
              <div className="admin-back">
                <h1>Loading</h1>
              </div>
            </div>
          </div>
        </form>
      )}
    </section>
  );
};

export default Admin;
