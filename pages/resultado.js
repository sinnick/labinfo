import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "pdf-worker.js";
import Practica from "models/Practica"
import { dbConnect } from "utils/mongoose"


pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export async function getServerSideProps(context) {
  dbConnect();
  const query = context.query
  console.log({query})
  // let data = await fetch(`http://localhost:3000/api/file/${query.dni}/${query.protocolo}`)
  let resp = await Practica.findOne({ "PROTOCOLO": query.protocolo, "DNI": query.dni });
  let respuesta = JSON.parse(JSON.stringify(resp))
  // console.log({resp})
  // console.log({data})
  console.log({respuesta})
  
  
  
  return {
    props: {
      respuesta
    }
  }
  // let resp = await Practica.findOne({ "PROTOCOLO": query.protocolo, "DNI": query.dni });
  // console.log('resppppppppppppp', resp)
  // let respuesta = await resp.json();



}



const resultado = ({ respuesta }) => {
  console.log({ respuesta })
  const [file, setFile] = useState(`/api/${respuesta.DNI}/${respuesta.PROTOCOLO}`);
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  async function handleDownload () {
    let resp = await fetch(`/api/${respuesta.DNI}/${respuesta.PROTOCOLO}`)
    let data = await resp.blob()
    console.log({data})
    const file = new Blob([data], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
  

  return (
    <div className="text-gray-400 bg-gray-900 p-64 -m-64 lg:p-0 lg:m-0">
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-12 mx-auto">
          <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
            <h1 className="flex-grow sm:pr-16 text-xl font-medium title-font text-white">{respuesta.NOMBRE} - {respuesta.DNI}</h1>
            <button className=" mx-2 flex-shrink-0 text-gray-900 font-bold bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg mt-10 sm:mt-0" onClick={handleDownload}>Descargar</button>
          </div>
          <div className="lg:flex lg:justify-center mt-12 mx-auto">
            <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: numPages }, (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  renderAnnotationLayer={false}
                  renderTextLayer={false}
                />
              ))}
            </Document>
          </div>
        </div>
      </section>
    </div>
  )
}

export default resultado