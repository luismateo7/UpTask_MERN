import mongoose from "mongoose";

const tareasSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    estado:{
        type: Boolean,
        default: false
    },
    fechaEntrega:{
        type: Date,
        default: Date.now(),
        required: true
    },
    prioridad:{
        type: String,
        required: true,
        enum: ['Baja', 'Media', 'Alta']
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto"
    },
    completado:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario"
    }
},
{
    timestamps: true
})

const Tarea = mongoose.model("Tarea", tareasSchema)
export default Tarea;