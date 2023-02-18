import { useState, useEffect, createContext } from "react";

const ProyectosContext = createContext();

const ProyectosProvider = ({children}) =>{

    const [ proyectos, setProyectos ] = useState('Hola');

    return(
        <ProyectosContext.Provider
            value={{
                proyectos
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
};

export default ProyectosContext;