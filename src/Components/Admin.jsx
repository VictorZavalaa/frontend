import axios from "axios";
import { useRef } from "react";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import '../styles/Admin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Admin() {

    //Referencias a los campos del formulario
    const emailRef = useRef();
    const passwordRef = useRef();

    //Variables globales setUser y setToken
    const { setUser, setToken, setRol } = useStateContext();

    //Función para enviar los datos del formulario
    const Submit = (ev) => {

        ev.preventDefault(); //Evita que la página se recargue

        //Objeto con los datos del formulario
        const payload ={
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        //Petición POST al servidor
        axiosClient.post('/loginAdmin',payload).then(({data}) => {

            toast.success('Bienvenido Administrador', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setUser(data.user);
            setToken(data.token);
            setRol('admin'); //Rol cambiar a doctor o paciente para pruebas

            setTimeout(() => {
                window.location.href = '/Administrador';
            }, 2000);

        

        }).catch((err)=>{

            const response = err.response;

            if(response && response.status === 401){
                toast.error('Correo o contraseña incorrectos');
            } else{
                toast.error('Error al iniciar sesión');
            }

        });
    }



    
    return (
        <div className={`bodyLoginAdmin`}>
            <div className={`containerAdmin`}>
                <div className={`form-containerAdmin`}>

                    <form onSubmit={Submit}>

                        <h1 className={`tituloAdmin`}>Administrador</h1>
                    
                        <p className={`pAdmin`}>Ingrese sus credenciales para iniciar como administrador</p>

                        <input ref={emailRef} type="email" placeholder="Correo electrónico" />
                        <input ref={passwordRef} type="password" placeholder="Contraseña" />

                        <button type="submit">Iniciar sesión</button>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}