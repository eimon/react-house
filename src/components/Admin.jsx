import { Button, Container, Flex } from "@chakra-ui/react"
import { NavBar } from "./NavBar"
import { firestore } from "../firebase/client"
import { addDoc, collection } from "firebase/firestore"; 
import { useState } from "react";

function Admin(){
    const [productos,setProductos] = useState([])
    const [categorias,setCategorias] = useState([])
    
    const handleAgregarProductos = () => {
        setProductos([])
        fetch('./mockup/productos.json').then(response=>response.json()).then(json=>{
            json.forEach(item=>{
                productos.push(item)
            })
        })
        const productosRef = collection(firestore,'productos')
        productos.map((producto)=>{
            addDoc(productosRef,producto).catch(e=>console.log(e))
        })
    }

    const handleAgregarCategorias = () => {
        setCategorias([])
        const categoriasRef = collection(firestore,'categorias')
        fetch('./mockup/categories.json').then(response=>response.json()).then(json=>{
            json.forEach(item=>{
                console.log(item)
                addDoc(categoriasRef,{name:item}).catch(e=>console.log(e))
            })
        })
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