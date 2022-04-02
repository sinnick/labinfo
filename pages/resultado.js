import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
import { File, Document } from 'react-pdf';
import {useState} from 'react';

export async function getServerSideProps(context) {
    const query = context.query

    // const pdf = await fetch(`http://localhost:3000/api/${query.dni}/${query.practica}`)
    // console.log(` fetching http://localhost:3000/api/${query.dni}/${query.practica}`)
    // console.log(pdf)

    
    // console.log(context.query)
    return {
        props: {
            query
        }
    }
}



const resultado = ({ query }) => {

    const [file, setFile] = useState("0100_00000123_17520520_ARENAS  MONICA_14052021.pdf")

    const errr = () => {
        console.log("error")	
    }
    const succc = () => {
        console.log("succcess")	
        console.log(source)	
    }



    let source = `http://localhost:3000/api/${query.dni}/${query.practica}`	



    return (
        <div className="h-screen">
        <div>resultado de: </div>
        <div>DNI:</div>
        <div>{query.dni}</div>
        <div>protocolo:</div>
        <div>{query.practica}</div>
        <div className='bg-red-500 h-100'>
        <Document file={source} onLoadError={errr} onLoadSuccess={succc}/>
        </div>
        </div>
        
    )
}

export default resultado