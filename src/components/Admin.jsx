import { Box, Button, Card, Container, Flex, Heading, Text, useBoolean } from "@chakra-ui/react"
import { NavBar } from "./NavBar"
import { firestore } from "../firebase/client"
import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import Loader from "./Loader";

function Admin(){
    const [productosDB,setProductosDB] = useState([])
    const [categoriasDB,setCategoriasDB] = useState([])
    const [ordenes,setOrdenes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        const o = []
        const ordersRef = collection(firestore,'ordenes')
        getDocs(ordersRef).then((snap)=>{
            snap.forEach((order)=>{
                o.push(order.data())
            })
            setIsLoading(false)
            setOrdenes(o)
        })
    },[])

    
    async function handleAgregarProductos() {
        let omitidos = 0;
        setProductosDB([])
        const productosRef = collection(firestore,'productos')
        const productoSnapshot = await getDocs(productosRef)
        productoSnapshot.forEach(prod=>{
            productosDB.push(prod.data())
        })
        fetch('./mockup/productos.json').then(response=>response.json()).then(json=>{
            json.forEach(item=>{
                if(productosDB.some(p=>p.id==item.id))
                    omitidos++
                else
                    addDoc(productosRef,item).catch(e=>console.error(e))
            })
            console.log('Productos omitidos: ',omitidos)
        })
    }

    async function handleAgregarCategorias() {
        let omitidosCat = 0
        setCategoriasDB([])
        const categoriasRef = collection(firestore,'categorias')
        const categoriasSnapshot = await getDocs(categoriasRef)
        categoriasSnapshot.forEach(cat=>categoriasDB.push(cat.data()))
        fetch('./mockup/categories.json').then(response=>response.json()).then(json=>{
            json.forEach(item=>{
                if(categoriasDB.some(c=>c.name==item))
                    omitidosCat++
                else
                    addDoc(categoriasRef,{name:item})
            })
            console.log('Categorías omitidas: ',omitidosCat)
        }).catch(e=>console.error(e))
    }

    if(isLoading)
        return <Loader />

    return <>
    <Container maxW='1200px'>
        <NavBar navigation={[{link:'/admin',name:'Administracion',active:true}]}/>
        <Flex my={4}>
            <Button onClick={handleAgregarProductos}>Agregar productos</Button>
        </Flex>
        <Flex>
            <Button onClick={handleAgregarCategorias}>Agregar categorías</Button>
        </Flex>

        <Flex direction={'column'} gap={6} my={10}>
            <Heading as={'h4'}>Órdenes ({ordenes.length}): </Heading>
            {ordenes.length>0?ordenes.map((orden,index)=><Box key={index}><OrderList orden={orden} /></Box>):<Text>No hay ordenes</Text>}
        </Flex>
    </Container>
    </>
}

export default Admin