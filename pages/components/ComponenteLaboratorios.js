const ComponenteLaboratorios =  ({laboratoriosJson}) => {
    console.log('dentro del componente', laboratoriosJson)
    
    return (
        <select className="font-bold uppercase text-center w-2/5 text-md py-2 rounded-r-lg bg-transparent focus:outline-none">

        {laboratoriosJson.map(laboratorio => {
            return (
                <option key={laboratorio._id} value={laboratorio._id} className="text-red-500 font-black py-2 my-2">{laboratorio.NOMBRE}</option>
        )})}

        </select>
    )
}

export default ComponenteLaboratorios