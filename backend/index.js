import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoutes.js"
import tareaRoutes from "./routes/tareaRoutes.js"

const app = express();
app.use(express.json())

dotenv.config()
conectarDB()

//Configurar CORS
const whiteList = [process.env.FRONTED_URL]; //Fronted permitidos

const corsOption = {
    origin: function(origin, callback){ //El origin detecta que fronted esta realizando la peticion
        if(whiteList.includes(origin)){ //Si este origin que hace la peticion esta en whiteList entonces puede hacer la consulta a la API
            callback(null, true); //Damos acceso
        } else {
            //No esat permitido
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOption))

//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 4000;

const servidor = app.listen(PORT, ()=>{
    console.log('Desde Index')
})

// Socket.io
import { Server } from "socket.io"

const io = new Server(servidor, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTED_URL
    }
})

io.on('connection', (socket) => {

    //Definir los eventos de socket io
    socket.on('abrir proyecto', (proyecto)=>{
        socket.join(proyecto)
    })

    socket.on('nueva tarea', tarea => {
        const proyecto = tarea.proyecto;
        socket.to(proyecto).emit('tarea agregada', tarea);
    })

    socket.on('eliminar tarea', tarea => {
        const proyecto = tarea.proyecto
        socket.to(proyecto).emit('tarea eliminada', tarea)
    })

    socket.on('actualizar tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea actualizada', tarea)
    })

    socket.on('cambiar estado tarea', tarea => {
        const proyecto = tarea.proyecto._id
        socket.to(proyecto).emit('tarea estado actualizado', tarea)
    })
})