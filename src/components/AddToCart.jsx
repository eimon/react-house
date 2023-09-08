import { NumberInput,NumberDecrementStepper,NumberInputField,NumberIncrementStepper,NumberInputStepper,Button,ButtonGroup } from "@chakra-ui/react"
import { useCartContext } from "../context/cartContext";
import { useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useProduct from "../hooks/useProduct";

function AddToCart({producto}) {
    const {agregarItem,updateTotalItems} = useCartContext()
    const [valor,setValor] = useState(1)
    const producto_carrito = useProduct(producto)
    const handleDecrement = () => {
      if(valor>1)
        setValor(valor-1)
    }
    const MySwal = withReactContent(Swal)

    const handleAddToCart = () => {
      MySwal.fire({
        icon: 'warning',
        text: `¿Desea agregar ${valor}x ${producto_carrito.title} al carrito?`,
        showCancelButton: true,
        confirmButtonText: 'Agregar',
        cancelButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          agregarItem(producto_carrito,valor)
          Swal.fire('Agregado!', '', 'success')
          setValor(1)
          updateTotalItems()
        }
      })
    }
    
    return <>
        <ButtonGroup spacing='2'>
          <NumberInput value={valor} precision={0} step={1}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper onClick={()=>setValor(valor+1)}/>
              <NumberDecrementStepper onClick={handleDecrement}/>
            </NumberInputStepper>
          </NumberInput>
          <Button colorScheme='blue' fontSize={'10px'} onClick={handleAddToCart}>
            Agregar al carrito
          </Button>
        </ButtonGroup>
    </>
}

export default AddToCart;