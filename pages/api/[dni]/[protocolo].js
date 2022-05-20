const fs = require('fs');
import { dbConnect } from "utils/mongoose"
import Practica from "models/Practica"


export default async function practica(req, res) {
    dbConnect();

    const practica = await Practica.findOne({ "PROTOCOLO": req.query.protocolo, "DNI": req.query.dni });
    if (practica) {
        let update = { "VISTO": true };
        let filter = { "PROTOCOLO": req.query.protocolo, "DNI": req.query.dni };
        console.log("practica encontrada", practica)
        await Practica.findOneAndUpdate(filter, update)
        fs.readdirSync('pdf', { withFileTypes: true }).forEach(async (file) => {
            if (file.name.includes(req.query.protocolo) && file.name.includes(req.query.dni)) {
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