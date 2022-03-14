import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [data, setData] = useState([]);
  const [items, setItems] = useState("");
  const [total, setTotal] = useState(JSON.parse(localStorage.getItem("total")));
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("obj"));
    setData(data);
    const items = data.map((each) => each.quantity);
    const sum = items.reduce((partialSum, a) => partialSum + a, 0);
    setItems(sum);
  }, []);

  const history = useNavigate();
  const dispatch = useDispatch();

  const ConfirmOrder = async () => {
    dispatch({ type: "clearData" });
    const url = "http://interviewapi.ngminds.com/api/placeOrder";
    const objects = data.map((each) => ({
      productID: each.id,
      qty: each.quantity,
      price: each.price,
      total: each.total,
    }));
    const details = {
      personName: name,
      deliveryAddress: address,
      productsOrdered: objects,
      orderTotal: total,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(details),
    };
    const res = await fetch(url, options);
    const data1 = await res.json();
    if (data1.status === "success") {
      history("/Success");
    }
    console.log(data1);
  };

  return (
    <div class="container">
      <div class="row">
        <h1>
          <a href="/">My Ecommerce Site</a>

          <span class="pull-right">
            <a href="cart.html">
              Cart {JSON.parse(localStorage.getItem("cart"))}
            </a>
          </span>
        </h1>
        <hr />
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">Place Order</div>
            <div class="panel-body">
              <div class="form-horizontal" role="form">
                <table class="table table-striped">
                  <thead class="table-head">
                    <tr>
                      <td>Product Name</td>
                      <td> Quantity</td>
                      <td> SubTotal</td>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((each) => {
                      return (
                        <tr key={each.id}>
                          <td>{each.name}</td>
                          <td>{each.quantity}</td>
                          <td>
                            <i class="fa fa-inr"></i>
                            {each.quantity * each.price}
                          </td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong> {items}</strong>
                      </td>
                      <td>
                        <strong>
                          <i class="fa fa-inr"></i>
                          {total}
                        </strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />

                <br />
                <div class="form-group">
                  <label for="inputName3" class="col-sm-2 control-label">
                    Enter Order Details
                  </label>
                </div>
                <div class="form-group">
                  <label for="inputName3" class="col-sm-2 control-label">
                    Name
                  </label>
                  <div class="col-sm-6">
                    <input
                      class="form-control"
                      id="inputName3"
                      value={name}
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group">
                  <label for="inputEmail3" class="col-sm-2 control-label">
                    Address
                  </label>
                  <div class="col-sm-6">
                    <textarea
                      class="form-control"
                      id="inputEmail3"
                      value={address}
                      placeholder="Deliver Address"
                      onChange={(e) => setAddress(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label"></label>
                  <div class="col-sm-6">
                    <button
                      class="btn btn-warning"
                      disabled={total > 500 ? false : true}
                      onClick={ConfirmOrder}
                    >
                      Confirm Order
                    </button>
                  </div>
                  {total < 500 && (
                    <p className="text-danger">***Please Select Above 500</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
