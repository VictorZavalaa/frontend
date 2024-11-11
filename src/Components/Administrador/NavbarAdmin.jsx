import logo from '../../assets/H2H_Logo.png'; 
import '../../styles/Navbar.css';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Iconos
import { FaDatabase } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { FaUser } from "react-icons/fa6";
import { FaUserShield } from "react-icons/fa";
import { CiViewList } from "react-icons/ci";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const NavbarAdmin = () => {

  const {user, token, setUser, setToken, role, setRole } = useStateContext(); //Obtenemos el usuario y el token del contexto

  const navigate = useNavigate();
  
  

  useEffect(() => {
    axiosClient.get('/administrador')
    .then(({data}) => {
        setUser(data)
    })
  }, [setUser])

  const handleLogoClick = (ev) => {
    ev.preventDefault();

    navigate('/Administrador');
  }



  const onLogout = (ev) =>{
    ev.preventDefault();

    try{

      axiosClient.post('/logoutAdmin')
        .then(({data}) => {


          toast.info('Cerrando sesion', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });

          setTimeout(() => {
            console.log(data);
            setToken(null);
            setUser({});
            setRole(null);
            localStorage.clear();
            console.log('Sesion cerrada');
          }, 3000);

          setTimeout(() => {
            navigate('/login');
          }, 3000);
      })

    }catch(err){
      console.log('Hay un error en el logout: ', err);
    }    
  };



    return (
      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container-fluid">
          <a className="navbar-brand" href="#" onClick={handleLogoClick}>
            <img src={logo} alt="logo" width="60" height="50" className="d-inline-block align-text-top" />
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
    
          <div className="collapse navbar-collapse" id="navbarNav">

            <ul className="navbar-nav">

              <li className="nav-item">
                <Link className="nav-link" to="/Pacientes" style={{ color: 'white' }}><FaUser /> Pacientes</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/Administrador/Administradores" style={{ color: 'white' }}> <FaUserShield /> Administradores</Link>
              </li>

              <li className="nav-item">
              
                <Link className="nav-link" to="/Administrador/Doctores" style={{ color: 'white' }}><FaUserDoctor /> Doctores</Link>
              </li>

              <li className="nav-item">
              
                <Link className="nav-link" to="/Sintomas" style={{ color: 'white' }}><CiViewList />Sintomas</Link>
              </li>


            </ul>

            <ul className="navbar-nav ms-auto">

              <li className="nav-item dropdown">

                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: 'white' }} >
                  Admin: {user.NomAdmin || 'Usuario'} <VscAccount />
                </a>
    
                <ul className="dropdown-menu dropdown-menu-end">
                <li><Link className="nav-link" to="/HistorialesClinicos"> <TbReportSearch /> Historiales Clinicos</Link></li>
                  <li><Link className="nav-link" to="/Reportes"> <TbReportSearch /> Reportes</Link></li>
                  <li><Link className="nav-link" to="/Administrador/BaseDeDatos"> <FaDatabase /> Base de Datos</Link></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a href="#" onClick={onLogout} className="btn btn-light" >Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <ToastContainer />
      </nav>
    );
}

export default NavbarAdmin;