import { Link } from 'react-router-dom';
import CarritoWidget from './CarritoWidget';
import { useEffect, useState } from 'react';
import { Flex,Menu, MenuButton, MenuList, MenuItem,Button} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';


export const NavBar = ({logo,handleOnClick}) => {
    const [categorias,setCategorias] = useState([]);
    useEffect(()=>{
        fetch('https://fakestoreapi.com/products/categories')
                .then(res=>res.json())
                .then(json=>setCategorias(json))
    },[])

    return <>
        <Flex position={'sticky'} top={0} zIndex={999} bg={'whitesmoke'} flexDirection={'row'} justifyContent={'space-between'} p={10}>
            <Flex justifyContent={'flex-start'}>
            <Menu>
                <Link to={'/'}>
                    <Button>
                        Inicio
                    </Button>
                </Link>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                    Categorías
                </MenuButton>
                <MenuList>
                    {categorias.map((item,index)=>{
                        return (<Link key={index} to={`/categoria/${item}`} onClick={handleOnClick}><MenuItem>
                                        {item}
                                        </MenuItem>
                                    </Link>
                                )
                    })}
                </MenuList>
                </Menu>
            </Flex>
            <Flex justifyContent={'flex-start-end'}>            
                <CarritoWidget />
            </Flex>
        </Flex>

        
        </>;
};