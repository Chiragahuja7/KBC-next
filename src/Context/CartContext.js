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

  // Helper to build a cart-ready item from product + size object
  const buildCartItem = (product, selectedSize, qty, color) => {
    const isObj = typeof selectedSize === 'object' && selectedSize !== null;
    const sizeLabel = isObj ? selectedSize.label : (selectedSize || '');
    const itemPrice = (isObj && selectedSize.price) ? selectedSize.price : product.price;
    const itemOldPrice = (isObj && selectedSize.oldPrice != null) ? selectedSize.oldPrice : product.oldPrice;
    const cartImage = (isObj && selectedSize.image?.url) ? selectedSize.image.url : (product.images?.[0]?.url || '');

    return {
      ...product,
      selectedSize: sizeLabel,
      selectedColor: color,
      quantity: qty,
      price: itemPrice,
      oldPrice: itemOldPrice,
      cartImage,
    };
  };

  const addToCart = (product, selectedSize, quantity, selectedColor) => {
    const qty = quantity ?? 1;
    const isObj = typeof selectedSize === 'object' && selectedSize !== null;
    const sizeLabel = isObj ? selectedSize.label : (selectedSize || '');
    const color = selectedColor || '';
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item._id === product._id &&
          item.selectedSize === sizeLabel &&
          (item.selectedColor || '') === color
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id &&
            item.selectedSize === sizeLabel &&
            (item.selectedColor || '') === color
            ? { ...item, quantity: (item.quantity ?? 0) + qty }
            : item
        );
      }

      return [...prevItems, buildCartItem(product, selectedSize, qty, color)];
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

  const directBuy = (product, selectedSize, quantity, selectedColor) => {
    const qty = quantity ?? 1;
    const color = selectedColor || '';
    setCartItems([buildCartItem(product, selectedSize, qty, color)]);
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