import {Calendar, dayjsLocalizer} from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient.js';
import { useStateContext } from '../../contexts/ContextProvider.jsx';

dayjs.locale('es');

function CalendarDoctor() {
    
    const localizer = dayjsLocalizer(dayjs);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useStateContext();


    useEffect(() => {

        axiosClient.get('/doctores/' + user.id + '/citas')
        .then(response => {

            const citas = response.data.map(event => ({
                ...event,
                start: new Date(event.start),
                end: new Date(event.end),
                title: event.motivo,
                Doctor: event.Doc,
                Paciente: event.Pac
            
            }));
            setEvents(citas);
        })
        .catch(error => {
            console.error("There was an error!", error);
        });
}, [user.id]);


const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
}


const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
}


return (
<>
    <h2 style={{textAlign:"center", marginTop: "30px" }}    >Calendario de citas</h2>

    <div style={{ height: "100vh", width: "90vw", margin: "auto", marginTop: "50px" }}>


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
                    <p><strong>Fecha de la Cita:</strong> {dayjs(selectedEvent.start).format('YYYY-MM-DD')}</p>
                    <p><strong>Horario:</strong> {dayjs(selectedEvent.start).format('HH:mm')} - {dayjs(selectedEvent.end).format('HH:mm')}</p>
                    <p><strong>Motivo Consulta:</strong> {selectedEvent.title}</p>
                    <p><strong>Doctor:</strong> {selectedEvent.Doctor}</p>
                    <p><strong>Paciente:</strong> {selectedEvent.Paciente}</p>
                    <button onClick={handleCloseModal}>Cerrar</button>
                </div>
            </div>
        )}
    </div>

    </>
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

export default CalendarDoctor;




