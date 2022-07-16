import  {useState} from 'react'
import Mensaje from './Mensaje'


const NuevoPreosupuesto = (
  {presupuesto,
  setpresupuesto,
  setisValidPressupuesto}) => {

  const [mensaje, setMensaje] = useState("")

  const handlePresupuesto = (e) => {
    e.preventDefault();
    if(!presupuesto || presupuesto < 0) {
      setMensaje("No es presuouesto valido");
      return;
    }

    setMensaje("");
    setisValidPressupuesto(true);
  }



  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={handlePresupuesto} className='formulario'>
            <div className="campo">
                <label>Definir Presupuesto</label>

                <input 
                type="number" 
                className=' contenedor nuevo-presupuesto'
                placeholder='Añade tu Presupuesto'
                value={presupuesto}
                onChange= {(e) => setpresupuesto(Number(e.target.value))}
                />
            </div>

            <input type="submit"
            value="Añadir"
            />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
       </form>
    </div>
  )
}

export default NuevoPreosupuesto