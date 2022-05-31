import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const administracion = () => {

  const router = useRouter();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = () => {
      fetch(`/api/usuario/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario: user,
          password: password
        })
      })
        .then(async res => {
          if (res.status === 200) {
            let body = await res.json();
            console.log({body})
            if (body.admin) {
              toast.success("Bienvenido", body.nombre)
              setTimeout(() => {
                router.push({
                  pathname: "/admingeneral",
                })
              }, 2000);
            } else {
            localStorage.setItem("laboratorio", body.laboratorio);
            toast.success("Bienvenido", body.nombre)
            setTimeout(() => {
              router.push("/administrarlaboratorio")
            }, 2000);
            }
          } else {
            toast.error("Usuario o contraseña incorrectos")
            document.getElementById("user").value = ""
            document.getElementById("password").value = ""
          }
        })
        .catch(err => {
          toast.error("Error general")
        })
  }


  return (
    <section className=" body-font bg-gray-900 h-screen">
      <div className="container px-5 py-2 md:py-24 mx-auto flex flex-wrap items-center mt-8">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">Administración de LabInfo</h1>
          <p className="leading-relaxed mt-4 text-white">Ingrese Usuario y Contraseña de su Laboratorio para ver los Protocolos enviados a la Web. Recuerde que los mismos estarán disponibles en la Web durante 30 días a partir de su envío, según el plan contratado.</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-800 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 shadow-gray-900 shadow-lg">
          <h2 className="text-xl font-medium title-font mb-5 text-white">Iniciar sesion</h2>

          <div className="relative mb-4">
            <label htmlFor="user" className="leading-7 text-sm text-white">Usuario</label>
            <input
              type="text"
              id="user"
              name="user"
              className="w-full bg-gray-700  rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base text-white outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setUser(e.target.value)}
              //on key down focus password input
              onKeyDown={(e) => e.keyCode === 13 ? document.getElementById("password").focus() : null}
            />

          </div>

          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-white">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full bg-gray-700 rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base text-white outline-none  py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.keyCode === 13 && handleLogin()}
            // onKeyDown={(e) => console.log(e.keyCode)}
            />
          </div>
          <button className="text-white font-bold bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mb-4" onClick={handleLogin}>Entrar</button>
        </div>
      </div>
      <ToastContainer
                  theme="dark"
                  position="bottom-center"
                  autoClose={1500}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={true}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
    </section>
  );
}

export default administracion