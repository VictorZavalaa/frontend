import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axiosClient.js";
import '../../../styles/BarraBusqueda.css';
import { useStateContext } from '../../../contexts/ContextProvider.jsx';

export default function ListaCitas() {


    const [citas, setCitas] = useState([]);
    const [filteredCitas, setFilteredCitas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { user } = useStateContext();


    // Para obtener las citas
    useEffect(() => {
        getCitas();
    }, []);


    // Para buscar una cita
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredCitas(citas);
        } else {
            setFilteredCitas(
                citas.filter(cita => {
                    const citaDate = new Date(cita.start).toLocaleDateString();
                    return citaDate.includes(searchTerm.toLowerCase());
        })
            
            );
        }
    }, [searchTerm, citas]);


    // Para eliminar una cita
    const onDeleteClick = cita => {
        if (!window.confirm("Desea eliminar esta cita?")) {
            return
        }
        axiosClient.delete(`/citas/${cita.id}`)
            .then(() => {
            getUsers()
            })
    }


    // Para obtener las citas
    const getCitas = () => {
        setLoading(true);
        axiosClient.get('/doctores/' + user.id + '/citas')
            .then(({ data }) => {
                setLoading(false);

                console.log("Citas", data);

                if (Array.isArray(data)) {
                    setCitas(data);
                    setFilteredCitas(data);
                }
                else {
                    console.error("La respuesta de la API no es un array");
                }
            }).catch((error) => {
                console.error("Error al obtener las citas", error);
            }
            );
                
    };

    
    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar por fecha (yyyy/mm/dd)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <Link className="btn-add" to="/Doctor/Citas/new">Nueva Cita</Link>
            </div>

            <div className="card animated fadeInDown">
            <div style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Motivo</th>
                            <th>Fecha</th>
                            <th>Doctor</th>
                            <th>Paciente</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    {loading &&
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {filteredCitas.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.motivo}</td>
                                    <td>{new Date(u.start).toLocaleDateString()}</td>
                                    <td>{u.Doc}</td>
                                    <td>{u.Pac}</td>
                                    <td>{u.Estado}</td>
                                    <td>
                                        <Link className="btn-edit" to={`/Doctor/Citas/${u.id}`}>Editar</Link>
                                        &nbsp;
                                        <Link className="btn-delete" to={`/Doctor/Citas/${u.id}/Seguimientos`}>Seguimiento</Link>&nbsp;
                                        <Link className="btn-edit" to={`/Doctor/Citas/${u.id}/Recomendaciones`}>Recomendaciones</Link>&nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
                </div>
                
            </div>

        </div>
    );
}