import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js"

const obtenerProyectos = async (req, res) => {
    //Obtengo los proyectos creados por ese usuario, que tiene que estar previamente autenticado
    const proyectos = await Proyecto.find()
        .where('creador')
        .equals(req.usuario)
        .select("-tareas");  //No necesito que me carguen las tareas cuando solo pido los proyectos

    res.json(proyectos);
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params; //El usuario obtiene el proyecto por el id del Proyecto si esque esta autenticado
    
    const proyecto = await Proyecto.findById(id).populate("tareas");

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({ msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para acceder a este proyecto")
        return res.status(401).json({ msg: error.message})
    }

    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id) //Obtener las tareas del Proyecto
    res.json({
        proyecto,
        tareas
    });
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body); //Crea un nuevo proyecto
    proyecto.creador = req.usuario._id; //Se le asigna su creado

    try {
        const proyectoAlmacenado = await proyecto.save(); //Se almacena
        res.json(proyectoAlmacenado);
    } catch (error) {
        console.log(error);
    }
}

const editarProyecto = async (req, res) => {
    const { id } = req.params; //El usuario obtiene el proyecto por el id del Proyecto si esque esta autenticado
    const proyecto = await Proyecto.findById(id);

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({ msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para editar este proyecto")
        return res.status(401).json({ msg: error.message})
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}

const eliminarProyecto = async (req, res) => {
    const { id } = req.params; //El usuario obtiene el proyecto por el id del Proyecto si esque esta autenticado
    const proyecto = await Proyecto.findById(id);

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({ msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("No tienes los permisos para eliminar a este proyecto")
        return res.status(401).json({ msg: error.message})
    }

    try {
        await proyecto.deleteOne();
        res.json({ msg: "Proyecto eliminado correctamente"})
    } catch (error) {
        console.log(error)
    }
}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}

export{
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador
}
