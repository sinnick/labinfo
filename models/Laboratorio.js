const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "NOMBRE": String,
    "DESCRIPCION": String,
    "ESTADO": String,
    "FECHA_DE_PAGO": String,
    "FECHA_DE_EXPIRACION": String
});
    

export default mongoose.models.Laboratorio || mongoose.model('Laboratorio', schema);
 
