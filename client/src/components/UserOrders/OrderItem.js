import React, { useState } from "react";
import OrderTable from "./OrderTable";
// import Button from "../UI/Button";
// import Card from "../UI/Card";
// import classes from "./OrderItem.module.css";

// import LoadingSpinner from "../UI/LoadingSpinner";

const OrderItem = (props) => {
  const { delivery, order } = props.OrderItem;
  var d = new Date(props.OrderItem.createdAt);

  var orderCreateTime =
    d.getDate() +
    "/" +
    (d.getMonth() + 1) +
    "/" +
    d.getFullYear() +
    "     " +
    d.getHours() +
    ":" +
    d.getMinutes() +
    ":" +
    d.getSeconds();

  // console.log(props.OrderItem.createdAt);

  const [detailsIsOpen, setDetailsIsOpen] = useState(false);

  const orderDetailHanlder = () => {
    setDetailsIsOpen((prevShowDeails) => !prevShowDeails);
  };

  return (
    <React.Fragment>
      <ul>
        <li>
          <div>
            Order purchased at {orderCreateTime} <span></span>
            <button onClick={orderDetailHanlder}>
              {!detailsIsOpen ? "details>>>" : "close"}
            </button>
            {detailsIsOpen && <OrderTable delivery={delivery} order={order} />}
            <hr></hr>
          </div>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default OrderItem;
