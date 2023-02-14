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

usuarioSchema.pre('save', async function(next) {
    
    //Si el usuario edita su email, su nombre u otro campo, no va hashear nuevamente la contraseña que previamente fue hasheada en el momento de la creacion

    if(!this.isModified("password")){
        next() //Express tiene la function next() para mandarte al siguiente middleware
    }

    //Entre más salt se le ponga más segura será, pero ocupará más recursos del servidor
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password) //Toma el password del form y el hasheado
};

const Usuario = mongoose.model("Usuario", usuarioSchema)
export default Usuario;