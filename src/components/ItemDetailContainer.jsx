import ItemDetail from "./ItemDetail";
//Item individual. Ruta: "/item/:id"

import { useEffect,useState } from "react";
import { useParams,Link } from 'react-router-dom';
import { NavBar } from "./NavBar";
import CarritoWidget from './CarritoWidget';
import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import Loader from './Loader';
import { firestore } from "../firebase/client";
import { collection, getDocs } from "firebase/firestore";

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
        let itemDB = {}
        const docsRef = collection(firestore,'productos')
        getDocs(docsRef).then((snap)=>{
            snap.forEach(i=>{
                if(i.data().id==idItem){
                    itemDB = {...i.data()}
                }
            })
            setItem(itemDB)
            setIsLoading(false)
        })
        setItem(itemDB)
        setNavigation([{link:'/',name:'Inicio'},{link:`/categoria/${itemDB.category}`,name:itemDB.category},{link:`/item/${itemDB.id}`,name:itemDB.title}])
    },[]);

    return <>
        <Container maxW='1200px'>
            <NavBar items={categorias} handleOnClick={handleOnClick} titulo={item.title} navigation={navigation} ><CarritoWidget /></NavBar>
            
            {isLoading?<Loader />:''}
            
            <Flex maxWidth={'sm'} m={'auto'}>
                <ItemDetail producto={item} isSingle={true} />
            </Flex>
        </Container>
    </>
}

export default ItemDetailContainer;