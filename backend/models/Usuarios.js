import mongoose from "mongoose";
import bcrypt from "bcrypt";
//Documentación: https://mongoosejs.com/docs/guide.html
//Documentación de Middleware: https://mongoosejs.com/docs/middleware.html

const usuarioSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token:{
        type: String,
    },
    confirmado:{
        type: Boolean,
        default: false
    }
}, 
    {
        timestamps: true
    }
)

const Usuario = mongoose.model("Usuario", usuarioSchema)
export default Usuario;