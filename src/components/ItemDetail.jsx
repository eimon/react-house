import { Link } from "react-router-dom";
import { Image, Card,CardBody,CardFooter,Heading,Text,Stack, Tooltip, Box } from "@chakra-ui/react";
import AddToCart from "./AddToCart";
import { StarIcon } from "@chakra-ui/icons";

const ItemDetail = ({ producto, isSingle=false }) => {

  return (
    
    <Card maxW='sm'>
      <CardBody>
        <Image src={producto.image} alt={producto.title} borderRadius='lg' height="200px" m="auto" />
        <Stack mt='6' spacing='3'>
          <Heading size='md'><Link to={`/item/${producto.id}`}>{producto.title}</Link></Heading>
          <Text>{isSingle?producto.description:producto.description.substring(0,100)}</Text>
          {isSingle?(<Tooltip label={producto.rating?.count+' votos'} aria-label='A tooltip'>
            <Box p={1} w={'50px'}><StarIcon /> { producto.rating?.rate }</Box>
            </Tooltip>):''}
          <Text color='blue.600' fontSize='2xl'>
            ${producto.price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
        <AddToCart producto={producto} />
      </CardFooter>
    </Card>
  );
};

export default ItemDetail;
