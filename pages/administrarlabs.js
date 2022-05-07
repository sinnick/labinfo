export async function getServerSideProps() {
    const laboratorios = await fetch('http://localhost:3000/api/laboratorios')
    const laboratoriosJson = await laboratorios.json()
    console.log('index.js laboratoriosJson: ', laboratoriosJson)

    return {
        props: { laboratoriosJson }
    }

}

const administrarlabs = ({ laboratoriosJson }) => {
    console.log('DENTRO DE adminstrar LABS : ', laboratoriosJson)
    return (
        <div className="items-center justify-center min-w-min min-h-screen">
            {/* <ul> */}

            {laboratoriosJson.map(laboratorio => {
                return (
                    <div className="flex-wrap justify-center">

                        <div className="bg-zinc-800 text-zinc-400 font-bold p-4 m-3 items-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 rounded justify-between">
                            <h4 className="text-left">Nombre: <span className="text-red-500">{laboratorio.NOMBRE}</span></h4>
                            <h4 className="text-left">Descripcion: <span className="text-red-500">{laboratorio.DESCRIPCION}</span></h4>
                            <h4 className="text-left">Estado:<span className="text-red-500">{laboratorio.ESTADO}</span></h4>
                            <h4 className="text-left">FECHA_DE_PAGO:<span className="text-red-500">{laboratorio.FECHA_DE_PAGO}</span></h4>
                            <h4 className="text-left">FECHA_DE_EXPIRACION:<span className="text-red-500">{laboratorio.FECHA_DE_EXPIRACION}</span></h4>
                            <button className="text-white bg-red-500 border-0 py-1 px-3 focus:outline-none hover:bg-red-600 rounded text-lg mb-2 mt-4 ">Editar</button>
                        </div>

                    </div>



                )
            })}

            {/* </ul> */}
        </div>
    )
}

export default administrarlabs