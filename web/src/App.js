import React, { useState, useEffect } from 'react';
import api from "./services/api"; 

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './Components/DevForm';
import DevItem from './Components/DevItem';


//Componente: E um bloco isolado de HTML, CSS e JS, o qual interfere no restante da aplicação.
//Propiedade: Informações que o componente PAI passa para o Componente FILHO. Nesse caso os "title"
//Estado: Informações mantidas pelo componente (Lembrar do conceito de Imutabilidade)

function App() {
  const [devs, setDevs] = useState([]);
  
  useEffect(() => {
    async function loadDevs(){
      const response = await api.get("/devs");
      setDevs(response.data);
    }

    loadDevs();
  },[]);

////////////////////////////////////////////////
  async function handleAddDev(data){
    const response = await api.post("/devs", data)
    setDevs([...devs, response.data]);
  }
///////////////////////////////////////////////////
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          { devs.map(dev => (
            <DevItem dev={ dev }key={dev._id } />
          ))}
        </ul>
      </main>
    </div>
    );
  }
  
export default App;
