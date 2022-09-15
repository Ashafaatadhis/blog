import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import "./category.css";

const Category = () => {
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //fetch to get category
    const fetch = async () => {
      try {
        const result = await axios.get("category");
        setCategory(result?.data?.result);
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);
  return (
    <div className="category">
      <div className="bungkus">
        <Link to="/">All</Link>
        {!isLoading &&
          Object.keys(category).map((key) => (
            <Link to={`?c=${category[key].category_id}`} key={key}>
              {category[key].name}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Category;
