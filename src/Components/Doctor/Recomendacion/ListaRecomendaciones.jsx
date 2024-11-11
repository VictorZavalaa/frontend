import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../../axiosClient.js';
import '../../../styles/BarraBusqueda.css';



export default function ListaRecomendaciones() {

    const [recomendaciones, setRecomendaciones] = useState([]);
    const [filteredRecomendaciones, setFilteredRecomendaciones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    //Modificar para recomendaciones en los tipos de dato y datos y links

    // Para obtener las recomendaciones
    useEffect(() => {
        getRecomendaciones();
    }, []);


    // Para buscar una recomendacion
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredRecomendaciones(recomendaciones);
        } else {
            setFilteredRecomendaciones(
                recomendaciones.filter(recomendacion =>
                    recomendacion.id.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, recomendaciones]);


    // Para eliminar una recomendacion
    const onDeleteClick = recomendacion => {
        // Implementar lógica de eliminación aquí
    }


    // Para obtener las recomendaciones
    const getRecomendaciones = () => {
        setLoading(true);
        axiosClient.get('/recomendaciones')
            .then(({ data }) => {
                setLoading(false);
                if (data && Array.isArray(data.data)) {
                    setRecomendaciones(data.data);
                    setFilteredRecomendaciones(data.data);
                } else {
                    console.error("La respuesta de la API no es un array");
                }
            }).catch((error) => {
                console.error("Error al obtener las recomendaciones", error);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar citas por id..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <Link className="btn-add" to="/Doctor/Citas/new">Nueva Cita</Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Motivo</th>
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
                            {filteredRecomendaciones.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.MotivoCita}</td>
                                    <td>{u.EstadoCita}</td>
                                    <td>
                                        <Link className="btn-edit" to={`/Doctor/Citas/${u.id}`}>Edit</Link>
                                        &nbsp;
                                        <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    }
                </table>
            </div>
        </div>
    );
}