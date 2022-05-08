import DarkmodeToggle from "./components/DarkmodeToggle";
import { useTheme } from "next-themes";
import Titulo from "./components/Titulo";
import ComponenteLaboratorios from "./components/ComponenteLaboratorios";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";


export async function getServerSideProps() {
  const laboratorios = await fetch('http://localhost:3000/api/laboratorios')
  const laboratoriosJson = await laboratorios.json()
  console.log('index.js laboratoriosJson: ', laboratoriosJson)

  return {
    props: { laboratoriosJson }
  }

}
const index = ({ laboratoriosJson }) => {

  const router = useRouter();


  // const { theme, setTheme } = useTheme();
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
    <section class="text-gray-400 bg-gray-900 body-font h-screen">
      <div class="container mx-auto flex flex-col px-5 py-12 justify-center items-center lg:py-24">

        <div class="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-2 font-medium text-white">Bienvenido a <b className="text-red-500"> INFOLAB </b></h1>
          <p class="mb-8 leading-relaxed">Informes de Laboratorio Online de PSLab</p>
          <div class="flex w-full justify-center items-center">
            <div class="relative mr-4 lg:w-full xl:w-1/2 w-4/5 md:w-full text-center">
              <p class="text-sm mt-12 text-gray-500 mb-6 w-full">Por favor, ingrese sus datos</p>



              <form>
                <div className="grid gap-6 mb-6">
                  <div>
                    <ComponenteLaboratorios laboratoriosJson={laboratoriosJson} />
                  </div>

                  <div>
                    <input
                      type="number"
                      className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="DNI"
                      onChange={(e) => setDni(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="PROTOCOLO"
                      onChange={(e) => setProtocolo(e.target.value)}
                      required
                    />

                  </div>
                </div>

              </form>

              <button className="rounded-md text-white bg-red-500  font-bold py-2 w-full uppercase text-md" onClick={handleBuscar}>
                Buscar
              </button>

              <div className="flex flex-wrap mt-24 justify-center">

                <Link href="/administracion">
                  <button className="rounded-md text-white bg-red-500  font-bold py-2 w-1/3 uppercase border-red-500 text-sm mx-auto">
                    Admin
                  </button>
                </Link>
                <Link href="/contacto">
                  <button className="rounded-md text-white bg-red-500  font-bold py-2 w-1/3 uppercase border-red-500 text-sm mx-auto">
                    Contacto
                  </button>
                </Link>
              </div>



            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default index;