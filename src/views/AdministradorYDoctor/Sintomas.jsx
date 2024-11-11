import NavbarAdmin from '../../Components/Administrador/NavbarAdmin.jsx';
import ListaSintomas from '../../Components/AdministradorYDoctor/ListaSintomas.jsx';
import NavbarDoctor from '../../Components/Doctor/NavbarDoctor.jsx';
import { useStateContext } from '../../contexts/ContextProvider.jsx';


export default function Sintomas() {

    const { rol } = useStateContext();

    return (
        <>
            
            {rol === 'admin' ? <NavbarAdmin /> :  <NavbarDoctor /> }

            <h2> Lista de Sintomas</h2>

            <ListaSintomas />
        </>
    );
}