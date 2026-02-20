import React from 'react'
import { createContext,useState } from 'react'

export const wishContext = createContext();
export const WishlistProvider = ({child})=>{

    

    return(
        <wishContext.Provider>
        {child}
        </wishContext.Provider>
    )
} 
 
