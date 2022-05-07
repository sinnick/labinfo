const mongoose = require('mongoose');

const schema = mongoose.Schema({
    "USUARIO": String,
    "PASSWORD": String,
    "NOMBRE": String,
    "APELLIDO": String,
    "EMAIL": String,	
    "HABILITADO": Boolean
});
    

export default mongoose.models.Usuario || mongoose.model('Usuario', schema);
 
