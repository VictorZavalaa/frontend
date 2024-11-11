import NavbarDoctor from '../../Components/Doctor/NavbarDoctor.jsx';
import ListaSeguimientos from '../../Components/Doctor/Seguimiento/ListaSeguimientos.jsx';

export default function Seguimientos(){

    return (

        <div>
            <NavbarDoctor />
            <h1>Seguimientos</h1>
            <ListaSeguimientos />
        </div>

    );
}