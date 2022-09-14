import React, { useState } from "react";
import Card from "./card/Card";
import { useEffect } from "react";
import "./content.css";
import jwt_decode from "jwt-decode";
import axios from "../../api/axios";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";

const Content = () => {
  const [post, setPost] = useState({});
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
    (async () => {
      try {
        const data = await axios.get("post");
        setPost({
          post: data.data.data,
          msg: data.data.msg,
          serverUrl: data.data.serverUrl,
        });
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  return (
    !isLoading && (
      <section className="content">
        <div className="bungkus">
          {post?.post &&
            Object.keys(post.post).map((key) => (
              <Card
                key={key}
                data={post.post[key]}
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
