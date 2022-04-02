const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "FILENAME": String,
    "LABORATORIO": Number,
    "PROTOCOLO": Number,
    "DNI": Number,
    "NOMBRE": String,
    "FECHA_INFORME": Date,
    "FECHA_CREACION": Date,
    "FECHA_ELIMINACION": Date,
});
    

export default mongoose.models.Practica || mongoose.model('Practica', schema);
 
