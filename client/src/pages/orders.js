import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import OrderList from "../components/UserOrders/OrderList";
import Card from "../components/UI/Card";
import classes from "./order.module.css";

const Orders = () => {
  //const TotalAmount = `$${user.cartContext.totalAmount.toFixed(2)}`;
  const userId = useParams().userId;

  return (
    <Fragment>
      <Card className={classes.OrderList}>
        <OrderList userId={userId} />
      </Card>
    </Fragment>
  );
};

export default Orders;
