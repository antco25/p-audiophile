import React, { useContext, useState, createContext } from 'react';

interface ContextWrapProps {
  children: React.ReactNode;
}

interface ContextType {
  showCart: boolean,
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>,
  cartItems: CartItem[],
  addToCart: (item: CartItem) => void,
  removeFromCart: (item: CartItem) => void,
  removeAllCart: () => void,
  updateCartItem: (item: CartItem, newQuantity: number) => void,
  totalPrice: number,
  getPrevLink: () => string,
  consumePrevLink: () => void,
  storeLink: (link: string, reset?: boolean) => void,
  resetCart: boolean,
  setResetCart: React.Dispatch<React.SetStateAction<boolean>>,
}

export interface CartItem {
  name: string
  price: number,
  quantity: number,
  cartImage: string,
  id: string,
  slug: string
}

const Context = createContext({} as ContextType);

export const ContextWrap: React.FC<ContextWrapProps> = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [linkHistory, setLinkHistory] = useState(['/']);
  const [resetCart, setResetCart] = useState(false);

  const getPrevLink = () => {
    if (linkHistory.length === 0) {
      return '/'
    }

    if (linkHistory.length === 1) {
      return linkHistory[linkHistory.length - 1]
    }

    return linkHistory[linkHistory.length - 2];
  }

  const consumePrevLink = () => {
    setLinkHistory(old => {
      return old.slice(0, old.length - 1);
    })
  }

  const storeLink = (link: string, reset?: boolean) => {
    setLinkHistory(old => {
      if (reset) return [link];
      if (link === old[old.length - 1]) return old;
      return [...old, link];
    })
  }

  const addToCart = (item: CartItem) => {
    let isInsideCart = false;
    let priceChange = 0;

    setCartItems((currCart) => {
      const updatedCart = currCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          isInsideCart = true;
          priceChange = (item.quantity - cartItem.quantity) * item.price;
          return { ...cartItem, quantity: item.quantity } as CartItem
        }

        return cartItem;
      })

      if (!isInsideCart) {
        priceChange = item.quantity * item.price;
        updatedCart.push(item);
      }

      return updatedCart;
    })

    setTotalPrice((prevTotal) => {
      return prevTotal + priceChange
    });
  }

  const removeFromCart = (item: CartItem) => {
    setTotalPrice((prevTotal) => {
      return (prevTotal - (item.quantity * item.price))
    });
    setCartItems((currCart) => {
      return currCart.filter((cartItem) => cartItem.id !== item.id)
    });
  }

  const removeAllCart = () => {
    setCartItems([]);
    setTotalPrice(0);
  }

  const updateCartItem = (item: CartItem, newQuantity: number) => {
    let priceChange = 0;

    setCartItems((currCart) => {
      return currCart.map((cartItem) => {
        if (cartItem.id === item.id) {
          priceChange = (newQuantity - cartItem.quantity) * item.price;
          return { ...cartItem, quantity: newQuantity } as CartItem
        }

        return cartItem;
      })
    })

    setTotalPrice((prevTotal) => {
      return prevTotal + priceChange
    });
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        addToCart,
        removeFromCart,
        removeAllCart,
        updateCartItem,
        totalPrice,
        getPrevLink,
        consumePrevLink,
        storeLink,
        resetCart,
        setResetCart,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);