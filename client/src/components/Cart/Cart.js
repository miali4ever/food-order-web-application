import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import UserContext from "../../UserAndCart/user-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const user = useContext(UserContext);

  const totalAmount = `$${user.cartContext.totalAmount.toFixed(2)}`;
  const hasItems = user.cartContext.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    user.cartContext.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    user.cartContext.addItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    let userOrders = {
      userId: user.userId,
      // userName: user.userName,
      // userEmail: user.userEmail,
      deliveryInformation: userData,
      orderedItems: user.cartContext.items,
    };

    // userOrders works
    console.log(userOrders);

    await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userOrders),
    });

    setIsSubmitting(false);
    setDidSubmit(true);
    user.cartContext.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {user.cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>

      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}

      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {/* if clicked order button Checkout.js */}
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}

      {/* if click cart  and not click order button, display order or close button */}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {/* false && false && cart amount and latter checkout info */}
      {!isSubmitting && !didSubmit && cartModalContent}

      {/* true && Sending order data... */}
      {isSubmitting && isSubmittingModalContent}

      {/* false && true && Successfully sent the order! */}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
