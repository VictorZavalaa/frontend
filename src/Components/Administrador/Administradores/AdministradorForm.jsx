import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import '../../../styles/Formularios.css';


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function AdministradorForm(){

    const {idAdmin} = useParams(); //Obtener el id de la administrador de la URL

    const navigate = useNavigate(); //Hook para navegar entre páginas

    const [administradores, setAdministradores] = useState({ //Estado para guardar los datos del formulario
        idAdmin: null,
        NomAdmin: '',
        ApePatAdmin: '',
        ApeMatAdmin: '',
        FechaNacAdmin: '',
        TelAdmin: '',
        FechAdmin: '',
        email: '',
        password: '',

    });


    const [loading, setLoading] = useState(false); //Estado para saber si se está cargando la información
    const [errors, setErrors] = useState(null); //Estado para guardar los errores


    //Si existe el id de la administrador
    if(idAdmin)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/administradores/${idAdmin}`)
            .then(({data}) => {
                const formattedFechaNacAdmin = new Date(data.FechaNacAdmin).toISOString().split('T')[0];
                const formattedFechAdmin = new Date(data.FechAdmin).toISOString().split('T')[0];

                setLoading(false)

                setAdministradores({
                    ...data,
                    FechaNacAdmin: formattedFechaNacAdmin,
                    FechAdmin: formattedFechAdmin

                });
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error al obtener los administradores", error);
            });

        }, []);
    }


    //Función para leer los datos del formulario
    const onSubmit = ev => {

        ev.preventDefault()

        const currentDate = new Date().toISOString().split('T')[0]; //Obtener la fecha actual
        const payload = { ...administradores, FechAdmin: currentDate }; //Agregar la fecha actual al payload


        if (!payload.password) {
            delete payload.password; // Eliminar la contraseña si está vacía
        }

        //Si el usuario ya tiene un id, entonces es una actualización
        if(administradores.idAdmin){

            axiosClient.put(`/administradores/${administradores.idAdmin}`, payload)
            .then(() => {

                MySwal.fire({
                    title: "¡Administrador actualizado!",
                    text: "El administrador ha sido actualizado correctamente.",
                    icon: "success"
                });
                setTimeout(() => {
                    navigate('/Administrador/Administradores')
                }, 1000);
                
            })
            .catch(err => {
                const response = err.response;

                console.error("Error al actualizar el administrador", response.data);

                MySwal.fire({
                    title: "¡Error al actualizar!",
                    text: "Error al actualizar el administrador.",
                    icon: "error"
                });



                if(response && response.status === 422){

                    setErrors(response.data.errors)
                }
            });

            //Si no tiene un id, entonces es un nuevo usuario
            
        }else{

            axiosClient.post('/administradores', payload)
            .then(() => {

                MySwal.fire({
                    title: "¡Administrador creado!",
                    text: "El administrador ha sido creado correctamente.",
                    icon: "success"
                });


                setTimeout(() => {
                    navigate('/Administrador/Administradores')
                }, 1000);
                })
            .catch(err => {
                const response = err.response;

                console.error(response.data);

                MySwal.fire({
                    title: "¡Error al crear!",
                    text: "Error al crear el administrador.",
                    icon: "error"
                });

                if(response && response.status === 422){
                    setErrors(response.data.errors)
                }
            })
        }
    }


    return(
        
        <div className="background-container2">


        <div className="form-container2">
            {administradores.idAdmin && <h1 style={{ textAlign: 'center'  }}>Editar Administrador: {administradores.NomAdmin}</h1>}
            {!administradores.idAdmin && <h1>Nuevo Administrador</h1>}

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
                        <p>Nombre del Administrador: </p>
                        <input value={administradores.NomAdmin} onChange={ev => setAdministradores({...administradores, NomAdmin: ev.target.value})} placeholder="Nombre" />
                        <p>Apellido paterno: </p>
                        <input value={administradores.ApePatAdmin} onChange={ev => setAdministradores({...administradores, ApePatAdmin: ev.target.value})} placeholder="Apellido Paterno" />
                        <p>Apellido materno: </p>
                        <input value={administradores.ApeMatAdmin } onChange={ev => setAdministradores({...administradores, ApeMatAdmin: ev.target.value})} placeholder="Apellido Materno" />
                        <p>Fecha de nacimiento: </p>
                        <input value={administradores.FechaNacAdmin } onChange={ev => setAdministradores({...administradores, FechaNacAdmin: ev.target.value})} type="date" placeholder="Fecha de Nacimiento (aaaa-mm-dd)" />
                        <p>Numero Telefonico: </p>
                        <input value={administradores.TelAdmin } onChange={ev => setAdministradores({...administradores, TelAdmin: ev.target.value})} placeholder="Teléfono" />
                        <p>Correo Electrónico</p>
                        <input value={administradores.email } onChange={ev => setAdministradores({...administradores, email: ev.target.value})} placeholder="Correo Electrónico" />
                        <p>Contraseña</p>
                        <input value={administradores.password } onChange={ev => setAdministradores({...administradores, password: ev.target.value})} placeholder="Contraseña" />

                        <button className="btn" >Guardar</button>
                    </form>
                    
                )}
            </div>
            </div>
        </div>
        
    )

}
