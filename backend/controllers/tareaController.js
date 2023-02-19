import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";

const agregarTarea = async (req, res) => {
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);

    if(!existeProyecto){
        const error = new Error("El proyecto no existe")
        return res.status(404).json({ msg: error.message})
    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tiene los permisos para añadir las tareas")
        return res.status(403).json({ msg: error.message})
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);

        //Almacenar el ID en el proyecto
        existeProyecto.tareas.push(tareaAlmacenada._id); //Si ya paso las validaciones que si existe el proyecto entonces a ese proyecto encontrado se le agrega al arrelgo de tareas el id de la tarea creada
        await existeProyecto.save()

        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto");
    
    if(!tarea){
        const error = new Error("La tarea no existe")
        return res.status(404).json({ msg: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tiene los permisos para acceder a esta tarea")
        return res.status(403).json({ msg: error.message})
    }

    res.json(tarea)
}

const actualizarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto");
    
    if(!tarea){
        const error = new Error("La tarea no existe")
        return res.status(404).json({ msg: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para editar este proyecto")
        return res.status(403).json({ msg: error.message})
    }

    tarea.nombre = req.body.nombre || proyecto.nombre;
    tarea.descripcion = req.body.descripcion || tarea.descripcion;
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;
    tarea.cliente = req.body.cliente || tarea.cliente;

    try {
        const tareaAlmacenada = await tarea.save()
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const eliminarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto");
    
    if(!tarea){
        const error = new Error("La tarea no existe")
        return res.status(404).json({ msg: error.message})
    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tiene los permisos para eliminar esta tarea")
        return res.status(403).json({ msg: error.message})
    }

    try {
        await tarea.deleteOne();
        res.json({ msg: "Tarea eliminada correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req, res) => {

}

export{
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}