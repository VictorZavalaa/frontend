import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

//Para poder usar el contexto en cualquier componente
const stateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
    rol: "",
    setRol: () => {},
});

export const ContextProvider = ({children}) => {

    const [user, setUser] = useState({});
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [rol, setRolState] = useState(localStorage.getItem('USER_ROLE') || null);

    const setToken = (token) => {

        _setToken(token);

        if(token){
            localStorage.setItem('ACCESS_TOKEN', token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }


    const setRol = (role) => {
        
        setRolState(role);
        if (role) {
            localStorage.setItem('USER_ROLE', role);
        } else {
            localStorage.removeItem('USER_ROLE');
        }
    };

    return(
        <stateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            rol,
            setRol,
        }}>
            {children}
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext);


