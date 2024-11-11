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
import { TbReportSearch } from "react-icons/tb";
import { VscAccount } from "react-icons/vsc";
import { FaUser } from "react-icons/fa6";
import { CiViewList } from "react-icons/ci";
import { FaCheckSquare } from "react-icons/fa";



const NavbarAdmin = () => {
  const { user, token, setUser, setToken, role, setRole } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/doctor')
      .then(({ data }) => {
        setUser(data);
      });
  }, [setUser]);

  const handleLogoClick = (ev) => {
    ev.preventDefault();
    navigate('/Doctor');
  };

  const onLogout = (ev) => {
    ev.preventDefault();

    try {
      axiosClient.post('/logoutDoctor')
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
      <ul className="navbar-nav me-auto"> {/* Contenido alineado a la izquierda en modo normal */}
        <li className="nav-item">
          <Link className="nav-link" to="/Pacientes" style={{color:'white'}}   ><FaUser /> Pacientes</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Sintomas" style={{color:'white'}}><CiViewList />Sintomas</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Doctor/Citas" style={{color:'white'}}><FaCheckSquare />Citas</Link>
        </li>
      </ul>


      <ul className="navbar-nav ms-auto">
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" style={{ color: 'white' }}>
      Dr. {user.NomDoc || 'Usuario'} <VscAccount />
    </a>
    <ul className="dropdown-menu dropdown-menu-end">
      <li><Link className="dropdown-item" to="/HistorialesClinicos">Historiales clínicos</Link></li>
      <li><Link className="dropdown-item" to="/Reportes"><TbReportSearch /> Reportes</Link></li>
      <li><hr className="dropdown-divider" /></li>
      <li><a href="#" onClick={onLogout} className="dropdown-item">Logout</a></li>
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
