import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";


const administracion = () => {

  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
    console.log(user)
    console.log(password)
    user.trim().toLowerCase() === "admin" && password.trim().toLowerCase() === "admin" ? router.push("/administrarlabs") : router.push("/")
    // router.push({
    //   pathname: "/login",
    //   query: {
    //     user: user,
    //     password: password
    //   }
    // })

  }
  

  return (
    <section className=" body-font bg-gray-900 h-screen">
      <div className="container px-5 py-2 md:py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl">Bienvenido a la pagina de administracion de PSLab web</h1>
          <p className="leading-relaxed mt-4">Aca va texto mucho muy importante</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-gray-900 shadow-lg">
          <h2 className="text-xl font-medium title-font mb-5">Iniciar sesion</h2>

          <div className="relative mb-4">
            <label htmlFor="user" className="leading-7 text-sm ">Usuario</label>
            <input 
            type="text" 
            id="user" 
            name="user" 
            className="w-full bg-gray-500  rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            onChange={(e) => setUser(e.target.value)}/>

          </div>

          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm ">Contraseña</label>
            <input 
            type="password" 
            id="password" 
            name="password" 
            className="w-full bg-gray-500 rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" 
            onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button className="text-white font-bold bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mb-4" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
    </section>
  );
}

export default administracion