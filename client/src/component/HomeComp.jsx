import React from "react";
import Header from "../header/Header";
import Body from "../body/Body";
import Footer from "../footer/Footer";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";

const HomeComp = () => {
  const { auth } = useAuth();
  useEffect(() => {
    console.log(auth);
  });
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default HomeComp;
