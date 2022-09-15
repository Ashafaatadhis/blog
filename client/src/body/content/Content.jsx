import React, { useState } from "react";
import Card from "./card/Card";
import { useEffect } from "react";
import "./content.css";
import jwt_decode from "jwt-decode";
import { useSearchParams } from "react-router-dom";
import axios from "../../api/axios";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const Content = () => {
  const [post, setPost] = useState({});
  const [category, setCategory] = useState([]);
  const [searchParams] = useSearchParams();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();

  useEffect(() => {
    (async () => {
      console.log(searchParams.get("c"));
      try {
        let data;
        const listCategory = await axios.get("category");
        if (!searchParams.get("c")) {
          data = await axios.get("post");
        } else {
          data = await axios.get(`category/${searchParams.get("c")}`);
          console.log(data);
        }
        let cat = {};
        Object.keys(listCategory.data.result).map((key) => {
          // console.log(data.data.data);
          // console.log(listCategory.data.result[key]);
          cat[listCategory.data.result[key].category_id] =
            listCategory.data.result[key].name;
        });
        setPost({
          post: data.data.data,
          msg: data.data.msg,
          serverUrl: data.data.serverUrl,
          category: cat,
        });
        // console.log(Object.keys(undefined));
        // setCategory
        setIsLoading(false);
      } catch (e) {}
    })();
  }, [searchParams.get("c")]);

  return (
    !isLoading && (
      <section className="content">
        <div className="bungkus">
          {post?.post &&
            Object.keys(post.post).map((key) => (
              <Card
                key={key}
                data={post.post[key]}
                category={post.category}
                serverUrl={post.serverUrl}
              />
            ))}
        </div>
      </section>
    )
  );
  // return (
  //   false && (
  //     <section className="content">
  //       <div className="bungkus">
  //         {post?.post &&
  //           Object.keys(post).map((key, index) => (
  //             <Card key={key} data={post[key]} serverUrl={post.serverUrl} />
  //           ))}
  //       </div>
  //     </section>
  //   )
  // );
};

export default Content;
