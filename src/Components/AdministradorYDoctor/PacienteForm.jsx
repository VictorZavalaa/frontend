import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import '../../styles/Formularios.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function PacienteForm(){

    const {id} = useParams(); //Obtener el id del paciente de la URL

    const navigate = useNavigate(); //Hook para navegar entre páginas

    const [pacientes, setPacientes] = useState({ //Estado para guardar los datos del formulario
        id: null,
        NomPac: '',
        ApePatPac: '',
        ApeMatPac: '',
        FechNacPac: '',
        GenPac: '',
        DirPac: '',
        TelPac: '',
        FechPac: '',
        email: '',
        password: '',
    }); 

    const [loading, setLoading] = useState(false); //Estado para saber si se está cargando la información
    const [errors, setErrors] = useState(null); //Estado para guardar los errores

    //Si existe el id del paciente
    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/pacientes/${id}`)
            .then(({data}) => {

                const formattedFechNacPac = new Date(data.FechNacPac).toISOString().split('T')[0];
                const formattedFechPac = new Date(data.FechPac).toISOString().split('T')[0];

                setLoading(false)

                setPacientes({
                    ...data,
                    FechNacPac: formattedFechNacPac,
                    FechPac: formattedFechPac
                });
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error al obtener los pacientes", error);
            });

        }, []);
    }


    //Función para leer los datos del formulario
    const onSubmit = ev => {

        ev.preventDefault()


        const currentDate = new Date().toISOString().split('T')[0];
        const payload = { ...pacientes, FechPac: currentDate };


        if (!payload.password) {
            delete payload.password; //Si no se ha ingresado una contraseña, se elimina del payload
        }

        //Si el id del paciente existe, se actualiza
        if(pacientes.id)
        {

            axiosClient.put(`/pacientes/${pacientes.id}`, payload)
            .then(() => {

                MySwal.fire({
                    title: "¡Paciente actualizado!",
                    text: "El paciente ha sido actualizado correctamente.",
                    icon: "success"
                });

                setTimeout(() => {
                    navigate('/pacientes');
                }, 1000);
            })
            .catch(err => {
                const response = err.response;

                console.error("Error al actualizar el paciente", response.data);

                MySwal.fire({
                    title: "¡Error al actualizar!",
                    text: "Error al actualizar el paciente.",
                    icon: "error"
                });

                if(response && response.status === 422)
                {
                    setErrors(response.data.errors);
                }
            });


            //Si no tiene un id, se crea un nuevo paciente

        }else{

            axiosClient.post('/pacientes', payload)
            .then(() => {
                MySwal.fire({
                    title: "¡Paciente creado!",
                    text: "El paciente ha sido creado correctamente.",
                    icon: "success"
                });

                setTimeout(() => {
                    navigate('/pacientes');
                }, 1000);
                })
            .catch(err => {
                const response = err.response;

                console.error(response.data);

                MySwal.fire({
                    title: "¡Error al crear!",
                    text: "Error al crear el paciente.",
                    icon: "error"
                });


                if(response && response.status === 422)
                {
                    setErrors(response.data.errors);
                }
            })
        }
    }


    return(
        
        <div className="background-container2">


        <div className="form-container2">
            {pacientes.id && <h1 style={{ textAlign: 'center'  }}>Editar Paciente: {pacientes.NomPac}</h1>}
            {!pacientes.id && <h1>Nuevo Paciente</h1>}

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
                        <p>Nombre del Paciente: </p>
                        <input value={pacientes.NomPac} onChange={ev => setPacientes({...pacientes, NomPac: ev.target.value})} placeholder="Nombre" />
                        <p>Apellido Paterno: </p>
                        <input value={pacientes.ApePatPac} onChange={ev => setPacientes({...pacientes, ApePatPac: ev.target.value})} placeholder="Apellido Paterno" />
                        <p>Apellido Materno: </p>
                        <input value={pacientes.ApeMatPac} onChange={ev => setPacientes({...pacientes, ApeMatPac: ev.target.value})} placeholder="Apellido Materno" />
                        <p>Fecha de Nacimiento: </p>
                        <input value={pacientes.FechNacPac} onChange={ev => setPacientes({...pacientes, FechNacPac: ev.target.value})} type="date" placeholder="Fecha de Nacimiento (aaaa-mm-dd)" />
                        <p>Género: </p>
                        <input value={pacientes.GenPac} onChange={ev => setPacientes({...pacientes, GenPac: ev.target.value})} placeholder="Género" />
                        <p>Dirección: </p>
                        <input value={pacientes.DirPac} onChange={ev => setPacientes({...pacientes, DirPac: ev.target.value})} placeholder="Dirección" />
                        <p>Teléfono: </p>
                        <input value={pacientes.TelPac} onChange={ev => setPacientes({...pacientes, TelPac: ev.target.value})} placeholder="Teléfono" />
                        <p>Correo Electrónico: </p>
                        <input value={pacientes.email} onChange={ev => setPacientes({...pacientes, email: ev.target.value})} placeholder="Correo Electronico" />
                        <p>Contraseña: </p>
                        <input value={pacientes.password} onChange={ev => setPacientes({...pacientes, password: ev.target.value})} placeholder="Contraseña" />

                        
                        
                    
                        <button className="btn" >Save</button>
                    </form>
                    
                )}
            </div>
            </div>
        </div>
        
    )

}
               