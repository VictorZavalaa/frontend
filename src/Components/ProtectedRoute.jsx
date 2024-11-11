import { Navigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";


const ProtectedRoute = ({ children, role }) => {

    const { token, rol } = useStateContext();

    console.log("User role from context:", rol);
    console.log("Required role:", role);
    console.log("Token:", token);


    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== rol) {
        
        if(rol === 'admin'){
            return <Navigate to="/Administrador" />;
        }else if(rol === 'doctor'){
            return <Navigate to="/Doctor" />;
        }else if(rol === 'paciente'){
            return <Navigate to="/Paciente" />;
        }




    }

    return children;
};

export default ProtectedRoute;