import React, { createContext, useContext, useReducer } from 'react';

interface CartProviderProps {
    children: React.ReactNode;
    }

// Initial state of cart
const initialState = {
    cart: [],
    checked_out: false,
    checked_out_products: [], 
  };

// Action types on cart
const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  CHECKOUT: 'CHECKOUT',
  CLEAR_CART: 'CLEAR_CART',
};

// Reducer function to handle actions on cart
const cartReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
        case actionTypes.CHECKOUT:
        return {
            ...state,
            checked_out: true,
            checked_out_products: state.cart,
        };
        case actionTypes.CLEAR_CART:
        return {
            ...state,
            cart: [],
        };
      default:
        return state;
    }
  };

// Here we create the context
const CartContext = createContext(initialState);

// Here we create the provider
const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
   

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Here we create the hook to use the context
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart, actionTypes };
