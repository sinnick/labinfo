import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "pdf-worker.js";	

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export async function getServerSideProps(context) {
    const query = context.query
    console.log(query)
    let data  = await fetch(`http://localhost:3000/api/file/${query.dni}/${query.protocolo}`)
    let respuesta = await data.json();
    // console.log({respuesta})
    
    return {
        props: {
            respuesta
        }
    }
}



const resultado = ({ respuesta }) => {
    console.log({respuesta})
    // const [file, setFile] = useState(`http://sinnick.duckdns.org:3000/api/${respuesta.DNI}/${respuesta.PROTOCOLO}`);
    const [file, setFile] = useState(`http://localhost:3000/api/${respuesta.DNI}/${respuesta.PROTOCOLO}`);
    const [numPages, setNumPages] = useState(null);

    function onDocumentLoadSuccess({ numPages: nextNumPages }) {
        setNumPages(nextNumPages);
      }
  

    return (
        <div className="h-screen m-14">
        <div>resultado de: </div>
        <div>DNI: {respuesta.DNI}</div>
        <div>NOMBRE: {respuesta.NOMBRE}</div>
        <div>protocolo: {respuesta.PROTOCOLO}</div>
        <div>
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
        
    )
}

export default resultado