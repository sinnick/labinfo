import { dbConnect } from "utils/mongoose";
import Usuario from "models/Usuario";


dbConnect();

export default async function (req, res) {

    if (req.method == "POST") {
        console.log("POST Usuarios", req.body);
        try {
            let filter = { "USUARIO": req.body.usuario, "PASSWORD": req.body.password };
            console.log("filter", filter);
            let user = await Usuario.findOne(filter);
            console.log("user", user);
            res.status(200).json({ status: "ok", laboratorio: user.LABORATORIO, admin: user.ADMIN, nombre: user.NOMBRE });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(405).json({ status: "error", mensaje: "metodo no permitido" });
    }
}