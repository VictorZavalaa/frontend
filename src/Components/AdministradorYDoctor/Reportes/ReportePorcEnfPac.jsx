import AxiosClient from "../../../axiosClient";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)


const ReportePorcEnfPac = () => {

    const downloadReport = async () => {

        try{

            const response = await AxiosClient.get('/reporte/porcentaje-porc-enfermedades', {
                responseType: 'blob'
            });


            //Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte_porcentaje_enfermedades_pacientes.pdf');
            document.body.appendChild(link);
            link.click();

            MySwal.fire({
                title: "¡Descarga exitosa!",
                text: "El reporte ha sido descargado correctamente.",
                icon: "success"
            });







        }catch (error) {
            console.error('Error al descargar el reporte de porcentaje de enfermedades de los pacientes: ', error);
        
            MySwal.fire({
                title: "¡Error en la descarga!",
                text: "Error al descargar el reporte de porcentaje de enfermedades de los pacientes.",
                icon: "error"
            });
        }
    };

    return (
        <button className="buttonReporte" onClick={downloadReport}>
            Descargar reporte de porcentaje de enfermedades de los pacientes
        </button>
    );
};

export default ReportePorcEnfPac;