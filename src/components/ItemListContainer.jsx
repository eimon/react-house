import { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { NavBar } from './NavBar';
import Loader from './Loader';
import { Container, Input, SimpleGrid, Text } from '@chakra-ui/react'
import { firestore } from '../firebase/client';
import { collection, getDocs, where, query } from 'firebase/firestore';

const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const [itemsFiltered, setItemsFiltered] = useState([]);
    const {idCategoria} = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [navigation,setNavigation] = useState([])

    useEffect(() => {
        const i = []
        let itemsRef = collection(firestore,"productos")
        if(idCategoria){
            itemsRef = query(itemsRef,where("category","==",idCategoria))
            setNavigation([{link:'/',name:'Inicio'},{link:`/categoria/${idCategoria}`,name:idCategoria}])
        }else
            setNavigation([{link:'/',name:'Inicio'}])
        getDocs(itemsRef).then((snap)=>{
            snap.forEach(item=>{
                i.push(item.data())
            })
            setIsLoading(false)
            setItems(i)
            setItemsFiltered(i)
        })
    },[idCategoria]);

    const handleOnClick = () =>{
        setItemsFiltered([])
        setIsLoading(true)
    }

    const handleKeyUp = (evt) => {
        if(evt.target.value.length>2){
            setItemsFiltered(items.filter(item => item.title.toLowerCase().includes(evt.target.value.toLowerCase())))
        }else
            setItemsFiltered(items)
    }
    
    return <>
        <Container maxW='1200px'>
            <NavBar handleOnClick={handleOnClick} titulo={idCategoria??'Tiendita'} navigation={navigation} />
            
            <Input type="text" onKeyUp={handleKeyUp} placeholder='Buscar en esta página'></Input>
            {isLoading?<Loader />:''}
            
            <Text mt={3}>Mostrando {itemsFiltered.length} producto(s) de {items.length}</Text>
            <SimpleGrid columns={3} spacing={10} my={10}>
                {itemsFiltered.length>0?itemsFiltered.map((item,index)=> <ItemDetail key={index} producto={item}/>):<h3 className='m-5'>No se encontraron productos</h3>}
            </SimpleGrid>
        </Container>
    </>;
};

export default ItemListContainer;