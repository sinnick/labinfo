import ComponenteLaboratorios from "./components/ComponenteLaboratorios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import logo from "../assets/log.png";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export async function getServerSideProps() {
  const laboratorios = await fetch('http://localhost:80/api/laboratorios')
  const laboratoriosJson = await laboratorios.json()
  console.log('index.js laboratoriosJson: ', laboratoriosJson)

  return {
    props: { laboratoriosJson }
  }

}
const index = ({ laboratoriosJson }) => {

  const router = useRouter();


  // const { theme, setTheme } = useTheme();
  const [dni, setDni] = useState('');
  const [protocolo, setProtocolo] = useState('');

  const checkDNI = (caracter) => {
    if (((caracter*1) / (caracter*1) === 1) && (caracter*1) > 0) {
      setDni(caracter);
    }
  }
  const checkProtocolo = (caracter) => {
    if (((caracter*1) / (caracter*1) === 1) && (caracter*1) > 0) {
      setProtocolo(caracter);
    }
  }


  const handleBuscar = () => {
    // console.log(dni)
    // console.log(protocolo)
    // console.log(`fetching http://sinnick.duckdns.org:3000/api/${dni || 0}/${protocolo || 0}`)
    fetch(`/api/${dni || 0}/${protocolo || 0}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(res => {
        if (res.status === 200) {
          console.log('archivo encontrado, ', res)
          toast.success("Protocolo encontrado", res.NOMBRE)
          setTimeout(() => {
            router.push({
              pathname: "/resultado",
              query: {
                dni: dni,
                protocolo: protocolo
              }
            })
          }, 3000);
        } else {
          toast.error("No se encontro el protocolo")
        }
      })
      .catch(err => {
        toast.error("No se encontro el protocolo")
        console.log(err)
      })


  }

  return (
    <section className="text-gray-400 bg-gray-900 body-font h-screen ">
      <Head>
        <title>Lab Info</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto flex flex-col px-5 pt-8 justify-center items-center">

        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          {/* <h1 className="title-font sm:text-4xl text-3xl mb-2 font-medium text-white">Bienvenido a <b className="text-red-500"> LABINFO </b></h1>
          <p className="mb-8 leading-relaxed">Informes de Laboratorio Online de PSLab</p> */}
          <div className="w-2/3 md:w-4/5 lg:w-2/5">
            <Image src={logo} alt="logo" width={4125} layout="intrinsic" />

          </div>
          <div className="flex w-full justify-center items-center">
            <div className="relative mr-4 lg:w-full xl:w-1/2 w-4/5 md:w-full text-center">
              <p className="text-md mt-8 text-gray-300 mb-6 w-full">Por favor, ingrese sus datos</p>



              <form>
                <div className="grid gap-6 mb-6">
                  <div>
                    <ComponenteLaboratorios laboratoriosJson={laboratoriosJson} />
                  </div>

                  <div>
                    <input
                      type="text"
                      id="dni"
                      className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="DNI"
                      onChange={(e) => checkDNI(e.target.value)}
                      onKeyDown={(e) => {
                        e.keyCode === 13 ? document.getElementById("protocolo").focus() : null;
                        (e.keyCode === 8 && dni.length == 1) ? setDni('') : null;
                        }}
                      required
                      value={dni}
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      id="protocolo"
                      className="w-full bg-gray-800 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-red-900 focus:bg-transparent focus:border-red-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="PROTOCOLO"
                      onChange={(e) => checkProtocolo(e.target.value)}
                      onKeyDown={(e) => {
                        e.keyCode === 13 ? handleBuscar() : null;
                        (e.keyCode === 8 && protocolo.length == 1) ? setProtocolo('') : null;
                        }}
                      required
                    />

                  </div>
                </div>

              </form>

              <button className="rounded-md text-white bg-red-500  font-bold py-2 w-full uppercase text-md" onClick={handleBuscar}>
                Buscar &#128270;
              </button>

              <div className="flex flex-wrap mt-24 ">

                <Link href="/administracion">
                  <button className="rounded-md text-white bg-red-500  font-bold py-2 w-1/3 uppercase border-red-500 text-sm ml-auto mr-5">

                    &#128274; Admin
                  </button>
                </Link>
                <ToastContainer
                  theme="dark"
                  position="bottom-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={true}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>



            </div>
          </div>

        </div>
      </div>
    </section>)
}

export default index;