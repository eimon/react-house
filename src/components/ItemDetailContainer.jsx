import ItemDetail from "./ItemDetail";
//Item individual. Ruta: "/item/:id"

import { useEffect,useState } from "react";
import { useParams,Link } from 'react-router-dom';
import { NavBar } from "./NavBar";
import CarritoWidget from './CarritoWidget';
import { Container, SimpleGrid } from "@chakra-ui/react";
import Loader from './Loader';
import { firestore } from "../firebase/client";
import { collection, query, where,getDocs } from "firebase/firestore";

const ItemDetailContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [categorias,setCategorias] = useState([]);
    const [navigation,setNavigation] = useState([])
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(json=>setCategorias(json))
    },[])

    const [item,setItem] = useState({})
    const {idItem} = useParams()

    const handleOnClick = () =>{
        setIsLoading(true)
    }

    useEffect(()=>{
        setNavigation([{link:'/',name:'Inicio'}])
        const docsRef = collection(firestore,'productos')
        const query = query(docsRef,where('id','==',idItem))
        getDocs(query).then(doc=>{
            console.log(doc.metadata())
        })
        setNavigation([{link:'/',name:'Inicio'},{link:`/categoria/asdf`,name:'idCategoria'}])
    },[idItem]);

    return <>
        <Container maxW='1200px'>
            <NavBar items={categorias} handleOnClick={handleOnClick} titulo={item.title} navigation={navigation} ><CarritoWidget /></NavBar>
            
            {isLoading?<Loader />:''}
            
            <SimpleGrid columns={1} spacing={10} my={10}>
                <ItemDetail producto={item}/>
            </SimpleGrid>
        </Container>
    </>
}

export default ItemDetailContainer;