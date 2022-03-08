export const getServerSideProps = async (ctx) => {
    const laboratorios = await fetch ('http://localhost:3000/api/laboratorios')
    const laboratoriosJson = await laboratorios.json()
    console.log({laboratoriosJson})
    return {
        props: {
            laboratoriosJson
        }
    }
  
}

//!no me muestra los laboratorios en la consola, pero si deberia


const ComponenteLaboratorios =  ({laboratoriosJson}) => {
    console.log(laboratoriosJson)
  

    return (
        <select className="font-bold uppercase text-center w-2/5 text-md py-2 rounded-r-lg bg-transparent focus:outline-none">


            <option key={1} value={1} className="text-red-500 font-black py-2 my-2">{1}</option>
            <option key={2} value={2} className="text-red-500 font-black py-2 my-2">{2}</option>
            <option key={3} value={3} className="text-red-500 font-black py-2 my-2">{3}</option>


        </select>
    )
}

export default ComponenteLaboratorios