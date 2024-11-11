import { useState } from 'react';
import AxiosClient from "../../../axiosClient";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const ReporteCitasPorRangoFecha = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStartDate('');
        setEndDate('');
    };

    const handleDownload = async () => {


        // Validar que ambos campos de fecha estén llenos
        if (!startDate || !endDate) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ambos campos de fecha deben estar llenos.',
            });
            return;
        }


        // Validar que la fecha de inicio sea anterior a la fecha de fin
        if (new Date(startDate) > new Date(endDate)) {
            MySwal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha de fin debe ser mayor a la fecha de inicio.',
            });
            return;
        }

        //Convertir las fechas a formato yyyy-mm-dd

        const formattedStartDate = startDate.replace(/-/g, '/');
        const formattedEndDate = endDate.replace(/-/g, '/');

        console.log('formattedStartDate: ', formattedStartDate);
        console.log('formattedEndDate: ', formattedEndDate);



        try {
            const response = await AxiosClient.post('/reporte/citas-por-rango-fecha', {
                startDate: formattedStartDate,
                endDate: formattedEndDate
            }, {
                responseType: 'blob'
            });

            // Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'reporte_citas_por_rango_fecha.pdf');
            document.body.appendChild(link);
            link.click();

            handleCloseModal();

            MySwal.fire({
                title: "¡Descarga exitosa!",
                text: "El reporte ha sido descargado correctamente.",
                icon: "success"
            });

            
        } catch (error) {
            console.error('Error al descargar el reporte de citas por rango de fecha: ', error);
        
            MySwal.fire({
                title: "¡Error en la descarga!",
                text: "Error al descargar el reporte de citas por rango de fecha.",
                icon: "error"
            });

        
        }
    };

    return (
        <div>
            <button className="buttonReporte" onClick={handleOpenModal}>Citas por rango fecha</button>

            {isModalOpen && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2>Seleccione el rango de fechas</h2>
                        <label>
                            Fecha de inicio:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </label>
                        <br />
                        <label>
                            Fecha de fin:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                        <br />
                        <button style={buttonStyle} onClick={handleDownload}>Descargar</button>
                        <button style={buttonStyleCancel}  onClick={handleCloseModal}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Estilos básicos para el modal
const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '500px',
    width: '100%',
};


const buttonStyle = {
    backgroundColor: 'green',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
};

const buttonStyleCancel = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '10px',
};




export default ReporteCitasPorRangoFecha;