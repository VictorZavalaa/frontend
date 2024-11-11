import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './Components/ProtectedRoute.jsx';
import ProtectedRouteShared from './Components/ProtectedRouteShared.jsx';

//General
import Login from './views/Login.jsx';
import LoginAdmin from './views/LoginAdmin.jsx';

//Admin
import Administrador from './views/Administrador/Administrador.jsx';

import Administradores from './views/Administrador/Administradores.jsx';
import AdministradorForm from './Components/Administrador/Administradores/AdministradorForm.jsx';
import Doctores from './views/Administrador/Doctores.jsx';
import DoctorForm from './Components/Administrador/Doctor/DoctorForm.jsx';
import BaseDeDatos from './views/Administrador/BaseDeDatos.jsx';

//Doctor
import Doctor from './views/Doctor/Doctor.jsx';

import Citas from './views/Doctor/Citas.jsx';

import Recomendaciones from './views/Doctor/Recomendaciones.jsx';

import Seguimientos from './views/Doctor/Seguimientos.jsx';
import SeguimientoForm from './Components/Doctor/Seguimiento/SeguimientoForm.jsx';

//Paciente

import Paciente from './views/Paciente/Paciente.jsx';

import CitasPaciente from './views/Paciente/Citas.jsx';

//Admin y doctor
import Pacientes from './views/AdministradorYDoctor/Pacientes.jsx';
import PacienteForm from './Components/AdministradorYDoctor/PacienteForm.jsx';
import Sintomas from './views/AdministradorYDoctor/Sintomas.jsx';
import SintomaForm from './Components/AdministradorYDoctor/SintomaForm.jsx';
import Reportes from './views/AdministradorYDoctor/Reportes.jsx';
import CitaForm from './Components/Doctor/Cita/CitaForm.jsx';
import HistorialesClinicos from './views/AdministradorYDoctor/HistorialesClinicos.jsx';










