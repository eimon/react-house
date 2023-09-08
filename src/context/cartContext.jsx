import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, useContext, useEffect } from "react";
import { firestore } from "../firebase/client";

export const CartContext = createContext([])

function CartProvider({children}) {
    const [items] = useState([])
    const [total,setTotal] = useState(0)

    const agregarItem = (producto,cant) => {
        if(!isInCart(producto.id))
            items.push(producto)
        items[items.findIndex(p=>p.id===producto.id)].cant+=cant
    }
    const isInCart = (id) => {
        if(items.find(p=>p.id===id))
            return true
        else
            return false
    }

    const getTotal = () => {
        return items.reduce((a,p)=>a+(p.price*p.cant),0)
    }

    const updateTotalItems = () => {
        setTotal(items.reduce((a,p)=>a+p.cant,0))
    }

    return <CartContext.Provider value={{
            items,
            agregarItem,
            getTotal,
            updateTotalItems,
            total,
        }}>
        {children}
    </CartContext.Provider>
}

export function useCartContext(){
    return useContext(CartContext)
}

export default CartProvider