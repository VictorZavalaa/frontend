
import NavbarAdmin from '../../Components/Administrador/NavbarAdmin.jsx';
import ListaAdminsitradores from '../../Components/Administrador/Administradores/listaAdministradores.jsx';

export default function Administradores() {



    return (
        <> 
            <NavbarAdmin />
            <h2> Lista de Administradores</h2>
            <ListaAdminsitradores />            
        </>
    );
}