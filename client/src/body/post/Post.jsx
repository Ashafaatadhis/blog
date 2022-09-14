import axios from "../../api/axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./post.css";

const Post = () => {
  const backendURL = "http://localhost:3001";
  const { slug } = useParams();
  const [dataPost, setDataPost] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const post = await axios.get(`post/${slug}`);
      setDataPost(post.data.data);
      contentWrapper(post.data.data.content);
    };
    fetchPost();
  }, []);
  // console.lof(dataPost);
  const contentWrapper = (content) => {
    console.log("inii", dataPost);
    console.log(content);
    content = content.split("\n");
    const uwaa = content.map((c, index) => {
      const heading = c.match(/#+/g);
      const imgHtml = /!\[(.+)\]{(.+)}/g.exec(c);

      if (heading) {
        return React.createElement(
          `h${heading.join("").length}`,
          { key: index },
          `${c.replace(/#+/g, "").replace("\r", "")}`
        );
      }
      if (imgHtml) {
        return React.createElement(
          "div",
          { className: "article-img" },
          React.createElement(
            "img",
            { src: `${backendURL}/${imgHtml[2]}`, key: index },
            null
          )
        );
      }

      return React.createElement("p", { key: index }, c);
    });
    console.log(uwaa);
    setDataPost((prev) => {
      return {
        ...prev,
        content: uwaa,
      };
    });
  };

  console.log(dataPost);
  return (
    <section className="post">
      <div className="post-jumbotron">
        <div className="bungkus">
          <div className="post-back">
            <Link to="/">Back To Home</Link>
          </div>
          <h1 className="post-title">{dataPost.title}</h1>
          <div className="post-img">
            {dataPost.banner && (
              <img src={`http://localhost:3001/${dataPost.banner}`} alt="" />
            )}
          </div>
        </div>
      </div>
      <div className="post-ini-article">
        <div className="bungkus">
          <div className="post-article">
            {dataPost.content}
            {/* <h1>Halo apa kabar</h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              quasi debitis, vel quaerat tempore distinctio omnis, quia facilis
              voluptate, quo necessitatibus corporis similique consectetur
              voluptatibus. Mollitia fuga dolorum at ab ex rerum voluptates est
              dolorem fugit blanditiis, quos maiores ipsam ducimus veniam in
              odit! Esse dolorem aliquid, laborum accusamus neque commodi
              officia at reprehenderit, excepturi in molestias repellat, nulla
              quisquam sunt qui? Culpa laudantium architecto eaque quo, ad,
              officiis a repellendus, quas provident quod nulla animi alias
              aliquam nobis soluta eos inventore et sit corrupti veniam
              distinctio iste cumque sint consequuntur. Laboriosam iure quo
              voluptatem cumque impedit suscipit facilis doloribus.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              quasi debitis, vel quaerat tempore distinctio omnis, quia facilis
              voluptate, quo necessitatibus corporis similique consectetur
              voluptatibus. Mollitia fuga dolorum at ab ex rerum voluptates est
              dolorem fugit blanditiis, quos maiores ipsam ducimus veniam in
              odit! Esse dolorem aliquid, laborum accusamus neque commodi
              officia at reprehenderit, excepturi in molestias repellat, nulla
              quisquam sunt qui? Culpa laudantium architecto eaque quo, ad,
              officiis a repellendus, quas provident quod nulla animi alias
              aliquam nobis soluta eos inventore et sit corrupti veniam
              distinctio iste cumque sint consequuntur. Laboriosam iure quo
              voluptatem cumque impedit suscipit facilis doloribus.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              quasi debitis, vel quaerat tempore distinctio omnis, quia facilis
              voluptate, quo necessitatibus corporis similique consectetur
              voluptatibus. Mollitia fuga dolorum at ab ex rerum voluptates est
              dolorem fugit blanditiis, quos maiores ipsam ducimus veniam in
              odit! Esse dolorem aliquid, laborum accusamus neque commodi
              officia at reprehenderit, excepturi in molestias repellat, nulla
              quisquam sunt qui? Culpa laudantium architecto eaque quo, ad,
              officiis a repellendus, quas provident quod nulla animi alias
              aliquam nobis soluta eos inventore et sit corrupti veniam
              distinctio iste cumque sint consequuntur. Laboriosam iure quo
              voluptatem cumque impedit suscipit facilis doloribus.
            </p>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi
              quasi debitis, vel quaerat tempore distinctio omnis, quia facilis
              voluptate, quo necessitatibus corporis similique consectetur
              voluptatibus. Mollitia fuga dolorum at ab ex rerum voluptates est
              dolorem fugit blanditiis, quos maiores ipsam ducimus veniam in
              odit! Esse dolorem aliquid, laborum accusamus neque commodi
              officia at reprehenderit, excepturi in molestias repellat, nulla
              quisquam sunt qui? Culpa laudantium architecto eaque quo, ad,
              officiis a repellendus, quas provident quod nulla animi alias
              aliquam nobis soluta eos inventore et sit corrupti veniam
              distinctio iste cumque sint consequuntur. Laboriosam iure quo
              voluptatem cumque impedit suscipit facilis doloribus.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Post;
