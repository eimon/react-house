import { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams,Link } from 'react-router-dom';
import { NavBar } from './NavBar';
import CarritoBtn from './CarritoBtn';

const ItemListContainer = ({title}) => {

    const [items, setItems] = useState([]);
    const [itemsFiltered, setItemsFiltered] = useState([]);
    const {idCategoria} = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [categorias,setCategorias] = useState([]);
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(json=>setCategorias(json))
    },[])

    useEffect(() => {
        fetch(idCategoria ? `https://fakestoreapi.com/products/category/${idCategoria}` : 'https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                setItemsFiltered(json)
                setItems(json)
            }).finally(()=>setIsLoading(false))
    },[idCategoria]);

    const handleSubmit = evento =>{
        evento.preventDefault()
        setItemsFiltered(items.filter(item => item.title.toLowerCase().includes(evento.target.parametro.value.toLowerCase())))
    }

    const handleOnClick = () =>{
        setItemsFiltered([])
        setIsLoading(true)
    }
    
    return <>
        <NavBar items={categorias} handleOnClick={handleOnClick}><CarritoBtn></CarritoBtn></NavBar>
        <main className="container">
            <h1>{idCategoria??title}</h1>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className={idCategoria?'breadcrumb-item':'breadcrumb-item-active'}><Link to={'/'}>Inicio</Link></li>
                    {idCategoria&&<li className="breadcrumb-item active">{idCategoria}</li>}
                </ol>
            </nav>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" id='parametro' /> 
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
            {isLoading?<div id="loader"><h3>Cargando...</h3></div>:''}
            
            {itemsFiltered.length>0?itemsFiltered.map(item=> <ItemDetail key={item.key} producto={item}/>):<h3 className='m-5'>No se encontraron productos</h3>}
        </main>
    </>;
};

export default ItemListContainer;