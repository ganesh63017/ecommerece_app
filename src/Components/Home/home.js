import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [data3, setData3] = useState([]);
  const [carts, setCarts] = useState(0);

  useEffect(() => {
    axios
      .get("http://interviewapi.ngminds.com/api/getAllProducts")
      .then((res) => {
        console.log(res.data.products);
        setData([
          res.data.products[0],
          res.data.products[1],
          res.data.products[2],
          res.data.products[3],
        ]);
        setData1([
          res.data.products[4],
          res.data.products[5],
          res.data.products[6],
          res.data.products[7],
        ]);
        setData3([res.data.products[8]]);
      })
      .catch((res) => {
        console.log(res);
      });
    localStorage.setItem("obj", JSON.stringify([]));
  }, []);

  const setCardDetails = (name, id, image, price) => {
    const array = JSON.parse(localStorage.getItem("obj"));
    const details = {
      name,
      id,
      image,
      price,
      quantity: 1,
      total: Number(price),
    };
    const first = array.filter((each) => each.id === id);
    const first1 = array.filter((each) => each.id !== id);
    let a;
    if (first.length === 1) {
      a = first.map((each) => {
        return {
          ...each,
          quantity: each.quantity + 1,
          total: each.price * (each.quantity + 1),
        };
      });
      a = [...a, ...first1];
    } else {
      a = [...first1, details];
    }

    console.log(a);
    localStorage.setItem("obj", JSON.stringify(a));
    setCarts(a.length);
    localStorage.setItem("cart", JSON.stringify(a.length));
  };

  return (
    <div class="container">
      <h1>
        <a href="/">My Ecommerce Site</a>
        <span class="pull-right">
          <Link to="/cart">
            <button className="btn">Cart {carts}</button>
          </Link>
        </span>
      </h1>
      <hr />
      <div class="row">
        {data?.map((each, index) => {
          let color;
          if (index === 0) {
            color = "bg-info";
          } else if (index === 1) {
            color = "bg-success";
          } else if (index === 2) {
            color = "bg-primary";
          } else {
            color = "bg-danger";
          }
          return (
            <div
              class="col-md-3"
              key={each._id}
              style={{ height: "60vh", padding: "20px" }}
            >
              <div class={color}>
                <img
                  src={`http://interviewapi.ngminds.com/${each.image}`}
                  width="100"
                  height="200"
                  alt="logo"
                />
                <br></br> <p>{each.name}</p>
                <p>
                  <i class="fa fa-inr"></i>
                  {each.price}
                </p>
                <button
                  class="btn btn-warning"
                  onClick={() =>
                    setCardDetails(each.name, each._id, each.image, each.price)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div class="row">
        {data1?.map((each, index) => {
          let color;
          if (index === 0) {
            color = "bg-info";
          } else if (index === 1) {
            color = "bg-success";
          } else if (index === 2) {
            color = "bg-primary";
          } else {
            color = "bg-danger";
          }
          return (
            <div
              class="col-md-3"
              key={each._id}
              style={{ height: "60vh", padding: "20px" }}
            >
              <div class={color}>
                <img
                  src={`http://interviewapi.ngminds.com/${each.image}`}
                  width="100"
                  height="200"
                  alt="logo"
                />
                <br></br> <p>{each.name}</p>
                <p>
                  <i class="fa fa-inr"></i>
                  {each.price}
                </p>
                <button
                  class="btn btn-warning"
                  onClick={() =>
                    setCardDetails(each.name, each.id, each.image, each.price)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div class="row">
        {data3?.map((each, index) => {
          let color;
          if (index === 0) {
            color = "bg-info";
          } else if (index === 1) {
            color = "bg-success";
          } else if (index === 2) {
            color = "bg-primary";
          } else {
            color = "bg-danger";
          }
          return (
            <div
              class="col-md-3"
              key={each._id}
              style={{ height: "60vh", padding: "20px" }}
            >
              <div class={color}>
                <img
                  src={`http://interviewapi.ngminds.com/${each.image}`}
                  width="100"
                  height="200"
                  alt="logo"
                />
                <br></br> <p>{each.name}</p>
                <p>
                  <i class="fa fa-inr"></i>
                  {each.price}
                </p>
                <button
                  class="btn btn-warning"
                  onClick={() =>
                    setCardDetails(each.name, each.id, each.image, each.price)
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
