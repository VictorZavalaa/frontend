import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import '../../../styles/Formularios.css';

export default function CitaForm() {
    const { id } = useParams(); // Obtener el id de la cita (si es una edición)
    const navigate = useNavigate(); // Hook para navegar entre páginas

    const [citas, setCitas] = useState({
        id: null,
        FechaYHoraInicioCita: '',
        FechaYHoraFinCita: '',
        MotivoCita: '',
        EstadoCita: '',
        idPaciente: '',
        idDoctor: '', // Este campo ya no será seleccionado por el usuario, se asignará automáticamente
    });

    const [pacientes, setPacientes] = useState([]); // Estado para guardar la lista de pacientes
    const [loading, setLoading] = useState(false); // Estado para saber si se está cargando la información
    const [errors, setErrors] = useState(null); // Estado para guardar los errores
    const [doctorId, setDoctorId] = useState(null); // El id del doctor logueado

    // Obtener la lista de pacientes al cargar el formulario
    useEffect(() => {
        axiosClient.get('/pacientes')
            .then(({ data }) => {
                console.log("Pacientes data:", data);
                setPacientes(data.data || []);
            })
            .catch((error) => {
                console.error("Error al obtener los pacientes", error);
            });
    }, []);

    // Obtener el id del doctor automáticamente
    useEffect(() => {
        axiosClient.get('/auth/user') // Ruta que devuelve el usuario autenticado
            .then(({ data }) => {
                console.log('Doctor ID:', data.id); // Verifica que se obtiene el id correctamente
                setDoctorId(data.id); // Asignamos el id del doctor logueado
            })
            .catch((error) => {
                console.error('Error al obtener el usuario autenticado', error);
            });
    }, []);

    
    // Si existe el id de la cita (edición)
    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/citas/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setCitas(data); // Cargar los datos de la cita para edición
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error al obtener las citas", error);
                });
        }, []);
    }

    // Función para enviar los datos del formulario
    const onSubmit = ev => {
        ev.preventDefault();

        // Asegurarnos de que el idDoctor esté incluido y sea un número entero
        const payload = { ...citas, idDoctor: doctorId };

        console.log('Datos a enviar:', payload); // Verifica que el idDoctor esté incluido

        if (citas.id) {
            // Si la cita tiene un id (se está editando)
            axiosClient.put(`/citas/${citas.id}`, payload)
                .then(() => {
                    navigate('/Doctor/citas');
                })
                .catch(err => {
                    const response = err.response;
                    console.error("Error al actualizar la cita", response.data);
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            // Si la cita no tiene un id (es nueva)
            axiosClient.post('/citas', payload)
                .then(() => {
                    navigate('/Doctor/citas');
                })
                .catch(err => {
                    const response = err.response;
                    console.error(response.data);
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div className="background-container2">
            <div className="form-container2">
                {citas.id && <h1 style={{ textAlign: 'center' }}>Editar Cita: {citas.FechaYHoraFinCita}, {citas.FechaYHoraInicioCita}</h1>}
                {!citas.id && <h1>Nueva cita</h1>}

                <div className="card animated fadeInDown">
                    {loading && (
                        <div className="text-center">
                            Loading...
                        </div>
                    )}
                    {errors &&
                        <div className="alert">
                            {Object.keys(errors).map(key => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    }
                    {!loading && (
                        <form onSubmit={onSubmit}>
                            <input value={citas.FechaYHoraInicioCita} onChange={ev => setCitas({ ...citas, FechaYHoraInicioCita: ev.target.value })} placeholder="Fecha y hora de inicio de cita" />
                            <input value={citas.FechaYHoraFinCita} onChange={ev => setCitas({ ...citas, FechaYHoraFinCita: ev.target.value })} placeholder="Fecha y hora de fin de cita" />
                            <input value={citas.MotivoCita} onChange={ev => setCitas({ ...citas, MotivoCita: ev.target.value })} placeholder="Motivo de la cita" />
                            <input value={citas.EstadoCita} onChange={ev => setCitas({ ...citas, EstadoCita: ev.target.value })} placeholder="Estado de la cita" />

                            <select value={citas.idPaciente} onChange={ev => setCitas({ ...citas, idPaciente: ev.target.value })}>
                                <option value="">Selecciona un paciente</option>
                                {pacientes.map(paciente => (
                                    <option key={paciente.id} value={paciente.id}>
                                        {paciente.NomPac} {paciente.ApePatPac} {paciente.ApeMatPac}
                                    </option>
                                ))}
                            </select>

                            <br />
                            <button className="btn">Guardar</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
