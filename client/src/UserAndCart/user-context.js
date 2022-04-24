import React from "react";

const UserContext = React.createContext({
  isLoggedIn: false,
  userId: null,
  userName: null,
  userEmail: null,
  Login: () => {},
  Logout: () => {},
  cartContext: {
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    clearCart: () => {},
  },
});

export default UserContext;
