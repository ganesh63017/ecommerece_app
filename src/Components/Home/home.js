import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [Range, setRange] = useState(5);
  const [carts, setCarts] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    getData();
    const local = localStorage.getItem("obj", JSON.stringify([]));
    if (local === null || local === undefined) {
      localStorage.setItem("obj", JSON.stringify([]));
    }
  }, []);

  const getData = (range) => {
    console.log(range);
    const Range = range === undefined ? 5 : range;

    axios
      .get("http://interviewapi.ngminds.com/api/getAllProducts")
      .then((res) => {
        const filteredData = res.data.products.splice(0, Range);
        setData(filteredData);
        dispatch({ type: "setData", value: filteredData });
      })
      .catch((res) => {
        console.log(res);
      });
  };

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

  const sortCards = (e) => {
    if (e.target.value === "high") {
      const high = data.sort((a, b) => b.price - a.price);
      const strHigh = JSON.stringify(high);
      const parseHigh = JSON.parse(strHigh);
      setData(parseHigh);
      // console.log(high, "high");
    } else if (e.target.value === "low") {
      const low = data.sort((a, b) => a.price - b.price);
      const strLow = JSON.stringify(low);
      const parseLow = JSON.parse(strLow);
      setData(parseLow);
      // console.log(low, "low");
    } else {
      getData();
    }
  };

  const sortCardsRange = (e) => {
    setRange(Number(e.target.value));
    getData(e.target.value);
    // dispatch({ type: "value", value: state.number + Number(e.target.value) });
    // const a = data.length / Range;
    // console.log(a);
    // console.log(Range);
  };

  // console.log(carts, "data");

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
      <div class="row pull-center">
        <div class="col-sm-8">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link">Previous</a>
            </li>
            {data.map((each, index) => (
              <li class="page-item active">
                <a class="page-link">{index}</a>
              </li>
            ))}
            <li class="page-item">
              <a class="page-link">Next</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="">
        <select name="select" onChange={sortCards}>
          <option value="default">Default</option>
          <option value="high">High To Low</option>
          <option value="low">Low To High</option>
        </select>
        <select name="s" onChange={sortCardsRange}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
        </select>
      </div>
      <hr />
      <div class="row">
        {data?.map((each, index) => {
          let color;
          if (index % 4 === 0) {
            color = "bg-info";
          } else if (index % 4 === 1) {
            color = "bg-success";
          } else if (index % 4 === 2) {
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
    </div>
  );
};

export default Home;
