import { doc, getDoc } from "firebase/firestore";
import { createContext, useState, useContext } from "react";
import { firestore } from "../firebase/client";

export const CartContext = createContext([])

function CartProvider({children}) {
    const [items,setItems] = useState([])
    const [total,setTotal] = useState(0)

    const agregarItem = (producto,cant) => {
        if(!isInCart(producto.id))
            items.push(producto)
        items.find(p=>p.id===producto.id).cant+=cant
    }

    const quitarItem = (producto) => {
        if(isInCart(producto.id))
            items.splice(items.findIndex(p=>p.id==producto.id),1)
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

    const vaciarCarrito = () => {
        setItems([])
        setTotal(0)
    }

    return <CartContext.Provider value={{
            items,
            agregarItem,
            quitarItem,
            getTotal,
            updateTotalItems,
            vaciarCarrito,
            total,
        }}>
        {children}
    </CartContext.Provider>
}

export function useCartContext(){
    return useContext(CartContext)
}

export default CartProvider