'use client';
import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("cart");
      if (raw) setCartItems(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const addToCart = (product, selectedSize, quantity) => {
    const qty = quantity ?? 1;
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === selectedSize
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id &&
            item.selectedSize === selectedSize
            ? { ...item, quantity: (item.quantity ?? 0) + qty }
            : item
        );
      }

      return [...prevItems, { ...product, selectedSize, quantity: qty }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(item._id === productId && item.selectedSize === size)
      )
    );
  };

  const increaseQty = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId &&
          item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (productId, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId &&
          item.selectedSize === size
          ? {
            ...item,
            quantity: Math.max(1, item.quantity - 1),
          }
          : item
      )
    );
  };

  const directBuy = (product, selectedSize, quantity) => {
    const qty = quantity ?? 1;
    setCartItems([{ ...product, selectedSize, quantity: qty }]);
  }

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, directBuy }}>
      {children}
    </CartContext.Provider>
  );
};