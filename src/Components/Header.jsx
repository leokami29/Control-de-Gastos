import React from 'react'
import ControlPresupuesto from './ControlPresupuesto'
import NuevoPreosupuesto from './NuevoPreosupuesto'


const Header = (
  { presupuesto,
  setpresupuesto,
  isValidPressupuesto, 
  setisValidPressupuesto,
  gastos}) => {
  return (
    <header>
        <h1>Planificador de gastos</h1>

        {isValidPressupuesto ?(
          <ControlPresupuesto
            gastos={gastos}
            presupuesto = {presupuesto}
          />
        ) : (
            <NuevoPreosupuesto
              presupuesto = {presupuesto}
              setpresupuesto ={setpresupuesto}
              setisValidPressupuesto ={setisValidPressupuesto}
        />
        )}
        
    </header>
  )
}

export default Header