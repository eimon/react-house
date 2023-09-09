import { Box, Button, Container, Flex, FormControl, FormHelperText, FormLabel, Heading, Input, SimpleGrid, Text } from "@chakra-ui/react"
import { NavBar } from "./NavBar"
import { useState } from "react"
import { useCartContext } from "../context/cartContext"
import { addDoc, collection } from "firebase/firestore"
import { firestore } from "../firebase/client"
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const Checkout = () => {
    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const {items,getTotal,vaciarCarrito} = useCartContext()
    const navigate = useNavigate()
    const FinalizarSwal = withReactContent(Swal)
    function handleFinalizar() {
        if(!isButtonDisabled){
            FinalizarSwal.fire({
                title: '¿Desdea finalizar la compra?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No`,
                cancelButtonText: `Cancelar`,
              }).then(async (result) => {
                if (result.isConfirmed) { 
                  const ordersRef = collection(firestore,'ordenes')
                  await addDoc(ordersRef,{comprador:{nombre:nombre,email:email,telefono:telefono},items:items,total:getTotal(),fecha:Date()})
                  FinalizarSwal.fire('¡Listo!', 'En breve nos comunicaremos con usted', 'success').then((result)=>{
                    if(result.isConfirmed){
                        vaciarCarrito()
                        navigate('/')
                    }
                  })
                } else if (result.isDenied) {
                  FinalizarSwal.fire('No se realizaron cambios', '', 'info')
                }
              })
        }
    }
    const isButtonDisabled = !(email !== '' && nombre !== '' && telefono !== '' )

    const onChangeInput = (e,setValue) => {
        setValue(e.target.value)
    }

    // if(items.length==0)
    //     return redirect("/")

    return <>
    <Container maxW='1200px'>
        <NavBar navigation={[{link:'/',name:'Inicio',active:true},{link:'/checkout',name:'Checkout',active:true}]} titulo={'Checkout'} />
        <SimpleGrid columns={2} spacing={10}>
        <Flex maxWidth={'600px'} margin={'auto'}>
            <FormControl>
                <FormLabel>Nombre</FormLabel>
                <Input type='text' value={nombre} onChange={(e)=>onChangeInput(e,setNombre)}/>
                <FormLabel>Email</FormLabel>
                <Input type='email' value={email} onChange={(e)=>onChangeInput(e,setEmail)} />
                <FormLabel>Teléfono</FormLabel>
                <Input type='tel' value={telefono} onChange={(e)=>onChangeInput(e,setTelefono)} />
                <Button colorScheme={!isButtonDisabled?'blue':'gray'} mt={10} onClick={handleFinalizar}>Finalizar Compra</Button>
            </FormControl>
        </Flex>
        <Box>
            {items.map((item,index)=>{
                return <Flex key={index} direction={'row'} justify={'space-between'}>
                    <Text>{item.cant}x {item.title.substring(0,60)}</Text>
                    <Text>$ {item.cant*item.price}</Text>
                    </Flex>
            })}
            <Heading as={'h3'} textAlign={'right'}>Total: $ {getTotal()}</Heading>
        </Box>
            
        </SimpleGrid>
    </Container>
    </>
}

export default Checkout