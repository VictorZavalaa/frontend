import NavbarAdmin from '../../Components/Administrador/NavbarAdmin.jsx';
import BienvenidaAdmin from '../../Components/Administrador/BienvenidaAdmin.jsx';
import '../../styles/BienvenidaAdmin.css';
import DescargarCSV from '../../Components/DescargarCSV.jsx';



export default function Administrador() {

    return (
        <div className="background-image">
           
                <NavbarAdmin />
                <BienvenidaAdmin />
                <DescargarCSV />   
        </div>
    );

}