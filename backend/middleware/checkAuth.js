import jwt from "jsonwebtoken"
import Usuario from "../models/Usuarios.js";

const checkAuth = async (req, res, next) => {
    let token;
  
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1]; //Separar el token de la palabra Bearer
            const decoded = jwt.verify(token, process.env.JWT_SECRET); //Decodificar el token, y pasar llave con la que lo firmé, el decoded me arroja el jwt decodificado, es deicr el id del usuario, iat (la fecha de creacion con hora) y exp (la fecha de expiración con hora)

            req.usuario = await Usuario.findById(decoded.id).select('_id nombre email'); //Busco a un usuario por su ID, es decir dentro del objeto Request de node estoy creando un nuevo parametro a req para que pueda usarlo en otros lados, pero solo estoy trayendome los campos que necesito

            return next()
        } catch (error) {
            return res.status(404).json({ msg: "Hubo un error" }); //Si el token expira o no es correcto
        }
    }

    if(!token){
        const error = new Error("Token no válido")
        return res.status(401).json({ msg: error.message })
    }
    
    next();
}

export default checkAuth
