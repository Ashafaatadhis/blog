import React from "react";
import Card from "./card/Card";
import { useEffect } from "react";
import axios from "axios";
import "./content.css";

const Content = () => {
  useEffect(() => {
    const getPost = async () => {
      const data = await axios.get("http://localhost:3001/post");
      console.log(data.data);
    };
    getPost();
  });
  return (
    <section className="content">
      <div className="container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </section>
  );
};

export default Content;
