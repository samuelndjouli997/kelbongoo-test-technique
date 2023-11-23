// CartContext.js
import React, { createContext, useContext, useReducer } from 'react';

interface CartProviderProps {
    children: React.ReactNode;
    }

// Initial state du panier
const initialState = {
    cart: [],
  };

// Actions possibles sur le panier
const actionTypes = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  // Ajoutez d'autres actions si nécessaire, comme REMOVE_FROM_CART, UPDATE_QUANTITY, etc.
};

// Fonction réductrice pour mettre à jour l'état du panier
const cartReducer = (state, action) => {
    switch (action.type) {
      case actionTypes.ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
        case actionTypes.REMOVE_FROM_CART: // Case to handle item removal
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload),
        };
      // Handle other cases as needed
      default:
        return state;
    }
  };

// Créez le contexte avec initialState comme valeur par défaut
const CartContext = createContext(initialState);

// Créez le fournisseur de contexte
const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const removeFromCart = (productId: number) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: productId,
    });
  };


      

  return (
    <CartContext.Provider value={{ state, dispatch, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Fonction utilitaire pour utiliser le contexte
const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart, actionTypes };
