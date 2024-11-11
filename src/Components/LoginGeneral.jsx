import axios from "axios";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { useStateContext } from "../contexts/ContextProvider";
import '../styles/LoginGeneral.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function LoginGeneral() {
    
    const emailPatientRef = useRef();
    const passwordPatientRef = useRef();
    const emailDoctorRef = useRef();
    const passwordDoctorRef = useRef();

    const [isActive, setIsActive] = useState(false);
    const [isSignIn, setIsSignIn] = useState(true);


    const { setUser, setToken, setRol } = useStateContext();


    //Función para enviar los datos del formulario del doctor
    const SubmitPatient = (e) => {

        e.preventDefault();

        //Creamos un objeto con los datos del formulario del paciente
        const payload = {
            email: emailPatientRef.current.value,
            password: passwordPatientRef.current.value,
        }

        //Hacemos una petición POST para loguear al paciente
        axiosClient.post("/loginPaciente",payload).then(({data})=>{

          toast.success('Bienvenido Paciente', {
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
        setRol('paciente');

        setTimeout(() => {
          window.location.href = '/Paciente';
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


    //Función para enviar los datos del formulario del doctor
    const SubmitDoctor = (e) => {

        e.preventDefault();

        //Creamos un objeto con los datos del formulario del doctor
        const payload = {
            email: emailDoctorRef.current.value,
            password: passwordDoctorRef.current.value,
        }

        //Hacemos una petición POST para loguear al doctor
        axiosClient.post("/loginDoctor",payload).then(({data})=>{

        toast.success('Bienvenido Doctor', {
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
        setRol('doctor');
   
        setTimeout(() => {
          window.location.href = '/Doctor';
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

    //Función para alternar entre el formulario de doctor y paciente
    const toggleForm = () => {
        setIsSignIn(!isSignIn); //Alternar entre Sign In y Sign Up
        setIsActive(!isActive); //Controlar la clase activa del contenedor
    };


    
    return (
        <div className={`bodyLogin`}>

        <p> .</p>
    
          <div className={`container ${isActive ? 'active' : ''}`} id="container"> {/* Agregamos la clase 'active' dinámicamente */}
            <div className={`form-container ${!isSignIn ? 'sign-up' : 'sign-in'}`}>
              {isSignIn ? (
                <form onSubmit={SubmitDoctor}>
                  <h1>Inicio de sesion Doctores</h1> 
    
                  <span>Ingrese su correo y contraseña para iniciar sesion como doctor</span>
                  
                    <input ref={emailDoctorRef} type="email" placeholder="Correo" />
                    <input ref={passwordDoctorRef} type="password" placeholder="Contraseña" />
    
                  <button type="submit">Iniciar sesión</button>
              
                </form>
    
              ) : (
                <form onSubmit={SubmitPatient}>
                  <h1>Inicio de sesion Paciente</h1>
              
                  <span>Ingrese su correo y contraseña proporcioados por el doctor o administrador</span>
                
                    <input ref={emailPatientRef} type="email" placeholder="Correo" />
                    <input ref={passwordPatientRef} type="password" placeholder="Contraseña" />
    
                  <button type="submit">Iniciar sesión</button>
              
                </form>
              )}
          </div>
    
          <div className="toggle-container">
            
            <div className="toggle">
              <div className="toggle-panel toggle-left">
                <h1>¿Doctor?</h1>
                
                <p>Ingrese su correo y contraseña para iniciar sesion como Doctor</p>
                
                <button className="hidden" onClick={toggleForm}> Ir a Doctor </button>
              </div>
              
              <div className="toggle-panel toggle-right">
                <h1>¿Paciente?</h1>
                
                <p>Ingrese su correo y contraseña para iniciar sesion como Doctor</p>
                
                <button className="hidden" onClick={toggleForm}> Ir a Paciente </button>
              </div>
            </div>
          </div>
    
        </div>
        <ToastContainer />
      </div>
    );
}





