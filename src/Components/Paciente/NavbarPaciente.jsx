import logo from '../../assets/h2h.png';
import '../../styles/Navbar.css';
import { useStateContext } from '../../contexts/ContextProvider';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Iconos
import { VscAccount } from "react-icons/vsc";
import { FaCheckSquare } from "react-icons/fa";
import { HiAnnotation } from "react-icons/hi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaFileDownload } from "react-icons/fa";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);



const NavbarAdmin = () => {
  const { user, token, setUser, setToken, role, setRole } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/paciente')
      .then(({ data }) => {
        setUser(data);
      });
  }, [setUser]);

  const handleLogoClick = (ev) => {
    ev.preventDefault();
    navigate('/Paciente');
  };

  const onLogout = (ev) => {
    ev.preventDefault();

    try {
      axiosClient.post('/logoutPaciente')
        .then(({ data }) => {
          
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
        });
    } catch (error) {
      console.error(error);
    }
  };


  const onDownloadClick = () => {

    try {

      axiosClient.get('/historialClinico', {
        responseType: 'blob'
      }).then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', 'HistorialClinico.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();

        MySwal.fire({
          icon: 'success',
          title: 'Historial Clínico descargado',
          showConfirmButton: false,
          timer: 1500
        });
      });

    } catch (error) {
      console.error(error);

      MySwal.fire({
        icon: 'error',
        title: 'Error al descargar el historial clínico',
        showConfirmButton: false,
        timer: 1500
      });
    }

  };


  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
  <div className="container-fluid">
    <a className="navbar-brand" href="#" onClick={handleLogoClick}>
      <img src={logo} alt="logo" width="30" height="24" className="d-inline-block align-text-top" />
    </a>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse ms-auto" id="navbarNav">
      <ul className="navbar-nav me-auto"> 

        <li className="nav-item">
          <Link className="nav-link" to="/Paciente/Seguimientos" style={{color:'white'}}>Seguimientos</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/Paciente/Citas" style={{color:'white'}}><FaCheckSquare /> Citas</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/Paciente/Consultas" style={{color:'white'}}><HiOutlineBookOpen /> Consultas</Link>
        </li>
        
        <li className="nav-item">
          <Link className="nav-link" to="/Paciente/Recomendaciones" style={{color:'white'}}><HiAnnotation /> Recomendaciones</Link>
        </li>
        
      </ul>


      <ul className="navbar-nav ms-auto">
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: 'white' }}>
      Hola, {user.NomPac || 'Usuario'} <VscAccount />
    </a>
    <ul className="dropdown-menu dropdown-menu-end">
      <li><button className="dropdown-item" onClick={() => onDownloadClick()}><FaFileDownload /> Historial Clínico</button></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a href="#" onClick={onLogout} className="btn-edit">Logout</a></li>
    </ul>
  </li>
</ul>

    </div>
  </div>
  <ToastContainer />
</nav>

  );
};

export default NavbarAdmin;
