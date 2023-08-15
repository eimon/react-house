import { Link } from 'react-router-dom';
import './App.css';
import Carrito from './components/Carrito';
import { NavBar } from './components/NavBar';
import { useEffect, useState } from 'react';
import ItemListContainer from './components/ItemListContainer';


function App() {
  const [categorias,setCategorias] = useState([]);
  useEffect(()=>{
    fetch('https://fakestoreapi.com/products/categories')
            .then(res=>res.json())
            .then(json=>setCategorias(json))
  },[])
  return <>
      <NavBar items={categorias}><Carrito></Carrito></NavBar>
      <ItemListContainer title='Tiendita'></ItemListContainer>
  </>;
}

export default App
