import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Importa useParams
import axiosClient from "../../../axiosClient.js";
import '../../../styles/BarraBusqueda.css';

export default function ListaSeguimientos() {
    const { id } = useParams(); // Extrae el id de la cita desde la URL
    const [seguimientos, setSeguimientos] = useState([]);
    const [filteredSeguimientos, setFilteredSeguimientos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    console.log("idCita", id);

    // Para obtener los seguimientos de la cita específica
    useEffect(() => {
        if (id) {
            getSeguimientos();
        }
    }, [id]);


    // Función para eliminar un seguimiento
    const onDeleteClick = (seguimiento) => {
        if (!window.confirm("¿Desea eliminar este seguimiento?")) {
            return;
        }
        axiosClient.delete(`/seguimientos/${seguimiento.id}`)
            .then(() => {
                getSeguimientos();
            });
    };

    // Para buscar una cita
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSeguimientos(seguimientos);
        } else {
            setFilteredSeguimientos(
                seguimientos.filter(seguimiento => {
                    const seguimientoDate = new Date(seguimiento.start).toLocaleDateString();
                    return seguimientoDate.includes(searchTerm.toLowerCase());
        })
            
            );
        }
    }, [searchTerm,seguimientos]);


    // Función para obtener los seguimientos de la cita con el id proporcionado
    const getSeguimientos = () => {
        setLoading(true);
        axiosClient.get('/doctor/citas/'+id+'/seguimientos')
            .then(({ data }) => {
                setLoading(false);
                if (Array.isArray(data)) {
                    setSeguimientos(data);
                    setFilteredSeguimientos(data);
                } else {
                    console.error("La respuesta de la API no es un array");
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error al obtener los seguimientos", error);
            });
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
                <Link className="btn-add" to={`/Doctor/Citas/${id}/Seguimientos/new`}>Nuevo seguimiento</Link>
            </div>

            <div className="card animated fadeInDown">
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Fecha</th>
                                <th>Detalle</th>
                                <th>Glucosa</th>
                                <th>Ritmo Cardíaco</th>
                                <th>Presión</th>
                                <th>Paciente</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        {loading &&
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">Loading...</td>
                                </tr>
                            </tbody>
                        }
                        {!loading &&
                            <tbody>
                                {filteredSeguimientos.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{new Date(u.FechSeg).toLocaleDateString()}</td>
                                        <td>{u.DetalleSeg}</td>
                                        <td>{u.Glucosa}</td>
                                        <td>{u.Ritmo_Cardiaco}</td>
                                        <td>{u.Presion}</td>
                                        <td>{u.NomPac}</td>
                                        <td>
                                            <Link className="btn-edit" to={`/Doctor/Citas/${u.idCita}/Seguimientos/${u.id}`}>Editar</Link>
                                            &nbsp;
                                            <button className="btn-delete" onClick={() => onDeleteClick(u)}>Eliminar</button>
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
