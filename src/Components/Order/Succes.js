import React from "react";
import { Link } from "react-router-dom";

const Succes = () => {
  return (
    <div className="d-flex justify-content-center text-center">
      <div>
        <img
          src="https://www.incimages.com/uploaded_files/image/1024x576/getty_495142964_198701.jpg"
          className="w-100"
          alt="logo"
        />
        <h1 className="text-success">YOUR ORDER IS SUCCESSFULLY COMPLETED</h1>
        <Link to="/home">
          <button className="btn btn-primary">HOME</button>
        </Link>
      </div>
    </div>
  );
};

export default Succes;
