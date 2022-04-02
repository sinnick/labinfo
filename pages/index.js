import DarkmodeToggle from "./components/DarkmodeToggle";
import { useTheme } from "next-themes";
import Titulo from "./components/Titulo";
import ComponenteLaboratorios from "./components/ComponenteLaboratorios";
import { useState } from "react";
import { useRouter } from "next/router";

//!remover
export async function getServerSideProps() {
  const laboratorios = await fetch('http://localhost:3000/api/laboratorios')
  const laboratoriosJson = await laboratorios.json()
  console.log({ laboratoriosJson })
  return {
    props: {}
  }

}
//! remover


const index = () => {

  const router = useRouter();


  const { theme, setTheme } = useTheme();
  const [dni, setDni] = useState("");
  const [protocolo, setProtocolo] = useState("");


  const handleBuscar = () => {
    console.log(dni)
    console.log(protocolo)
    router.push({
      pathname: "/resultado",
      query: {
        dni: dni,
        protocolo: protocolo
      }
    })

  }

  return (

    <div className="flex flex-col items-center justify-center min-w-min min-h-screen">
      <DarkmodeToggle theme={theme} />
      {/* <Head>
        <title>InfoLab</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main className="flex flex-col items-center justify-center mt-8 content-around">
        <h1 className="text-6xl font-bold">
          Bienvenido a <b className="text-red-600">InfoLab</b>
        </h1>

        <p className="mt-3 text-2xl">Informes de Laboratorio Online de PSLab</p>

        <div className="mt-24 w-4/5">
          <div className=" flex items-center border-2  border-red-500 rounded-xl justify-between">
            <h4 className="w-3/5 rounded-l-lg bg-red-500   font-bold uppercase text-md py-2 text-center border-2 border-red-500 ">
              Seleccione el Laboratorio
            </h4>
            <ComponenteLaboratorios />
          </div>
        </div>

        <div className="mt-10 w-4/5">
          <div className=" flex items-center justify-between  rounded-xl border-red-500 border-2">
            <input
              type="number"
              className="rounded-l-lg py-2 w-3/5 font-bold  bg-transparent focus:outline-none text-center uppercase text-md"
              placeholder="..."
              onChange={(e) => setDni(e.target.value)}
            />
            <Titulo label={'Numero de DNI'} />
          </div>
        </div>

        <div className="mt-10 w-4/5">
          <div className=" flex items-center justify-between  rounded-xl border-red-500 border-2">
            <input
              type="number"
              className="rounded-l-lg py-2 w-3/5 font-bold  bg-transparent  focus:outline-none text-center uppercase text-md"
              placeholder="..."
              onChange={(e) => setProtocolo(e.target.value)}
            />
            <Titulo label={'Numero de practica'} />
          </div>
        </div>


        <div className="mt-10 w-4/5">
          <div className=" flex items-center justify-between  rounded-xl border-red-500 border-2">

            <button className="rounded-r-lg bg-red-500  font-bold py-2 w-full uppercase border-red-500 border-2 text-md" onClick={handleBuscar}>
              Buscar
            </button>
          </div>
        </div>

        {/* <div className="bg-green-400 py-14 px-64 mb-6 mt-32 ">publicidad</div> */}
        <div className="flex">
          <button className="w-1/3 rounded-lg mx-6 mt-20 bg-red-500   font-bold p-2 uppercase">
            Administracion
          </button>
          <button className="w-1/3 rounded-lg mx-6 mt-20 bg-red-500   font-bold p-2 uppercase">
            Cargar Protocolo
          </button>
          <button className="w-1/3 rounded-lg mx-6 mt-20 bg-red-500   font-bold p-2 uppercase">
            Asociarse a InfoLab
          </button>
          <button className="w-1/3 rounded-lg mx-6 mt-20 bg-red-500   font-bold p-2 uppercase">
            Contacto
          </button>
        </div>
      </main>

      {/* <footer className="flex flex-wrap flex-col bg-red-500 p-3 flex-shrink-0 w-full text-center bottom-0 relative mt-auto">
        <p>© InfoLab 2021</p>
      </footer> */}
    </div>

  );
}

export default index;