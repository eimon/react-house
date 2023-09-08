import { useEffect, useState } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import { NavBar } from './NavBar';
import Loader from './Loader';
import { Container, Input, SimpleGrid } from '@chakra-ui/react'
import { firestore } from '../firebase/client';
import { collection, doc, getDoc, getDocs, where, query } from 'firebase/firestore';

const ItemListContainer = () => {

    const [items, setItems] = useState([]);
    const [itemsFiltered, setItemsFiltered] = useState([]);
    const {idCategoria} = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [navigation,setNavigation] = useState([])

    useEffect(() => {
        let itemsRef = collection(firestore,"productos")
        if(idCategoria){
            itemsRef = query(itemsRef,where("category","==",idCategoria))
        }
        getDocs(itemsRef).then((snap)=>{
            snap.forEach(item=>{
                itemsFiltered.push(item.data())
                items.push(item.data())
            })
            setIsLoading(false)
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

    useEffect(()=>{
        if(idCategoria)
            setNavigation([{link:'/',name:'Inicio',active:true},{link:`/categoria/${idCategoria}`,name:idCategoria,active:false}])
        else
            setNavigation([{link:'/',name:'Inicio',active:true}])

    })

    
    return <>
        <Container maxW='1200px'>
            <NavBar handleOnClick={handleOnClick} titulo={idCategoria??'Tiendita'} navigation={navigation} />
            
            <Input type="text" onKeyUp={handleKeyUp} placeholder='Buscar en esta página'></Input>
            
            {isLoading?<Loader />:''}
            
            <SimpleGrid columns={3} spacing={10} my={10}>
                {itemsFiltered.length>0?itemsFiltered.map((item,index)=> <ItemDetail key={index} producto={item}/>):<h3 className='m-5'>No se encontraron productos</h3>}
            </SimpleGrid>
        </Container>
    </>;
};

export default ItemListContainer;