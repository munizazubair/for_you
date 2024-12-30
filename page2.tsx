"use client";

import { useContext } from "react";
import { CartContext } from "../context/cartContext";

export default function Cart() {
  const context = useContext(CartContext);

  if (!context) {
    return <div>Error: Cart Context is not available</div>;
  }

  const { cart } = context;

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
