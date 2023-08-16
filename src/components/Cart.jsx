import { useContext } from "react";
import { CartItemContext, RemoveItemContext } from "./Items";
import "./ProductList.css";

function Cart() {
  const CartItemContexts = useContext(CartItemContext);
  const RemoveItem = useContext(RemoveItemContext);
  const calculateTotal = () => {
    return CartItemContexts.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart">
      <h2>Cart</h2>
      {CartItemContexts.map((item) => (
        <div key={item.id} className="cart-item">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="cart-item-image"
          />
          <p className="cart-item-title">{item.title}</p>
          <p className="cart-item-quantity">Quantity: {item.quantity}</p>
          <p className="cart-item-price">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button onClick={() => RemoveItem(item.id)}>Remove</button>
        </div>
      ))}
      <p className="cart-total">Total: ${calculateTotal().toFixed(2)}</p>
    </div>
  );
}

export default Cart;
