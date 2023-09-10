import ItemDetail from "./ItemDetail";
import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
import { Container, Flex } from "@chakra-ui/react";
import Loader from './Loader';
import { firestore } from "../firebase/client";
import { collection, getDocs, where, query } from "firebase/firestore";
import E404 from "./E404";
import { TitleBar } from "./TitleBar";

const ItemDetailContainer = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [navigation,setNavigation] = useState([])
    
    const [item,setItem] = useState({})
    const {idItem} = useParams()

    useEffect(()=>{
        let itemDB = {}
        setIsLoading(true)
        let docsRef = collection(firestore,'productos')
        docsRef = query(docsRef,where("id","==",parseInt(idItem)))
        getDocs(docsRef).then((snap)=>{
            snap.forEach(i=>{
                itemDB = {...i.data()}
                // if(i.data().id==idItem){
                // }
            })
            setItem(itemDB)
            setIsLoading(false)
            setNavigation([{link:'/',name:'Inicio'},{link:`/categoria/${itemDB.category}`,name:itemDB.category},{link:`/item/${itemDB.id}`,name:itemDB.title}])
        })

        return () => {
            setItem({})
        }
    },[]);

    return <>
        <Container maxW='1200px'>
            <TitleBar titulo={item.title} navigation={navigation} />
            
            {isLoading?<Loader />:''}
            {item.length==null?(<Flex maxWidth={'sm'} m={'auto'}>
                    <ItemDetail producto={item} isSingle={true} />
                </Flex>):<E404 />}
        </Container>
    </>
}

export default ItemDetailContainer;