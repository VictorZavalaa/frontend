import AxiosClient from "../../../axiosClient";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FaFileDownload } from "react-icons/fa";

const MySwal = withReactContent(Swal)


const ReporteAdministradores = () => {

    const downloadReport = async () => {

        try{
            const response = await AxiosClient.get('/reporte/administradores', {
                responseType: 'blob'
            });

            //Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte_administradores.pdf');
            document.body.appendChild(link);
            link.click();

            MySwal.fire({
                title: "¡Descarga exitosa!",
                text: "El reporte ha sido descargado correctamente.",
                icon: "success"
            });

        } catch (error) {
            console.error('Error al descargar el reporte de administradores: ', error);
            
            MySwal.fire({
                title: "¡Error en la descarga!",
                text: "Error al descargar el reporte de administradores.",
                icon: "error"
            });
        }
    };

    return (
        <button className="buttonReporte" onClick={downloadReport}>
            Descargar reporte de administradores <FaFileDownload />
        </button>
    );
};

export default ReporteAdministradores;

