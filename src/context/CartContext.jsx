
import React, {
  createContext,
  useReducer,
  useEffect
} from "react";

export const CartContext = createContext();

const getInitialState = () => {
  const savedCart = localStorage.getItem("cartItems");

  return {
    cartItems: savedCart ? JSON.parse(savedCart) : []
  };
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingProduct = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingProduct) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + action.payload.quantity
                }
              : item
          )
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    }

    case "INCREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0)
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        )
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: []
      };
      

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    undefined,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(state.cartItems)
    );
  }, [state.cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
