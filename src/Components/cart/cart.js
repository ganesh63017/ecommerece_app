import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cards, setCards] = useState([]);
  const [totalPrice, setTotal] = useState([]);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("obj"));
    console.log(details);
    setCards(details);
  }, []);

  //   console.log(totalPrice);
  //   console.log(finalPrice);
  const setQuantityIncrease = (id) => {
    const Quantity = cards.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          quantity: each.quantity + 1,
          total: each.quantity * each.price,
        };
      } else {
        return each;
      }
    });
    var totalPrice = Quantity.map((each) => {
      return each.quantity * each.price;
    });

    setCards(Quantity);
    setTotal(totalPrice);
  };

  const setQuantityDecrease = (id) => {
    const Quantity = cards.map((each) => {
      if (each.id === id) {
        return {
          ...each,
          quantity: each.quantity - 1,
          total: each.quantity * each.price,
        };
      } else {
        return each;
      }
    });
    var totalPrice = Quantity.map((each) => {
      return each.quantity * each.price;
    });

    setCards(Quantity);
    setTotal(totalPrice);
  };

  const DeleteItem = (id) => {
    const deleteCards = cards.filter((each) => each.id !== id);
    setCards(deleteCards);

    localStorage.setItem("obj", JSON.stringify(deleteCards));
    localStorage.setItem("cart", JSON.stringify(deleteCards.length));
  };

  cards.length > 0 && localStorage.setItem("obj", JSON.stringify(cards));

  const sum =
    cards.length === 0
      ? 0
      : totalPrice.reduce((partialSum, a) => partialSum + a, 0);
  localStorage.setItem("total", JSON.stringify(sum));
  return (
    <div class="container w-100">
      <div class="row w-100">
        <h1>
          <a href="/">My Ecommerce Site</a>

          <span class="pull-right">
            <a href="cart.html">Cart ({cards.length})</a>
          </span>
        </h1>
        <hr />
        <div class="col-md-12">
          <div class="panel">
            <div class="panel-heading">MY CART ({cards.length})</div>
            {cards?.map((each) => {
              return (
                <div class="panel-body" key={each.id}>
                  <div>
                    <div class="row">
                      <div class="col-md-3">
                        {" "}
                        <img
                          src={`http://interviewapi.ngminds.com/${each.image}`}
                          width="100px"
                          height="200px"
                          alt="logo"
                        />
                      </div>
                      <div class="col-md-3">
                        {" "}
                        {cards && each.name}
                        <br />
                        <i class="fa fa-inr"></i>
                        {cards && each.price}
                      </div>
                      <div class="col-md-3">
                        {" "}
                        quantity
                        <br />
                        <div class="d-flex">
                          <button
                            class="qtyminus"
                            onClick={() => setQuantityIncrease(each.id)}
                          >
                            +
                          </button>
                          <input
                            type="text"
                            name="quantity"
                            size="5px"
                            value={each.quantity}
                          />
                          <button onClick={() => setQuantityDecrease(each.id)}>
                            -
                          </button>
                        </div>
                      </div>
                      <div class="col-md-3">
                        {" "}
                        <button
                          class="btn btn-warning"
                          onClick={() => DeleteItem(each.id)}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="col-md-9">
                    <label class="pull-right">
                      Amount {each.quantity * each.price}
                    </label>
                  </div>
                </div>
              );
            })}

            <div class="panel-footer">
              <div class="row">
                <div class="col-md-9">
                  <label class="pull-right">Amount Payable {sum}</label>
                </div>
              </div>
              <Link to="/home">
                <button class="btn btn-success">Continue Shopping</button>
              </Link>
              <Link to="/PlaceOrder">
                <button class="pull-right btn btn-danger">Place Order</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
