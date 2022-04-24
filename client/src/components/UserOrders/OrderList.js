import React, { useState, useEffect, Fragment } from "react";

// import Card from "../UI/Card";
import OrderItem from "./OrderItem";
// import Button from "../UI/Button";
import LoadingSpinner from "../UI/LoadingSpinner";
// import classes from "./OrderList.module.css";

const OrderList = (props) => {
  const [orders, LoadedOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        `http://localhost:5000/${props.userId}/orders`
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      // console.log("data");
      // console.log(responseData.orders);
      setIsLoading(false);
      LoadedOrders(responseData.orders);
    };

    fetchOrders().catch((error) => {
      setIsLoading(false);

      console.log(error);
    });
  }, [props.userId]);

  // if (orders.length === 0) {
  //   return (
  //     <div>
  //       <Card className={classes["order-list"]}>
  //         <h2>No order found. Maybe Add some food first?</h2>
  //         <Button to="/food">Add Food</Button>
  //       </Card>
  //     </div>
  //   );
  // }
  //order.delivery and order.order
  return (
    <Fragment>
      {isLoading && <LoadingSpinner asOverlay />}

      {!isLoading && orders.map((order) => <OrderItem OrderItem={order} />)}
    </Fragment>
  );
};

export default OrderList;
