import { useState } from "react"
import { useRouter } from "next/router"
import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";

export async function getServerSideProps(req) {
  dbConnect();
  const { id } = req.query
  const usuario = await Usuario.findById(id);
  const usuarioJson = JSON.parse(JSON.stringify(usuario));

  return {
    props: { usuarioJson }
  }

}

const user = ({ usuarioJson }) => {

  const router = useRouter()

  const handleNuevoUser = (e) => {
    e.preventDefault();
    fetch(`/api/usuario/nuevo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        USUARIO,
        PASSWORD,
        NOMBRE,
        APELLIDO,
        EMAIL,
        HABILITADO,
        LABORATORIO,
        ADMIN
      })
    })
    console.log()
    alert('Usuario cargado: ' + NOMBRE)
    router.push("/administrarusuarios")

  }

  const [USUARIO, setUSUARIO] = useState("");
  const [PASSWORD, setPASSWORD] = useState("");
  const [NOMBRE, setNOMBRE] = useState("");
  const [APELLIDO, setAPELLIDO] = useState("");
  const [EMAIL, setEMAIL] = useState("");
  const [LABORATORIO, setLABORATORIO] = useState("");
  const [HABILITADO, setHABILITADO] = useState(true);
  const [ADMIN, setADMIN] = useState(false);



  console.log({ usuarioJson })
  return (
    <div className="bg-gray-900">

    <div className="mx-auto max-w-7xl bg-gray-900 p-16 min-h-screen min-w-screen">
      <form>
        <div className="grid gap-6 mb-6 lg:grid-cols-2">
          <div>
            <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">USUARIO</label>
            <input value={USUARIO} onChange={(e) => setUSUARIO(e.target.value)} type="text" id="usuario" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">PASSWORD</label>
            <input value={PASSWORD} onChange={(e) => setPASSWORD(e.target.value)} type="text" id="pasword" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="nombre" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Nombre</label>
            <input value={NOMBRE} onChange={(e) => setNOMBRE(e.target.value)} type="text" id="nombre" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="apellido" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">APELLIDO</label>
            <input value={APELLIDO} onChange={(e) => setAPELLIDO(e.target.value)} type="text" id="apellido" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">email</label>
            <input value={EMAIL} onChange={(e) => setEMAIL(e.target.value)} type="text" id="email" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>
          <div>
            <label htmlFor="laboratorio" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">laboratorio</label>
            <input value={LABORATORIO} onChange={(e) => setLABORATORIO(e.target.value)} type="number" id="laboratorio" className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
          </div>          
          <div>
            <label htmlFor="habilitado" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">HABILITADO</label>
            <select id="habilitado"  onChange={(e) => setHABILITADO(e.target.value)} className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="true">SI</option>
              <option value="false">NO</option>
            </select>
          </div>
          <div>
            <label htmlFor="ADMIN" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">ADMIN</label>
            <select id="ADMIN"  onChange={(e) => setADMIN(e.target.value)} className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
              <option value="false">NO</option>
              <option value="true">SI</option>
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center w-full">
          <button type="submit" className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-2/5 px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-800 dark:focus:ring-gray-100 m-6" onClick={handleNuevoUser}>Nuevo</button>
        </div>
      </form>
    </div>
    </div>

  )
}

export default user