const fs = require('fs');
import { dbConnect } from 'utils/mongoose';
import Practica from 'models/Practica';

export default async function (req, res) {

    const destino = process.env.ENV === 'dev' ? 'C:/Users/Fernando/Desktop/code/labinfo/pdf' : '/root/labinfo/pdf';

    switch (req.method) {
        case "POST":
            console.log("POST pdf");
            let respuesta = await JSON.parse(req.body);
            let pathpdf = `${destino}/${respuesta.filename}`;
            // console.log({ respuesta })
            try {
                console.log('voy a intentar guardar el pdf en ', pathpdf);
                fs.writeFileSync(pathpdf, respuesta.pdf, 'base64');
                let data = await sincronizar();
                res.status(200).send({ status: 'ok', mensaje: 'pdf guardado en server LabInfo', data: data });
            }
            catch (error) {
                console.log('error al sincronizar', error);
                res.status(500).json(error);
            }
            break;
        default:
            res.status(405).json({ status: "error", mensaje: "metodo no permitido" });
            break;
    }





    async function sincronizar() {
        console.log('sincronizando');
        dbConnect();
        const files = fs.readdirSync('pdf', { withFileTypes: false });
        let data;
        for (let file of files) {
            if (file.endsWith('.pdf') || file.endsWith('.PDF')) {
                console.log('trabajando con archivo:', file)
                let laboratorio = file.split('_')[0];
                let protocolo = file.split('_')[1];
                let dni = file.split('_')[2];
                let nombre = file.split('_')[3];
                let fecha_informe = await getFechaInforme(file.split('_')[4]);
                let fecha_creacion = new Date();
                let fecha_eliminacion = await getFechaEliminacion(fecha_creacion);
                let regexlaboratorio = /^[0-9]{4}$/;
                let regexprotocolo = /^[0-9]{8}$/;
                
                if (regexlaboratorio.test(laboratorio) && regexprotocolo.test(protocolo)) {
                    let practica = ({
                        "FILENAME": file,
                        "LABORATORIO": laboratorio,
                        "PROTOCOLO": protocolo,
                        "DNI": dni,
                        "NOMBRE": nombre,
                        "FECHA_INFORME": fecha_informe,
                        "FECHA_CREACION": fecha_creacion,
                        "FECHA_ELIMINACION": fecha_eliminacion,
                        "VISTO": false,
                        "DESCARGADO": false,
                    });
                    const query = { "PROTOCOLO": protocolo, "DNI": dni, "LABORATORIO": laboratorio };
                    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
                    Practica.findOneAndUpdate(query, practica, options, (err, result) => {
                        if (err) {
                            console.log('error al updatear protocolo');
                        } else {
                            console.log('protocolo UPDATEADO', result.FILENAME);
                            data = result.FILENAME;
                        }
                    });
                } else {
                    console.log('archivo no valido por formato', file);
                }
            } else {
                console.log('no es un archivo pdf', file)
            }
        }
        return data;
    }


    async function getFechaInforme(fechaInforme) {
        let fechaInformeArray = fechaInforme.replace('.pdf', '').split('');
        let day = fechaInformeArray[0] + fechaInformeArray[1];
        let preMonth = fechaInformeArray[2] + fechaInformeArray[3];
        let year = fechaInformeArray[4] + fechaInformeArray[5] + fechaInformeArray[6] + fechaInformeArray[7];
        let month = parseInt(preMonth) - 1;

        // let fechaInformeConGuiones = fechaInformeArray.slice(0, 2).join('') + '-' + fechaInformeArray.slice(2, 4).join('') + '-' + fechaInformeArray.slice(4, 8).join('');

        let DateFechaInforme = new Date(year, month, day);
        return DateFechaInforme;
    }

    async function getFechaEliminacion(fecha_creacion) {
        let month = fecha_creacion.getMonth();
        let year = fecha_creacion.getFullYear();
        let day = fecha_creacion.getDate() + 1;
        month == 11 ? month = 0 : month = month + 1;
        let DateFechaEliminacion = new Date(year, month, day);
        console.log(fecha_creacion)
        console.log(DateFechaEliminacion)
        return DateFechaEliminacion;
    }
}