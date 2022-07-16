import { useState, useEffect } from 'react'
import Filtros from './Components/Filtros';
import Header from './Components/Header'
import ListadoGasto from './Components/ListadoGasto';
import Modal from './Components/Modal';
import { generarId } from './Helpers';
import IconoNuevoGasto from './img/nuevo-gasto.svg'


  function App() {

    const [gastos, setGastos] = useState(
      localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
    )

    const [presupuesto, setpresupuesto] = useState(
      localStorage.getItem('presupuesto' ?? 0)
    );
    const [isValidPressupuesto, setisValidPressupuesto] = useState(false);

    const [modal, setModal] = useState(false);
    const [animarmodal, setAnimarmodal] = useState(false);

    const [gastoEditar, setGastoEditar] = useState({})

    const [filtro, setFiltro] = useState('')
    const [gastosFiltrados, setGastosFiltrados] = useState([])

    useEffect(() => {
      if (Object.keys(gastoEditar).length > 0){
          setModal(true)

        setTimeout(() => {
          setAnimarmodal(true)
        }, 500);
      }
    }, [gastoEditar]);

    //Guardar el presupuesto
    useEffect(() => {
      Number(localStorage.setItem('presupuesto', presupuesto ?? 0))
    }, [presupuesto]);

    useEffect(() => {
      const presupuestoLs = Number(localStorage.getItem('presupuesto')) ?? 0
       if(presupuestoLs > 0) {
        setisValidPressupuesto(true)
       }
    }, []);

    //Guardar los gastos
    useEffect(() => {
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos]);

    useEffect(() => {
      if(filtro){
        //Filtrar gasto por categoria 
        const gastoFiltrados = gastos.filter( gasto => gasto.categoria === filtro)
        setGastosFiltrados(gastoFiltrados);
      }
    }, [filtro]);

    const handleNuevoGasto = () => {
      setModal(true)
      setGastoEditar({})

      setTimeout(() => {
        setAnimarmodal(true)
      }, 500);

    }

    const guardarGasto = gasto => {
      if(gasto.id) {
        //Actualizar
        const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
      } else {
        //nuevo gasto
        gasto.id = generarId();
        gasto.fecha = Date.now();
        setGastos([...gastos, gasto]);
      }
      
      

      setAnimarmodal(false)
      setTimeout(() => {
        setModal(false)
      }, 500);
    }

    const eliminarGasto = id => {
      const gastosActualizados = gastos.filter(gasto => gasto.id !== id);
      setGastos(gastosActualizados)
    }

    return (

      <div className={modal ? 'fijar' : ''}>
        <Header
          gastos={gastos}
          setGastos={setGastos}
          presupuesto={presupuesto}
          setpresupuesto={setpresupuesto}
          isValidPressupuesto={isValidPressupuesto}
          setisValidPressupuesto={setisValidPressupuesto}
        />

        {isValidPressupuesto && (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGasto
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />

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
          setModal={setModal}
          animarmodal={animarmodal}
          setAnimarmodal={setAnimarmodal}
          guardarGasto={guardarGasto}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
        />}

      </div>
    )
  }

export default App
