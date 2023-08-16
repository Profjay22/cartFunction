import { useEffect, useState, createContext } from "react";
import "./ProductList.css";
import Cart from "./Cart";

export const CartItemContext = createContext(0);
export const RemoveItemContext = createContext([]);

function Items() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.log("Error fetching products" + error));
  }, []);
  console.log(products);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };

  return (
    <CartItemContext.Provider value={cartItems}>
      <RemoveItemContext.Provider value={removeFromCart}>
        <div className="product-align">
        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="product">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="product-image"
              />
              <h2 className="product-title">{product.title}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <button
                className="add-to-cart-button"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <Cart />
        </div>
      </RemoveItemContext.Provider>
    </CartItemContext.Provider>
  );
}

export default Items;
