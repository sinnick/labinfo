const fs = require('fs');

export default async function (req, res) {
    const destino = 'C:/Users/Fernando/Desktop/code/labinfo/pdf'

    switch (req.method) {
        case "POST":
            console.log("POST pdf");
            let respuesta = await JSON.parse(req.body);
            let pathpdf = `${destino}/${respuesta.filename}`;
            // console.log({ respuesta })
            try {
                console.log('voy a intentar guardar el pdf en ', pathpdf);
                fs.writeFileSync(pathpdf, respuesta.pdf, 'base64');
                res.send('ok')
            }
            catch (error) {
                console.log(error);
                res.status(500).json(error);
            }
            break;
        default:
            res.status(405).json({ status: "error", mensaje: "metodo no permitido" });
            break;
    }



}