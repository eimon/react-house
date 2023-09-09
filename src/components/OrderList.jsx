import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Card, Flex, Text } from "@chakra-ui/react"
import { useCartContext } from "../context/cartContext";


const OrderList = ({orden}) => {
        return <Card p={10}>
            {console.log(orden)}
            <Text>Comprador: {orden.comprador.nombre}</Text>
            <Text>Fecha: {orden.fecha}</Text>
            <Accordion allowToggle>
                <AccordionItem>
                <h2>
                <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                    Items
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    {orden.items.map((item,index)=>{
                        return <Flex key={index} justify={'space-between'}>
                                    <Text>{item.cant}x {item.title}</Text><Text>${item.price*item.cant}</Text>
                                </Flex>
                    })}
                </AccordionPanel>
            </AccordionItem>
            </Accordion>
            <Text as={'span'} textAlign={'right'}>Total: ${orden.total}</Text>
        </Card>
}

export default OrderList