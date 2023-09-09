import ItemDetail from "./ItemDetail";
//Item individual. Ruta: "/item/:id"

import { useEffect,useState } from "react";
import { useParams,Link } from 'react-router-dom';
import { NavBar } from "./NavBar";
import CarritoWidget from './CarritoWidget';
import { Container } from "@chakra-ui/react";

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
        <Container maxW='1200px'>
            <NavBar handleOnClick={handleOnClick} titulo={idCategoria??'Tiendita'} navigation={navigation} />
            
            {isLoading?<Loader />:''}
            
            <SimpleGrid columns={1} spacing={10} my={10}>
                <ItemDetail producto={item}/>
            </SimpleGrid>
        </Container>
    </>
}

export default ItemDetailContainer;