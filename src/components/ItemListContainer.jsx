import { useEffect, useState } from 'react';
import ItemDetailContainer from './ItemDetailContainer';

const ItemListContainer = ({title}) => {

    useEffect(()=>{
        window.addEventListener("rezise",(event)=>{
            console.log(event);
        })
    },[])

    const [esVocal, setEsVocal] = useState(false)

    const vocales = ['a','e','i','o','u']

    const handleKeyDown = event => {
        console.log('Evento onKeyDown ',event)
        const {key} = event
        console.log('Tecla: ',key)
        setEsVocal(vocales.some(vocal=>vocal===key))
        console.log('Es vocal? ',esVocal)
        if (esVocal)
            event.preventDefault()
    }
    return <>
        <main className="container m-5">
            <h1>{title}</h1>
            <form>
                <label>
                    Un input: <input type="text" onKeyDown={handleKeyDown} />
                </label>
            </form>
            <ItemDetailContainer />
        </main>
    </>;
};

export default ItemListContainer;