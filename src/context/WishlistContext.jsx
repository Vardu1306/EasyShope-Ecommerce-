
import React, {
  createContext,
  useReducer,
  useEffect
} from "react";

export const WishlistContext = createContext();

const getInitialState = () => {
  const savedWishlist = localStorage.getItem("wishlistItems");

  return {
    wishlistItems: savedWishlist
      ? JSON.parse(savedWishlist)
      : []
  };
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlistItems: [
          ...state.wishlistItems,
          action.payload
        ]
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter(
          (item) => item.id !== action.payload
        )
      };

    case "CLEAR_WISHLIST":
      return {
        ...state,
        wishlistItems: []
      };

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    undefined,
    getInitialState
  );

  useEffect(() => {
    localStorage.setItem(
      "wishlistItems",
      JSON.stringify(state.wishlistItems)
    );
  }, [state.wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: state.wishlistItems,
        dispatch
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
