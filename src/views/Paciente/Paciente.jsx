import Calendario from '../../Components/Paciente/Calendario.jsx';
import NavbarDoctor from '../../Components/Paciente/NavbarPaciente.jsx';
import FooterPaciente from '../../Components/Paciente/FooterPaciente.jsx';

export default function Paciente() {

    return (
        <div style={{ background: 'linear-gradient(to bottom, white, #e2f8ff)', minHeight: '100vh' }}>
            <NavbarDoctor />
            <Calendario />
            <FooterPaciente />

            
        </div>
    )
}