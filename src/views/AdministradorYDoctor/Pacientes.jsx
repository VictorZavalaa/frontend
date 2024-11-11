import NavbarAdmin from '../../Components/Administrador/NavbarAdmin.jsx';
import ListaPacientes from '../../Components/AdministradorYDoctor/ListaPacientes.jsx';
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx';


export default function Pacientes() {

    const { rol } = useStateContext();

    return (
        <>
            
            {rol === 'admin' ? <NavbarAdmin /> :  <NavbarDoctor /> }

            <h2> Lista de Pacientes</h2>

            <ListaPacientes />
        </>
    );
}