import React from "react";
import "./Volunter.css";

const Volunter = ({ data }) => {
  return (
    <div className="col-md-3 col sm 12 mt-3">
      <div className="card">
        <div className="view overlay">
          <img
            className="card-img-top"
            src={data.image}
            alt="Card_Image"
          />
          <a href="#!">
            <div className="mask rgba-white-slight"></div>
          </a>
        </div>
        <div className="card-body bg-primary">
          <h5 className="card-title">{data.name}</h5>
        </div>
      </div>
    </div>
  );
};

export default Volunter;
