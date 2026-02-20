import { createContext, useState } from "react";

export const WishContext = createContext();
export const WishProvider = ({ children }) => {
    const [wish, setWish] = useState([]);

    const addToWish = (item) => {
        setWish([...wish, { ...item }]);
        localStorage.setItem('wish', JSON.stringify(wish));
        console.log(wish)
    }
    const  handlerAddToWish = (wish) =>{
        addToWish(wish);
    };
    return(
        <WishContext.Provider value={{wish, addToWish, handlerAddToWish }}>
            {children}
        </WishContext.Provider>
    );
};