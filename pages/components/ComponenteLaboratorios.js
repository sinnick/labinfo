const ComponenteLaboratorios =  ({laboratoriosJson}) => {
    console.log('dentro del componente', laboratoriosJson)
    
    return (
        <select className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-2.5 px-3 leading-8 transition-colors duration-200 ease-in-out" required>
            <option value="">SELECCIONE UN LABORATORIO</option>
        {laboratoriosJson.map(laboratorio => {
            return (
                <option key={laboratorio._id} value={laboratorio._id} className="text-red-500 font-black py-2 my-2">{laboratorio.NOMBRE}</option>
        )})}

        </select>
    )
}

export default ComponenteLaboratorios