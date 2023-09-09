// import { Link } from 'react-router-dom';
import { Badge, Box, useDisclosure,Button,Modal,ModalOverlay,ModalContent,ModalHeader,ModalFooter,ModalBody,ModalCloseButton,Text, Divider, Flex,NumberInput,NumberDecrementStepper,NumberInputField,NumberIncrementStepper,NumberInputStepper } from '@chakra-ui/react';
import { useCartContext } from '../context/cartContext';
import ContadorCarrito from './ContadorCarrito';
import { Link } from 'react-router-dom';

const CarritoWidget = (() => {
    const { items, getTotal, total } = useCartContext()
    const { isOpen, onOpen, onClose } = useDisclosure()

    return <><Box display="flex" alignItems="center" bgColor="#f0f0f0">
                <Button onClick={onOpen} display="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    <Badge borderRadius="full" px="2" colorScheme="teal">{total}</Badge>
                </Button>
           </Box>
           <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Carrito</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {items.map((item,index)=>{
                        return (<Flex key={index}>
                                    <Text>{item.cant}x {item.title.substring(0,40)}</Text>
                                    <ContadorCarrito item={item} onClose={onClose} />
                                    <Text align="right">${item.cant*item.price}</Text>
                                </Flex>)
                    })}
                    <Divider />
                    <Text align="right" fontWeight="600">${getTotal()}</Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cerrar
                    </Button>
                    {getTotal()>0?<Button variant='ghost' as={Link} to={'/checkout'} >Finalizar Compra</Button>:''}
                </ModalFooter>
                </ModalContent>
            </Modal>
           </>;
});

export default CarritoWidget;