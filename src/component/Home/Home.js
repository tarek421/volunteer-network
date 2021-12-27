import React from "react";
import Volunters from "../Volunters/Volunters";
import Header from "../Header/Header"
import "./Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="top App">
          <h2>I GROW BY HELPINY PEOPLE IN NEED</h2>
          <div className="input-group mt-3 center">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="search-addon"
            />
            <button type="button" className="btn btn-primary">
              search
            </button>
          </div>
          <Volunters />
        </div>
      </div>
    </>
  );
};

export default Home;
