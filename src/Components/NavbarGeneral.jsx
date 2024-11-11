import logo from '../assets/h2h.png';
import { useNavigate } from 'react-router-dom';

const NavbarGeneral = () => {

  const navigate = useNavigate();

  const handleLogoClick = (ev) => {
    ev.preventDefault();

    navigate('/login');
  }

    return (
        <nav className="navbar navbar-expand-lg navbar-custom navbar-largo" >
          <div className="container-fluid">
            <a className="navbar-brand" href="#" onClick={handleLogoClick}>
              <img src={logo} alt="logo" width="30" height="24" className="d-inline-block align-text-top" />
            </a>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
      
            <div className="collapse navbar-collapse" id="navbarNav">
  
              <ul className="navbar-nav ms-auto">
  
                <li className="nav-item">
                  <a className="nav-link" href="/loginAdmin" > Administrador </a>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      );


}

export default NavbarGeneral;




