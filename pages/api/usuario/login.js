import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";


dbConnect();

export default async function (req, res) {

    if (req.method == "POST") {
        console.log("POST Usuarios", req.body);
        try {
            let filter = { "USUARIO": req.body.usuario, "PASSWORD": req.body.password };
            const user = await Usuario.findOne(filter);
            res.status(200).json({ status: "ok", laboratorio: user.LABORATORIO });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(405).json({ status: "error", mensaje: "metodo no permitido" });
    }
}