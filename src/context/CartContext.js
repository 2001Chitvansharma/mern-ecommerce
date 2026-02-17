import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ Add to Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);

      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➕ Increase qty
  const increaseQty = (_id) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === _id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // ➖ Decrease qty
  const decreaseQty = (_id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === _id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  // ❌ Remove item
  const removeFromCart = (_id) => {
    setCart((prev) => prev.filter((item) => item._id !== _id));
  };

  // 🧹 Clear cart
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
