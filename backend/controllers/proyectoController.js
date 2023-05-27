import Proyecto from "../models/Proyecto.js";
import Tarea from "../models/Tarea.js"
import Usuario from "../models/Usuarios.js";

const obtenerProyectos = async (req, res) => {
    //Obtengo los proyectos creados por ese usuario, que tiene que estar previamente autenticado
    const proyectos = await Proyecto.find({
        '$or': [
            { colaboradores: { $in: req.usuario } },
            { creador: { $in: req.usuario } }
        ]
    })
        .select("-tareas");  //No necesito que me carguen las tareas cuando solo pido los proyectos

    res.json(proyectos);
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params; //El usuario obtiene el proyecto por el id del Proyecto si esque esta autenticado
    
    const proyecto = await Proyecto.findById(id)
        .populate("tareas")
        .populate("colaboradores", "nombre email"); //Después de la coma hacemos un select

    if(!proyecto){
        const error = new Error("Proyecto no encontrado")
        return res.status(404).json({ msg: error.message})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString() && !proyecto.colaboradores.some( colaborador => colaborador._id.toString() === req.usuario._id.toString()) ){
        const error = new Error("No tienes los permisos para acceder a este proyecto")
        return res.status(401).json({ msg: error.message})
    }

    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id) //Obtener las tareas del Proyecto
    res.json(proyecto);
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

const buscarColaborador = async (req, res) => {
    const { email } = req.body
    const usuario = await Usuario.findOne({ email }).select('email nombre _id')

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg: error.message})
    }
    res.status(200).json(usuario);
}

const agregarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id);

    if(!proyecto){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msg: error.message})
    }

    //Solo el creador del proyecto puede añadir a colaboradores
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción No Válida')
        return res.status(404).json({msg: error.message})
    }

    const { email } = req.body;
    const usuario = await Usuario.findOne({ email })

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg: error.message})
    }

    //El colaborador no es el admin del proyecto
    if(proyecto.creador.toString() === usuario._id.toString()){
        const error = new Error('No te puedes añadir a ti mismo')
        return res.status(404).json({msg: error.message})
    }

    //Revisar que no este ya agregado al proyecto
    if(proyecto.colaboradores.includes(usuario._id)){
        const error = new Error('El Usuario ya pertene al Proyecto')
        return res.status(404).json({msg: error.message})
    }

    //Si pasa las comprobaciones (todo bien), lo agregamos
    proyecto.colaboradores.push(usuario._id)
    await proyecto.save()
    res.json({msg: "Colaborador Agregado Correctamente"})
}

const eliminarColaborador = async (req, res) => {
    const proyecto = await Proyecto.findById(req.params.id);

    if(!proyecto){
        const error = new Error('Proyecto no encontrado')
        return res.status(404).json({msg: error.message})
    }

    //Solo el creador del proyecto puede añadir a colaboradores
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción No Válida')
        return res.status(404).json({msg: error.message})
    }

    //Si pasa las comprobaciones (todo bien), lo eliminamos
    proyecto.colaboradores.pull(req.body.id);
    await proyecto.save()
    res.json({msg: "Colaborador Eliminado Correctamente"})
}

export{
    obtenerProyectos,
    obtenerProyecto,
    nuevoProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador
}
