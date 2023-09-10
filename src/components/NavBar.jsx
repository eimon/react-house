import { Link } from 'react-router-dom';
import CarritoWidget from './CarritoWidget';
import { useEffect, useState } from 'react';
import { Flex,Menu, MenuButton, MenuList, MenuItem,Button} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebase/client';


export const NavBar = ({logo}) => {
    const [categorias,setCategorias] = useState([]);
    useEffect(()=>{
        const catAdd = []
        const categoriasRef = collection(firestore,'categorias')
        getDocs(categoriasRef).then(catSnap=>{
            catSnap.forEach(cat=>catAdd.push(cat.data()))
            setCategorias(catAdd)
        })
        
        return () => {
            setCategorias([])
        }
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
                    {console.log(categorias[0])}
                    {categorias?.map((item,index)=>{
                        return (<Link key={index} to={`/categoria/${item.name}`}><MenuItem>
                                        {item.name}
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