import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import "./card.css";

const Card = (props) => {
  Object.keys(props.category).map((key) => {
    if (props.data.category == key) {
      props.data.category = props.category[key];
    }
  });

  const htmlSpecialChars = (text) => {
    // const map = {
    //   "&": "&amp;",
    //   "<": "&lt;",
    //   ">": "&gt;",
    //   '"': "&quot;",
    //   "'": "&#039;",
    // };

    // return text.replace(/[&<>"']/g, function (m) {
    //   return map[m];
    // });
    // const result = text.match(/^\w+/g);
    text = text.split("\n");

    const result = text.map((t) => {
      const result = t.match(/^\w+.+/g);

      return result;
    });

    return result;
  };

  return (
    <div className="card">
      <div className="card-banner">
        <img src={props.serverUrl + props.data.banner} alt="" />
      </div>
      <div className="card-wrapper">
        <div className="upper">
          <p className="card-category">{props.data.category}</p>
          <Link to={`/post/${props.data.slug}`}>
            <h1 className="card-title">{props.data.title}</h1>
          </Link>
          <p className="card-timestamp">
            {moment(props.data.created_at).format("DD MMM YYYY")}
          </p>
          <div className="card-desc">
            <p>{htmlSpecialChars(props.data.content)}</p>
          </div>
        </div>
        <div className="card-profile-wrapper">
          <div className="card-profile">
            <img src="https://placeimg.com/56/56/any" alt="" />
          </div>
          <p className="card-author-name">Adhis Mauliyahsa</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
