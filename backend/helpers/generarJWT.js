import jwt from "jsonwebtoken"

const generarJWT = id =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { //Firma de forma síncrona el payload (data)
        expiresIn: "30d"
    })
}

export default generarJWT;