import NavbarAdmin from '../../Components/Administrador/NavbarAdmin.jsx';
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor.jsx';
import ReporteOpciones from '../../Components/AdministradorYDoctor/ReporteOpciones.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx';


export default function Reportes() {
    
        const { rol } = useStateContext();
    
        return (
            <>
                
                {rol === 'admin' ? <NavbarAdmin /> :  <NavbarDoctor /> }    
                <ReporteOpciones />
            </>
        );
    }