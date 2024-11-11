import NavbarAdmin from "../../Components/Administrador/NavbarAdmin";
import NavbarDoctor from "../../Components/Doctor/NavbarDoctor";
import ListaHistorialesClinicos from "../../Components/AdministradorYDoctor/ListaHistorialesClinicos";
import { useStateContext } from "../../contexts/ContextProvider";


export default function HistorialesClinicos() {
    
    const { rol } = useStateContext();

    return (
        <>
            {rol === 'admin' ? <NavbarAdmin /> :  <NavbarDoctor /> }
        
            <h2> Historiales Clínicos</h2>

            <ListaHistorialesClinicos />
        
        </>
    );
}