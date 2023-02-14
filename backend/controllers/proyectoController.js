import Proyecto from "../models/Proyecto.js";

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario); //Obtengo los proyectos creados por ese usuario, que tiene que estar previamente autenticado

    res.json(proyectos);
}

const obtenerProyecto = async (req, res) => {

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

}

const eliminarProyecto = async (req, res) => {

}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}

const obtenerTareas = async (req, res) => {

}


export{
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}
