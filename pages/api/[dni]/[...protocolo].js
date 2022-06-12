const fs = require('fs');
import { dbConnect } from "utils/mongoose"
import Practica from "models/Practica"


export default async function practica(req, res) {
    dbConnect();
    const dni = req.query.dni
    const protocolo = req.query.protocolo[0]
    const laboratorio = req.query.protocolo[1]

    // console.log('buscando practica', "PROTOCOLO"+ req.query.protocolo, "DNI"+ req.query.dni, "LABORATORIO"+ req.query.laboratorio)

    const practica = await Practica.findOne({ "PROTOCOLO": protocolo, "DNI": dni, "LABORATORIO": laboratorio });
    if (practica) {
        let update = { "VISTO": true };
        let filter = { "PROTOCOLO": protocolo, "DNI": dni };
        console.log("practica encontrada", practica)
        await Practica.findOneAndUpdate(filter, update)
        fs.readdirSync('pdf', { withFileTypes: true }).forEach(async (file) => {
            if (file.name.includes(protocolo) && file.name.includes(dni)) {
                let pdf = fs.readFileSync('pdf/' + file.name)
                res.setHeader('Content-Type', 'application/pdf');
                res.status(200).send(pdf);
            }
        })
    } else {
        console.log("No se encontro el archivo")
        res.status(400).json("No se encontro el archivo")

    }
    

}