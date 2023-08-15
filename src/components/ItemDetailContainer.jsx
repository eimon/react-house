import {useEffect, useState} from "react";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
    const [item, setItem] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(()=>{
            setItem({
                descripcion: "esta es una descripcion",
                precio: 230
            });
            setIsLoading(false)
        },2000);
    },[]);

    if (isLoading) {
        return (
            <div id="loader">
                <h3>Cargando...</h3>
            </div>
        )
    }
    
    return (
        <div>
            <ItemDetail descripcion={item.descripcion} precio={item.precio} />
        </div>
    );
}

export default ItemDetailContainer;