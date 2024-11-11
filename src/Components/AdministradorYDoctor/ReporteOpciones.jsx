import ReporteAdministradores from "./Reportes/ReporteAdministradores";
import ReportePacientes from "./Reportes/ReportePacientes";
import ReportePorcPacHomYMuj from "./Reportes/ReportePorcPacHomYMuj";
import ReportePorcEnfPac from "./Reportes/ReportePorcEnfPac";
import ReporteCitasPorRangoFecha from "./Reportes/ReporteCitasPorRangoFecha";

export default function ReporteOpciones() {

    return (
        <div style={{textAlign: 'center'}}>
            
            <h1 style={{marginTop: '20px'}}>Reportes</h1>
        
            <ReporteAdministradores />
            <ReportePacientes />
            <ReportePorcPacHomYMuj />
            <ReportePorcEnfPac />
            <ReporteCitasPorRangoFecha />
        </div>
    );
}