const Router = createBrowserRouter([

    /* 
    
    Rutas de la aplicación 34 en total

    
    🎀-> Rutas creadas
    ✔️-> Rutas en proceso
    ⭐-> Rutas terminadas
    

    /✔️login                                  🎀-> Inicio de sesión para doctor y paciente
    /⭐✔️loginAdmin                             🎀-> Inicio de sesión para administrador

    /⭐✔️Administrador                          🎀-> Pagina principal del administrador

    /⭐✔️Administrador/Administradores          🎀-> Lista de administradores
    /⭐✔️Administrador/Administradores/new      🎀-> Registro de administrador
    /⭐✔️Administrador/Administradores/:idAdmin 🎀-> Actualizar administrador

    /✔️Administrador/Doctores                 🎀-> Lista de doctores
    /✔️Administrador/Doctores/new             -> Registro de doctor
    /✔️Administrador/Doctores/:idDoctor       -> Actualizar doctor

    /✔️Administrador/BaseDeDatos                 🎀-> base de datos

    /✔️Doctor                                    🎀-> Pagina principal del Doctor

    /✔️Doctor/Citas                              🎀-> Lista de citas
    /Doctor/Citas/new                       -> Registro de cita
    /Doctor/Citas/:idCita                   -> Actualizar cita

    /✔️Doctor/Recomendaciones                    🎀-> Lista de recomendaciones
    /Doctor/Recomendaciones/new             -> Registro de recomendacion
    /Doctor/Recomendaciones/:idRecomendacion-> Actualizar recomendacion

    /✔️Doctor/Seguimientos                       🎀-> Lista de seguimientos
    /Doctor/Seguimientos/new                 -> Registro de seguimiento
    /Doctor/Seguimientos/:idSeguimiento      -> Actualizar seguimiento

    /✔️Paciente                                  🎀-> Pagina principal del paciente

    /Paciente/Seguimientos                     🎀-> Lista de citas
    /Paciente/Citas                            🎀-> Lista de citas
    /Paciente/Consultas                        🎀-> Lista de consultas
    /Paciente/HistorialClinico                 🎀-> Historial clinico
    /Paciente/Recomendaciones                  🎀-> Lista de recomendaciones


    //*Solo admin y doctor para administrar pacientes*

    /✔️Pacientes                              🎀-> Lista de pacientes
    /✔️Pacientes/new                             🎀-> Registro de paciente
    /✔️Pacientes/:id                            🎀-> Actualizar paciente

    /✔️Reportes                                 🎀-> Lista de reportes

    /✔️Sintomas                                 🎀-> Lista de sintomas
    /Sintomas/new                             🎀-> Registro de sintoma
    /Sintomas/:idSintoma                      🎀-> Actualizar sintoma

    /✔️HistorialesClinicos                      🎀-> Lista de historiales clinicos





    
    */

    {
        path: '/', //Inicio de sesión para doctor y paciente
        element: <Login />,

    },

    {
        path: '/login', //Inicio de sesión para doctor y paciente
        element: <Login />,
    },

    {
        path: '/loginAdmin', //Inicio de sesión para administrador
        element: <LoginAdmin />,
    },


    //Administrador operaciones



    {
        path: '/Administrador', //Pagina principal del administrador
        element: ( 
            <ProtectedRoute role="admin"> 
                <Administrador /> 
            </ProtectedRoute>
        )   
    },

    {
        path: '/Administrador/Administradores', //Lista de administradores
        element: (
            <ProtectedRoute role="admin"> 
                <Administradores /> 
            </ProtectedRoute>
        )
    },

    {
        path: '/Administrador/Administradores/new', //Registro de administrador
        element: (
            <AdministradorForm key="AdministradorCreate"/>
        )
    },

    {
        path: '/Administrador/Administradores/:idAdmin', //Actualizar administrador
        element: (
            <ProtectedRoute role="admin"> 
                <AdministradorForm key="AdministradorUpdate"/>,
            </ProtectedRoute>
        )
    },



    

    {
        path: '/Administrador/Doctores', //Lista de doctores
        element: (
            <ProtectedRoute role="admin"> 
                <Doctores /> 
            </ProtectedRoute>
        )
    },

    

    {
        path: '/Administrador/Doctores/new', //Registro de doctor
        element: (
            <ProtectedRoute role="admin"> 
                <DoctorForm key="DoctorCreate"/>
            </ProtectedRoute>
        )
    },

    {
        path: '/Administrador/Doctores/:id', //Actualizar doctor
        element: (
            <ProtectedRoute role="admin"> 
                <DoctorForm key="DoctorUpdate"/>,
            </ProtectedRoute>
        )
    },

    

    {
        path: '/Administrador/BaseDeDatos', //base de datos
        element: (
            <ProtectedRoute role="admin"> 
                <BaseDeDatos /> 
            </ProtectedRoute>
        )

    },


    //Doctores operaciones

    

    {
        path: '/Doctor', //Pagina principal del Doctor
        element: (
            <ProtectedRoute role="doctor"> 
                <Doctor /> 
            </ProtectedRoute>
        )
    },


    

    {
        path: '/Doctor/Citas', //Lista de citas
        element: (
            <ProtectedRoute role="doctor"> 
                <Citas /> 
            </ProtectedRoute>
        )

    },

    

    {
        path: '/Doctor/Citas/new', //Registro de cita
        element: (
            <ProtectedRouteShared role="doctor"> 
                <CitaForm key="CitaCreate"/>
            </ProtectedRouteShared>
        )

    },

    

    {
        path: '/Doctor/Citas/:id', //Actualizar cita
        element: (
            <ProtectedRouteShared role="doctor"> 
                <CitaForm key="CitaUpdate"/>,
            </ProtectedRouteShared>
        )

    },


    {
        path: '/Doctor/Recomendaciones', //Lista de recomendaciones
        element: (
            <ProtectedRoute role="doctor"> 
                <Recomendaciones /> 
            </ProtectedRoute>
        )

    },


    {
        path: '/Doctor/Citas/:id/Seguimientos', //Lista de seguimientos
        element: (
            <ProtectedRouteShared role="doctor"> 
                <Seguimientos  /> 
            </ProtectedRouteShared>
        )

    },



    {
        path: '/Doctor/Citas/:idC/Seguimientos/new', //Registro de seguimiento
        element: (
            <ProtectedRoute role="doctor"> 
                <SeguimientoForm key="SeguimientoCreate"/>
            </ProtectedRoute>
        )

    },

    {
        path: '/Doctor/Citas/:idC/Seguimientos/:id', //Actualizar seguimiento
        element: (
            <ProtectedRouteShared role="doctor"> 
                <SeguimientoForm key="SeguimientoUpdate"/>,
            </ProtectedRouteShared>
        )

    },

    {
        path: '/Diagnostico_Sintoma', //Registro de diagnostico_sintoma
        element: (
            <ProtectedRoute role="doctor"> 
                <SeguimientoForm key="DiagnosticoSintomaCreate"/>
            </ProtectedRoute>
        )
    },


    /* 

    {
        path: '/Doctor/Recomendaciones/new', //Registro de recomendacion
        element: (
            <ProtectedRoute role="doctor"> 
                <RecomendacionForm key="RecomendacionCreate"/>
            </ProtectedRoute>
        )

    },

    {
        path: '/Doctor/Recomendaciones/:idRecomendacion', //Actualizar recomendacion
        element: (
            <ProtectedRoute role="doctor"> 
                <RecomendacionForm key="RecomendacionUpdate"/>,
            </ProtectedRoute>
        )

    },

    */


    //Pacientes operaciones


    {
        path: '/Paciente', //Pagina principal del paciente
        element: (
            <ProtectedRoute role="paciente"> 
                <Paciente /> 
            </ProtectedRoute>
        )

    },

    /*

    {
        path: '/Paciente/Seguimientos', //Lista de citas
        element: (
            <ProtectedRoute role="paciente"> 
                <SeguimientosPaciente /> 
            </ProtectedRoute>
        )

    },

    */

    {
        path: '/Paciente/Citas', //Lista de citas
        element: (
            <ProtectedRoute role="paciente"> 
                <CitasPaciente /> 
            </ProtectedRoute>
        )

    },

    /*

    {
        path: '/Paciente/Consultas', //Lista de consultas
        element: (
            <ProtectedRoute role="paciente"> 
                <ConsultasPaciente /> 
            </ProtectedRoute>
        )

    },

    {
        path: '/Paciente/HistorialClinico', //Historial clinico
        element: (
            <ProtectedRoute role="paciente"> 
                <HistorialClinicoPaciente /> 
            </ProtectedRoute>
        )

    },

    {
        path: '/Paciente/Recomendaciones', //Lista de recomendaciones
        element: (
            <ProtectedRoute role="paciente"> 
                <RecomendacionesPaciente /> 
            </ProtectedRoute>
        )

    },

*/

    //Accesso admin y doctores para administrar pacientes

    {
        path: '/Pacientes', //Lista de pacientes
        element: (
            <ProtectedRouteShared role="admin">
                <Pacientes /> 
            </ProtectedRouteShared>
        )

    },

    
    

    {
        path: '/Pacientes/new', //Registro de paciente
        element: (
            <ProtectedRouteShared role="admin"> 
                <PacienteForm key="PacienteCreate"/>
            </ProtectedRouteShared>
        )

    },

    {
        path: '/Pacientes/:id', //Actualizar paciente
        element: (
            <ProtectedRouteShared role="admin"> 
                <PacienteForm key="PacienteUpdate"/>,
            </ProtectedRouteShared>
        )

    },

    

    //solo admin y doctor para administrar reportes y sintomas

    {
        path: '/Reportes', //Lista de reportes
        element: (
            <ProtectedRouteShared role="admin"> 
                <Reportes /> 
            </ProtectedRouteShared>
        )

    },

    

    {
        path: '/Sintomas', //Lista de sintomas
        element: (
            <ProtectedRouteShared role="admin"> 
                <Sintomas /> 
            </ProtectedRouteShared>
        )

    },



    {
        path: '/Sintomas/new', //Registro de sintoma
        element: (
            <ProtectedRouteShared role="admin"> 
                <SintomaForm key="SintomaCreate"/>
            </ProtectedRouteShared>
        )

    },


    {
        path: '/Sintomas/:id', //Actualizar sintoma
        element: (
            <ProtectedRouteShared role="admin"> 
                <SintomaForm key="SintomaUpdate"/>,
            </ProtectedRouteShared>
        )

    },

    

    //Solo accesso para admin y doctoer para ver historiales clinicos

    {
        path: '/HistorialesClinicos', //Lista de historiales clinicos
        element: (
            <ProtectedRouteShared role="admin">
                <HistorialesClinicos /> 
            </ProtectedRouteShared>
        )

    },

    




























]);

export default Router;