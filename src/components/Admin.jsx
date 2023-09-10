import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react"
import { firestore } from "../firebase/client"
import { addDoc, collection, getDocs } from "firebase/firestore"; 
import { useEffect, useState } from "react";
import OrderList from "./OrderList";
import Loader from "./Loader";
import { TitleBar } from "./TitleBar";

function Admin(){
    const [productosDB,setProductosDB] = useState([])
    const [categoriasDB,setCategoriasDB] = useState([])
    const [ordenes,setOrdenes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [productosLog, setProductosLog] = useState('')
    const [catLog, setCatLog] = useState('')

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

        return () => {
            setOrdenes([])
            setIsLoading(true)
        }
    },[])

    
    async function handleAgregarProductos() {
        let prodAdd = 0;
        setProductosDB([])
        const productosRef = collection(firestore,'productos')
        const productoSnapshot = await getDocs(productosRef)
        productoSnapshot.forEach(prod=>{
            productosDB.push(prod.data())
        })
        fetch('./mockup/productos.json').then(response=>response.json()).then(json=>{
            json.forEach(item=>{
                if(!productosDB.some(p=>p.id==item.id)){
                    prodAdd++
                    addDoc(productosRef,item).catch(e=>console.error(e))
                }  
            })
            setProductosLog(`Se agregaron ${prodAdd} producto(s)`)
        })
    }

    async function handleAgregarCategorias() {
        let catAdd = 0
        setCategoriasDB([])
        const categoriasRef = collection(firestore,'categorias')
        const categoriasSnapshot = await getDocs(categoriasRef)
        categoriasSnapshot.forEach(cat=>categoriasDB.push(cat.data()))
        fetch('./mockup/categories.json').then(response=>response.json()).then(json=>{
            json.forEach(item=>{
                if(!categoriasDB.some(c=>c.name==item)){
                    catAdd++
                    addDoc(categoriasRef,{name:item})
                }
            })
            setCatLog(`Se agregaron ${catAdd} categoría(s)`)
        }).catch(e=>console.error(e))
    }

    if(isLoading)
        return <Loader />

    return <>
    <Container maxW='1200px'>
        <TitleBar navigation={[{link:'/admin',name:'Administracion',active:true}]}/>
        <Flex my={4}>
            <Button onClick={handleAgregarProductos}>Agregar productos a firestore</Button>
            <Text p={2}>{productosLog}</Text>
        </Flex>
        <Flex>
            <Button onClick={handleAgregarCategorias}>Agregar categorías</Button>
            <Text p={2}>{catLog}</Text>
        </Flex>

        <Flex direction={'column'} gap={6} my={10}>
            <Heading as={'h4'}>Órdenes ({ordenes.length}): </Heading>
            {ordenes.length>0?ordenes.map((orden,index)=><Box key={index}><OrderList orden={orden} /></Box>):<Text>No hay ordenes</Text>}
        </Flex>
    </Container>
    </>
}

export default Admin