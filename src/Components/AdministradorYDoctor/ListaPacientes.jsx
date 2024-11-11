import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import '../../styles/BarraBusqueda.css';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function ListaPacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    // Para obtener los pacientes
    useEffect(() => {
        getPacientes();
    }, []);


    // Para buscar un paciente
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPacientes(pacientes);
        } else {
            setFilteredPacientes(
                pacientes.filter(paciente =>
                    paciente.NomPac.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, pacientes]);


    // Para eliminar un paciente
    const onDeleteClick = paciente => {

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
                axiosClient.delete(`/pacientes/${paciente.id}`)
                .then(() => {

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El registro ha sido eliminado.",
                        icon: "success",
                    });

                    setTimeout(() => {
                        getPacientes();
                    }, 1000);
                })
            }
        });
    }


    // Para obtener los pacientes
    const getPacientes = () => {
        setLoading(true);
        axiosClient.get('/pacientes')
            .then(({ data }) => {
                setLoading(false);
                if (data && Array.isArray(data.data)) {
                    setPacientes(data.data);
                    setFilteredPacientes(data.data);
                } else {
                    console.error("La respuesta de la API no es un array");
                }
            }).catch((error) => {
                console.error("Error al obtener los pacientes", error);
                setLoading(false);
            });
    };


    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar pacientes por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <Link className="btn-add" to="/Pacientes/new">Nuevo Paciente</Link>
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
                                <th>Correo</th>
                                <th>Telefono</th>
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
                                {filteredPacientes.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.NomPac}</td>
                                        <td>{u.ApePatPac}</td>
                                        <td>{u.ApeMatPac}</td>
                                        <td>{u.email}</td>
                                        <td>{u.TelPac}</td>
                                        <td>
                                            <Link className="btn-edit" to={`/Pacientes/${u.id}`}>Update</Link>
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
        </div>
    );
}