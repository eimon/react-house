import ItemDetail from "./ItemDetail";
//Item individual. Ruta: "/item/:id"

import { useEffect,useState } from "react";
import { useParams,Link } from 'react-router-dom';
import { NavBar } from "./NavBar";
import CarritoWidget from './CarritoWidget';

const ItemDetailContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categorias,setCategorias] = useState([]);
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(json=>setCategorias(json))
    },[])

    const [item,setItem] = useState({})
    const {idItem} = useParams()
    useEffect(()=>{
        fetch(`https://fakestoreapi.com/products/${idItem}`)
            .then(res=>res.json())
            .then(json=>{
                setItem(json)
                setIsLoading(true)
            })
    },[idItem]);

    const handleOnClick = () =>{
        setItem([])
        setIsLoading(true)
    }

    
    return <>
        <NavBar items={categorias} handleOnClick={handleOnClick}><CarritoWidget /></NavBar>
        <div className="container my-3">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className='breadcrumb-item'><Link to={'/'}>Inicio</Link></li>
                    <li className="breadcrumb-item"><Link to={`/categoria/${item.category}`}>{item.category}</Link></li>
                    <li className="breadcrumb-item active">{item.title}</li>
                </ol>
            </nav>
            {isLoading?<div id="loader"><h3>Cargando...</h3></div>:<ItemDetail key={item.key} producto={item} isSingle={true}/>}
                
        </div>
    </>
}

export default ItemDetailContainer;