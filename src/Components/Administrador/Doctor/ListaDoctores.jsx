import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import '../../../styles/BarraBusqueda.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function ListaDoctores() {

    const [doctores, setDoctores] = useState([]);
    const [filteredDoctores, setFilteredDoctores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    // Para obtener los doctores
    useEffect(() => {
        getDoctores();
    }, []);


    // Para buscar un doctor
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredDoctores(doctores);
        } else {
            setFilteredDoctores(
                doctores.filter(doctor =>
                    doctor.NomDoc.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, doctores]);


    // Para eliminar un doctor
    const onDeleteClick = doctor => {

        Swal.fire({
            title: "Estás seguro?",
            text: "Una vez eliminado, no podrás recuperar este registro!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, bórralo!",
        }).then((result) => {
            
            if (result.isConfirmed) {
                axiosClient.delete(`/doctores/${doctor.id}`)
                .then(() => {

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El registro ha sido eliminado.",
                        icon: "success",
                    });

                    setTimeout(() => {
                        getDoctores();
                    }, 1000);

                }).catch((error) => {
                    console.error("Error al eliminar el doctor", error);
                });
            }
        }); 
    }


    // Para obtener los doctores
    const getDoctores = () => {
        setLoading(true);
        axiosClient.get('/doctores')
            .then(({ data }) => {
                setLoading(false);
                if (data && Array.isArray(data.data)) {
                    setDoctores(data.data);
                    setFilteredDoctores(data.data);
                } else {
                    console.error("La respuesta de la API no es un array");
                }
            }).catch((error) => {
                console.error("Error al obtener los doctores", error);
                setLoading(false);
            });
    };


    return (

        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar doctores por nombre..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <Link className="btn-add" to="/Administrador/Doctores/New">Nuevo Doctor</Link>
            </div>

            <div className="card animated fadeInDown">
            <div style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Especialidad</th>
                            <th>Correo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    {loading &&

                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Cargando doctores...
                                </td>
                            </tr>
                        </tbody>
                    }
                    {!loading &&
                        <tbody>
                            {filteredDoctores.map(u => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>{u.NomDoc}</td>
                                    <td>{u.ApePatDoc}</td>
                                    <td>{u.ApeMatDoc}</td>
                                    <td>{u.Especialidad}</td>
                                    <td>{u.email}</td>
                                    <td>
                                        <Link className="btn-edit" to={`/Administrador/Doctores/${u.id}`}>Editar</Link>
                                        &nbsp;
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