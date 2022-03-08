import React from 'react'

const Buscar = () => {

const handleBuscar = () => {
    console.log('buscar')
}


    return (
        <button className="rounded-r-lg bg-red-500  font-bold py-2 w-full uppercase border-red-500 border-2 text-md" onClick={handleBuscar}>
        Buscar
      </button>
    )
}

export default Buscar
