import NavbarAdmin from '../../components/Administrador/NavbarAdmin.jsx';
import BienvenidaAdmin from '../../components/Administrador/BienvenidaAdmin.jsx';
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