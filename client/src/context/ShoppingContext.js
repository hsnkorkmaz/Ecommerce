import React,{createContext} from "react";

const ShoppingContext = createContext({
    cart: {},
    setCart: () => {},
  });

export default ShoppingContext;
