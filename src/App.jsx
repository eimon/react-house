// import { useState } from 'react';
import './App.css';
import {NavBar} from './components/NavBar';
import {Carrito} from './components/Carrito';
import {ItemListContainer} from './components/ItemListContainer';
import reactLogo from './assets/react.svg'

function App() {
  const categorias = ['categoria 1','categoria 2','categoria 3','categoria 4'];

  return <>
      <NavBar items={categorias} logo={reactLogo}><Carrito /></NavBar>
      <ItemListContainer greeting="Bienvenidos!" />
  </>;
}

export default App
