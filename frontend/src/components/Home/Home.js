import React from "react";
import "./Home.css";

const Home = (props) => {
    console.log("Home component", props);
  return (
    <>
      <div className="home-style">
        <h1 className="heading">
          Welcome to S-Mart shopping center {props.userName}
        </h1>
        <center>
          <img src="/smart.jpg" alt="S-Mart logo" />
        </center>
      </div>
    </>
  );
};

export default Home;
