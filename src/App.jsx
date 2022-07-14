import { useState } from 'react'
import Header from './Components/Header'
import ListadoGasto from './Components/ListadoGasto';
import Modal from './Components/Modal';
import { generarId } from './Helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [presupuesto, setpresupuesto] = useState(0);
  const [isValidPressupuesto, setisValidPressupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarmodal, setAnimarmodal] = useState(false);

  const [gastos, setGastos] = useState([])

  const handleNuevoGasto =  () =>{
    setModal(true)

    setTimeout(() => {
      setAnimarmodal(true)
    }, 500);

  }

  const guardarGasto = gasto => {
    gasto.id = generarId();
    gasto.fecha =Date.now();
    setGastos([...gastos, gasto]);

    setAnimarmodal(false)

        setTimeout(() => {
          setModal(false)
        }, 500);
  }

  return (
    
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto = {presupuesto}
        setpresupuesto ={setpresupuesto}
        isValidPressupuesto = {isValidPressupuesto}
        setisValidPressupuesto ={setisValidPressupuesto}
      />

      {isValidPressupuesto && (
        <>
        <main>
        <ListadoGasto gastos={gastos}/>
        </main>
          <div className='nuevo-gasto'>
          <img 
              src={IconoNuevoGasto} 
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
          />
         </div>
      </>
          
      )}

    
      {modal && <Modal
        setModal = {setModal}
        animarmodal = {animarmodal}
        setAnimarmodal = {setAnimarmodal}
        guardarGasto = {guardarGasto}
      /> }

    </div>
  )
}

export default App
