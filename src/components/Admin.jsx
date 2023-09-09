import { Button, Container, Flex } from "@chakra-ui/react"
import { NavBar } from "./NavBar"
import { firestore } from "../firebase/client"
import { addDoc, collection, getDocs, getDoc, doc } from "firebase/firestore"; 
import { useState } from "react";

function Admin(){
    const [productosDB,setProductosDB] = useState([])
    const [categorias,setCategorias] = useState([])
    const [categoriasDB,setCategoriasDB] = useState([])
    
    async function handleAgregarProductos() {
        let omitidos = 0;
        setProductosDB([])
        const productosRef = collection(firestore,'productos')
        const productoSnapshot = await getDocs(productosRef)
        productoSnapshot.forEach(prod=>{
            console.log(prod.data())
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

    return <>
    <Container maxW='1200px'>
        <NavBar navigation={[{link:'/admin',name:'Administracion',active:true}]}/>
        <Flex mb={4}>
            <Button onClick={handleAgregarProductos}>Agregar productos</Button>
        </Flex>
        <Flex>
            <Button onClick={handleAgregarCategorias}>Agregar categorías</Button>
        </Flex>
    </Container>
    </>
}

export default Admin