import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import '../../../styles/BarraBusqueda.css';

import PdfAdmin from '../PdfAdmin';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export default function ListaAdministradores() {

    const [administradores, setAdministradores] = useState([]);
    const [filteredAdministradores, setFilteredAdministradores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    // Para obtener los administradores 
    useEffect(() => {
        getAdministradores();
    }, []);


    // Para buscar un administrador
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredAdministradores(administradores);
        } else {
            setFilteredAdministradores(
                administradores.filter(admin =>
                    admin.NomAdmin.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, administradores]);


    // Para eliminar un administrador
    const onDeleteClick = administrador => {

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
                axiosClient.delete(`/administradores/${administrador.idAdmin}`)
                .then(() => {

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El registro ha sido eliminado.",
                        icon: "success",
                    });

                    setTimeout(() => {
                        getAdministradores();
                    }, 1000);
                })
            }
        });
    }


    
    // Para obtener los administradores
    const getAdministradores = () => {
        setLoading(true);
        axiosClient.get('/administradores')
            .then(({ data }) => {
                setLoading(false);

                console.log("Administradores", data);



                if (data && Array.isArray(data.data)) {
                    setAdministradores(data.data);
                    setFilteredAdministradores(data.data);
                } else {
                    console.error("La respuesta de la API no es un array");
                }
            }).catch((error) => {
                console.error("Error al obtener los administradores", error);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar administradores por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <Link className="btn-add" to="/Administrador/Administradores/new">Nuevo Administrador</Link>
            </div>

            <div className="card animated fadeInDown">
            <div style={{ overflowX: "auto" }}>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>role</th>
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
                            {filteredAdministradores.map(u => (
                                <tr key={u.idAdmin}>
                                    <td>{u.idAdmin}</td>
                                    <td>{u.NomAdmin}</td>
                                    <td>{u.email}</td>
                                    <td>{u.TelAdmin}</td>
                                    <td>{u.role}</td>
                                    <td>
                                        <Link className="btn-edit" to={`/Administrador/Administradores/${u.idAdmin}`}>Update</Link>
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

            <PdfAdmin />


        </div>
    );
}