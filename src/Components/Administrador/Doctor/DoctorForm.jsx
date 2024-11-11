import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import '../../../styles/Formularios.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function DoctorForm(){

    const {id} = useParams(); //Obtener el id del doctor de la URL

    const navigate = useNavigate(); //Hook para navegar entre páginas

    const [doctores, setDoctores] = useState({ //Estado para guardar los datos del formulario
        id: null,
        NomDoc: '',
        ApePatDoc: '',
        ApeMatDoc: '',
        FechNacDoc: '',
        GenDoc: '',
        DirDoc: '',
        TelDoc: '',
        Especialidad: '',
        FechDoc: '',
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false); //Estado para saber si se está cargando la información
    const [errors, setErrors] = useState(null); //Estado para guardar los errores


    //Si existe el id del doctor
    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/doctores/${id}`)
            .then(({data}) => {

                const formattedFechNacDoc = new Date(data.FechNacDoc).toISOString().split('T')[0];
                const formattedFechDoc = new Date(data.FechDoc).toISOString().split('T')[0];

                setLoading(false)

                setDoctores({
                    ...data,
                    FechNacDoc: formattedFechNacDoc,
                    FechDoc: formattedFechDoc
                });
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error al obtener los doctores", error);
            });

        }, []);
    }


    //Función para leer los datos del formulario
    const onSubmit = ev => {

        ev.preventDefault()

        const currentDate = new Date().toISOString().split('T')[0];
        const payload = { ...doctores, FechDoc: currentDate };


        if (!payload.password) {
            delete payload.password; //Si no se ha ingresado una contraseña, se elimina del payload
        }


        //Si el id existe, se actualiza el doctor
        if(doctores.id)
        {
            axiosClient.put(`/doctores/${doctores.id}`, payload)
            .then(() => {

                MySwal.fire({
                    title: "¡Doctor actualizado!",
                    text: "El doctor ha sido actualizado correctamente.",
                    icon: "success"
                });

                setTimeout(() => {
                    navigate('/Administrador/Doctores')
                }, 1000);
            })
            .catch(err => {
                const response = err.response;

                console.error("Error al actualizar el doctor", response.data);

                MySwal.fire({
                    title: "¡Error al actualizar!",
                    text: "Error al actualizar el doctor.",
                    icon: "error"
                });



                if(response && response.status === 422){

                    setErrors(response.data.errors)
                }
            });

        }else{ //Si no existe el id, se crea un nuevo doctor

            axiosClient.post('/doctores', payload)
            .then(() => {

                MySwal.fire({
                    title: "¡Doctor creado!",
                    text: "El doctor ha sido creado correctamente.",
                    icon: "success"
                });

                setTimeout(() => {
                    navigate('/Administrador/Doctores')
                }, 1000);
                })
            .catch(err => {
                const response = err.response;

                console.error("Error al crear el doctor", response.data);

                MySwal.fire({
                    title: "¡Error al crear!",
                    text: "Error al crear el doctor.",
                    icon: "error"
                });

                if(response && response.status === 422){

                    setErrors(response.data.errors)
                }
            })
        }
    }


    return (

        <div className="background-container2">

            <div className="form-container2">

                {doctores.id && <h1 style={{textAlign: 'center'}}>Editar Doctor: {doctores.NomDoc}</h1>}
                {!doctores.id && <h1 style={{textAlign: 'center'}}>Nuevo Doctor</h1>}

                <div className="card adimated fadeInDown">

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

                            <p>Nombre del Doctor: </p>
                            <input value={doctores.NomDoc} onChange={(ev) => setDoctores({...doctores, NomDoc: ev.target.value})} placeholder="Nombre" />
                            <p>Apellido Paterno: </p>
                            <input value={doctores.ApePatDoc} onChange={(ev) => setDoctores({...doctores, ApePatDoc: ev.target.value})} placeholder="Apellido Paterno" />
                            <p>Apellido Materno: </p>
                            <input value={doctores.ApeMatDoc} onChange={(ev) => setDoctores({...doctores, ApeMatDoc: ev.target.value})} placeholder="Apellido Materno" />
                            <p>Fecha de Nacimiento: </p>
                            <input value={doctores.FechNacDoc} onChange={(ev) => setDoctores({...doctores, FechNacDoc: ev.target.value})} type="date" placeholder="Fecha de Nacimiento" />
                            <p>Género: </p>
                            <input value={doctores.GenDoc} onChange={(ev) => setDoctores({...doctores, GenDoc: ev.target.value})} placeholder="Género" />
                            <p>Dirección: </p>
                            <input value={doctores.DirDoc} onChange={(ev) => setDoctores({...doctores, DirDoc: ev.target.value})} placeholder="Dirección" />
                            <p>Teléfono: </p>
                            <input value={doctores.TelDoc} onChange={(ev) => setDoctores({...doctores, TelDoc: ev.target.value})} placeholder="Teléfono" />
                            <p>Especialidad: </p>
                            <input value={doctores.Especialidad} onChange={(ev) => setDoctores({...doctores, Especialidad: ev.target.value})} placeholder="Especialidad" />
                            <p>Correo Electrónico: </p>
                            <input value={doctores.email} onChange={(ev) => setDoctores({...doctores, email: ev.target.value})} placeholder="Correo Electrónico" />
                            <p>Contraseña: </p>
                            <input value={doctores.password} onChange={(ev) => setDoctores({...doctores, password: ev.target.value})} placeholder="Contraseña" />

                            <button className="btn">Guardar</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

                
        