import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
export const MainContext = createContext();
export const MainProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [coursesdata, setcoursesdata] = useState([]);
  const [users, setUsers] = useState([]);
  const [product, setProduct] = useState([])
  const [GetCart, setGetCart] = useState()
  const [GetStudent, setGetStudent] = useState()
  const [Getreview, setGetreview] = useState()
  const [visible, setVisible] = useState(false);
  

  // API disabled: seed with empty or local data
  useEffect(() => {
    setcoursesdata([]);
    setUsers([]);
    setProduct([]);
    setGetCart([]);
    setGetStudent([]);
    setGetreview([]);
  }, [])


  // const addToCart = (item) => {
  //   setCart([...cart, { ...item }]);
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // };


  const generateUniqueUserId = () => {
    return 'Id-' + Math.random().toString(36).substr(2, 9);
  };

  const addToCart = (item) => {
    // Prepare the request payload
    const cartItem = { ...item };

    let userId = Cookies.get('userId');
    if (!userId) {
      userId = generateUniqueUserId();
      Cookies.set('userId', userId, { expires: 7 });
    }

    // API disabled: directly update local cart
    setCart([...cart, cartItem]);
  };

  const handleAddToCart = (card) => {
    addToCart(card);
  };

  //wishlist 

  const [wish, setWish] = useState([]);

  const addToWish = (item) => {
    setWish([...wish, { ...item }]);
    localStorage.setItem('wish', JSON.stringify(wish));
    console.log(wish)
  }
  const handlerAddToWish = (wish) => {
    addToWish(wish);
  };


  return (
    <MainContext.Provider value={{ cart, addToCart, handleAddToCart, addToWish, handlerAddToWish,visible, setVisible,  coursesdata, users, product, GetCart, GetStudent, Getreview }}>
      {children}
    </MainContext.Provider>
  );
};
