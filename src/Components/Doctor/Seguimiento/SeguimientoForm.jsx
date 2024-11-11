import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import '../../../styles/Formularios.css';

export default function SeguimientoForm() {

    const { id, idC } = useParams(); // Extrae el id del seguimiento y la cita desde la URL
    const navigate = useNavigate(); // Hook para navegar entre páginas
    const [loading, setLoading] = useState(false); // Estado para saber si se está cargando la información
    const [errors, setErrors] = useState(null); // Estado para guardar los errores
    const [idPac, setIdPac] = useState(null); // Estado para guardar el id del paciente
    const [nombrePaciente, setNombrePaciente] = useState(''); // Estado para guardar el nombre del paciente
    const [sintomas, setSintomas] = useState([]); // E  stado para guardar la lista de síntomas
    

    console.log("idCita", idC);
    console.log("idSeguimiento", id);

    const [seguimientos, setSeguimientos] = useState({ // Estado para guardar los datos del formulario
        id: null,
        FechSeg: '',
        DetalleSeg: '',
        Glucosa: '',
        Ritmo_Cardiaco: '',
        Presion: '',
        idCita: idC, // Usamos idCita del parámetro de la URL
    });

    const [diagnosticos, setDiagnosticos] = useState({ // Estado para guardar los datos del formulario
        id: null,
        idPaciente: '',
        idSintoma: '',
    });

    //Obtener la lista de síntomas para el formulario
    useEffect(() => {
        axiosClient.get('/sintomas')
            .then(({ data }) => {
                console.log("Sintomas data:", data);
                setSintomas(data.data || []);
            })
            .catch((error) => {
                console.error("Error al obtener los sintomas", error);
            });
    }, []);


    // Este useEffect carga el seguimiento si existe un id en los parámetros
    useEffect(() => {
        if (id) { // Verifica que haya un id para editar
            setLoading(true);
            axiosClient.get(`/doctor/citas/${idC}/seguimientos/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setSeguimientos(data); // Carga los datos del seguimiento
                })
                .catch((error) => {
                    setLoading(false);
                    console.error("Error al obtener los seguimientos", error);
                });
        }
    }, [id, idC]); // Dependencias: ejecuta este efecto si id o idC cambian



    // Obtener id y nombre del paciente
    useEffect(() => {
        if (idC) { 
            axiosClient.get(`/doctor/citas/${idC}`)
                .then((response) => {
                    console.log("Datos del paciente:", response.data);
                    const pacienteData = response.data[0]; // Asegúrate de acceder al primer elemento del array
                    setIdPac(pacienteData.idPac);
                    setNombrePaciente(pacienteData.NomPac);
                })
                .catch(error => {
                    console.error("Error al obtener los detalles de la cita", error);
                });
        }
    }, [idC]);



    // Función para leer los datos del formulario
    const onSubmit = ev => {
        ev.preventDefault();
        const payloadSeguimiento = { ...seguimientos, idCita: idC };
    
        if (id) {
            // Actualización de seguimiento
            axiosClient.put(`/doctor/citas/${idC}/seguimientos/${id}`, payloadSeguimiento)
                .then(() => {
                    navigate(`/Doctor/Citas/${idC}/Seguimientos`);
                })
                .catch(err => {
                    const response = err.response;
                    console.error("Error al actualizar el seguimiento", response?.data);
    
                    if (response && response.status === 422) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            // Creación de seguimiento
            axiosClient.post('/seguimientos', payloadSeguimiento)
                .then(() => {
                    // Obtener id y nombre del paciente
                    axiosClient.get(`/doctor/citas/${idC}`)
                        .then((response) => {
                            console.log("Datos del paciente:", response.data);
                            const pacienteData = response.data[0]; // Asegúrate de acceder al primer elemento del array
                            
                            const payloadDiagnostico = { 
                                ...diagnosticos, 
                                idPaciente: pacienteData.idPaciente, // Nota: Verifica que `idPaciente` tenga el valor correcto
                                idSintoma: diagnosticos.idSintoma // idSintoma debe estar en el estado antes de enviar
                            };
    
                            // Inserción en diagnostico_sintoma tras crear el seguimiento
                            axiosClient.post('/diagnostico_sintoma', payloadDiagnostico)
                                .then(() => {
                                    console.log("Diagnóstico registrado con éxito.");
                                    navigate(`/doctor/citas/${idC}/seguimientos`);
                                })
                                .catch(err => {
                                    console.error("Error al registrar el diagnóstico", err.response?.data);
                                });
                        })
                        .catch(error => {
                            console.error("Error al obtener los detalles de la cita", error);
                        });
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
                {id && <h1 style={{ textAlign: 'center' }}>Editar Seguimiento: {seguimientos.FechSeg}</h1>}
                {!id && <h1>Nuevo Seguimiento</h1>}

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
                            <input value={seguimientos.FechSeg} onChange={ev => setSeguimientos({...seguimientos, FechSeg: ev.target.value})} placeholder='Fecha de seguimiento (aaaa-mm-dd)'/>
                            <input value={seguimientos.DetalleSeg} onChange={ev => setSeguimientos({...seguimientos, DetalleSeg: ev.target.value})} placeholder='Detalle del seguimiento'/>
                            <input value={seguimientos.Glucosa} onChange={ev => setSeguimientos({...seguimientos, Glucosa: ev.target.value})} placeholder="Glucosa" />
                            <input value={seguimientos.Ritmo_Cardiaco} onChange={ev => setSeguimientos({...seguimientos, Ritmo_Cardiaco: ev.target.value})} placeholder="Ritmo Cardíaco" />
                            <input value={seguimientos.Presion} onChange={ev => setSeguimientos({...seguimientos, Presion: ev.target.value})} placeholder="Presión" />
                            
                            
                            <h1 style={{textAlign: 'left'}}>Sintoma que presenta el paciente {nombrePaciente}: </h1>

                            <select value={diagnosticos.idSintoma} onChange={ev => setDiagnosticos({ ...diagnosticos, idSintoma: ev.target.value })}>
                                <option value="">Selecciona un síntoma</option>
                                {sintomas.map(sintoma => (
                                    <option key={sintoma.id} value={sintoma.id}>
                                        {sintoma.NomSintoma}
                                    </option>
                                ))}
                            </select>

                            <button className="btn" >Guardar</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
