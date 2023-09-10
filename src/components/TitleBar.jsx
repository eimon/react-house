import { Link } from 'react-router-dom';
import { Flex,Heading, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';


export const TitleBar = ({logo,titulo,navigation}) => {
    return <>
        <Heading textAlign={'center'} mt={10}>{titulo??'Tiendita'}</Heading>
        <Flex justify={'center'}>
            <Breadcrumb spacing='8px' mb={10} separator={<ChevronRightIcon color='gray.500' fontSize='sm' />}>
                {navigation.map((nav,index)=>{
                    return (
                    <BreadcrumbItem key={index}>
                        <BreadcrumbLink as={Link} to={nav.link}>{nav.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                )})}
            </Breadcrumb>
        </Flex>
        </>;
};