import { Button, useDisclosure } from "@chakra-ui/react"
import { useCartContext } from "../context/cartContext"
import { DeleteIcon } from "@chakra-ui/icons"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useState } from "react"

const ContadorCarrito = ({item,onClose}) => {
    const {quitarItem,updateTotalItems} = useCartContext()
    const DeleteSwal = withReactContent(Swal)
    const [producto] = useState({...item})

    const handleQuitar = () => {
        DeleteSwal.fire({
            title: 'Atención',
            text: `¿Quiere eliminar el elemento ${item.title} del carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borra'
          }).then((result) => {
            if (result.isConfirmed) {
              quitarItem(producto)
              updateTotalItems()
              onClose()
              Swal.fire(
                'Eliminado!',
                'El producto ya no está más en el carrito',
                'success'
              )
            }
          })
    }

    return <>
        <Button onClick={handleQuitar}>
            <DeleteIcon />
        </Button>
    </>
}

export default ContadorCarrito