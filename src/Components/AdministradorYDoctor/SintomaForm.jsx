import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import '../../styles/Formularios.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function SintomaForm(){

    const {id} = useParams(); //Obtener el id del paciente de la URL

    const navigate = useNavigate(); //Hook para navegar entre páginas

    const [sintomas, setSintomas] = useState({ //Estado para guardar los datos del formulario
        id: null,
        NomSintoma: '',
        DescSintoma: '',
    }); 

    const [loading, setLoading] = useState(false); //Estado para saber si se está cargando la información
    const [errors, setErrors] = useState(null); //Estado para guardar los errores

    //Si existe el id del sintoma
    if(id)
    {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/sintomas/${id}`)
            .then(({data}) => {
                setLoading(false)
                setSintomas(data);
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error al obtener los sintomas", error);
            });

        }, []);
    }


    //Función para leer los datos del formulario
    const onSubmit = ev => {

        ev.preventDefault()

        console.log(sintomas);

        const payload = { ...sintomas };

        
        
        //Si el id del paciente existe, se actualiza
        if(sintomas.id)
        {

            console.log("Actualizando sintoma");
            console.log("Datos a enviar: ", sintomas);

            axiosClient.put(`/sintomas/${sintomas.id}`, payload)
            .then(() => {

                MySwal.fire({
                    title: "¡Síntoma actualizado!",
                    text: "El síntoma ha sido actualizado.",
                    icon: "success",
                });

                setTimeout(() => {
                    navigate('/sintomas');
                }, 1000);
            })
            .catch(err => {
                const response = err.response;

                console.error("Error al actualizar el sintoma", response.data);

                MySwal.fire({
                    title: "Error",
                    text: "Error al actualizar el síntoma",
                    icon: "error",
                });


                if(response && response.status === 422)
                {
                    setErrors(response.data.errors);
                }
            });


            //Si no tiene un id, se crea un nuevo paciente

        }else{

            axiosClient.post('/sintomas', sintomas)
            .then(() => {

                MySwal.fire({
                    title: "¡Síntoma creado!",
                    text: "El síntoma ha sido creado.",
                    icon: "success",
                });

                setTimeout(() => {
                    navigate('/sintomas');
                }, 1000);
            })
            .catch(err => {
                const response = err.response;

                console.error(response.data);

                MySwal.fire({
                    title: "Error",
                    text: "Error al crear el síntoma",
                    icon: "error",
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
            {sintomas.id && <h1 style={{ textAlign: 'center'  }}>Editar Paciente: {sintomas.NomSintoma}</h1>}
            {!sintomas.id && <h1>Nuevo Síntoma</h1>}

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
                        <input value={sintomas.NomSintoma} onChange={ev => setSintomas({...sintomas, NomSintoma: ev.target.value})} placeholder="Nombre del síntoma" />
                        <input value={sintomas.DescSintoma} onChange={ev => setSintomas({...sintomas, DescSintoma: ev.target.value})} placeholder="Descripción del síntoma" />

                        <button className="btn" >Save</button>
                    </form>
                    
                )}
            </div>
            </div>
        </div>
        
    )

}
