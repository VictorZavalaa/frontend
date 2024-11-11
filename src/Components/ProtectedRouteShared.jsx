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


        if(rol === 'admin' && role === 'doctor'){
            return children;
        }

        if(rol === 'doctor' && role === 'admin'){
            return children;
        }

        if(rol === 'admin'){
            return <Navigate to="/admin" />;
        }else if(rol === 'doctor'){
            return <Navigate to="/doctor" />;
        }else if(rol === 'paciente'){
            return <Navigate to="/paciente" />;
        }
           





    }

    return children;
};

export default ProtectedRoute;