import { Accordion, AccordionItem } from "@chakra-ui/react"

const OrderList = ({items}) => {
    items.map((item,index)=>{
        return <>
            <Accordion key={index} >
                <AccordionItem>{item.cant}x {item.title}: ${item.price*item.cant}</AccordionItem>
            </Accordion>
        </>
    })
}

export default OrderList