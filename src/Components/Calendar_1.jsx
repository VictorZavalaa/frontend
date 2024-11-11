import {Calendar, dayjsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { useEffect, useState } from 'react';
import axiosClient from '../axiosClient.js';

dayjs.locale('es');

function Calendar_1() {
    
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {

        axiosClient.get('/citas')
            .then(response => {

                const citas = response.data.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                }));
                setEvents(citas);
            })
            .catch(error => {
                console.error("There was an error!", error);
            });
    }, []);

    
    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };


    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    }


    return (
        //centrar el calendario
        <div style={{ height: "80vh", width: "80vw", margin: "auto" }}>

            <Calendar 
                localizer={localizer}
                events={events}
                toolbar={true} 
                messages={{ next: "Siguiente", previous: "Anterior", today: "Hoy", month: "Mes", week: "Semana", day: "Día"}}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={handleSelectEvent}
            />

            {isModalOpen && selectedEvent && (
                <div style={modalStyle}>
                    <div style={modalContentStyle}>
                        <h2>Resumen de la cita</h2>
                        <p><strong>Fecha Inicio:</strong> {dayjs(selectedEvent.start).format('YYYY-MM-DD HH:mm')}</p>
                        <p><strong>Fecha Fin:</strong> {dayjs(selectedEvent.end).format('YYYY-MM-DD HH:mm')}</p>
                        <p><strong>Motivo Consulta:</strong> {selectedEvent.title}</p>
                        <button onClick={handleCloseModal}>Cerrar</button>
                    </div>
                </div>
            )}
        </div>
    )
}


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

export default Calendar_1;




