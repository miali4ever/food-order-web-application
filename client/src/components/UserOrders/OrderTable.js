// import { useState } from "react";
import TableItem from "./TablelItem";
import classes from "./OrderTable.module.css";
const OrderTable = (props) => {
  // <OrderTable delivery={delivery} order={order} />

  // const Item = order.map((item) => (
  //   <div>
  //     Food ID: <span>{item.id}</span>
  //     Food Name: <span>{item.name}</span>
  //     Food Amount: <span>{item.amount}</span>
  //     Food Price: <span>{item.price}</span>
  //   </div>
  // ));

  /* <li>
            <h4>Shipping Information</h4>
            <div>
              Name: {delivery[0].name} <span></span>
              Street: {delivery[0].street} <span></span>
              City: {delivery[0].city} <span></span>
              Post Code:{delivery[0].postalCode} <span></span>
            </div>
          </li>
          <li>
            <h4>Purchase Information</h4>
            {Item}
          </li> */
  let totalPrice = 0;
  for (const key in props.order) {
    let price = props.order[key].price * props.order[key].amount;
    totalPrice += price;
  }

  const orderList = props.order.map((item) => <TableItem item={item} />);

  return (
    <div>
      <div>
        <h4>Shipping Information</h4>

        <hr></hr>

        <div className={classes.DeliveryRow}>
          <div className={classes.DeliveryCol}>
            Name: {props.delivery[0].name}
          </div>

          <div className={classes.DeliveryCol}>
            City: {props.delivery[0].city}
          </div>
        </div>
        <div className={classes.DeliveryRow}>
          <div className={classes.DeliveryCol}>
            Street: {props.delivery[0].street}
          </div>
          <div className={classes.DeliveryCol}>
            Post Code:{props.delivery[0].postalCode}
          </div>
        </div>

        <hr></hr>
        <div className={classes.DeliveryRow}>
          <div className={classes.DeliveryColWord}>Order Information</div>
          <div className={classes.DeliveryColButton}>Total($):{totalPrice}</div>
        </div>

        <hr></hr>
      </div>

      <table className={classes.DeliveryRow}>
        <thead>
          <th>NAME</th>
          <th>AMOUNT</th>
          <th>PRICE ($)</th>
          <th>TOTAL PRICE</th>
        </thead>

        <tbody>{orderList}</tbody>
      </table>
    </div>
  );
};

export default OrderTable;
