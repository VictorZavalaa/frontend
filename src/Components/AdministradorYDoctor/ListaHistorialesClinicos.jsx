import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import '../../styles/BarraBusqueda.css';
import { FaFileDownload } from "react-icons/fa";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function ListaPacientes() {

    const [pacientes, setPacientes] = useState([]);
    const [filteredPacientes, setFilteredPacientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    // Para obtener los pacientes
    useEffect(() => {
        getPacientes();
    }, []);

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


    // Para obtener los pacientes
    const getPacientes = () => {
        setLoading(true);
        axiosClient.get('/pacientes')
            .then(({ data }) => {

                setLoading(false);

                if(data && Array.isArray(data.data)) {
                    setPacientes(data.data);
                    setFilteredPacientes(data.data);
                } else {
                    console.log("Error al obtener los pacientes");
                }
            }).catch((error) => {
                console.error(error);
            });
    };


    // Para descargar el historial clínico de un paciente
    const onDownloadClick = async (id) => {

        try {

            const response = await axiosClient.get(`/historialClinico/${id}`, {
                responseType: 'blob'
            });

            //Crear un enlace temporal para descargar el archivo
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `historial_${id}.pdf`);
            document.body.appendChild(link);
            link.click();

            MySwal.fire({
                title: "¡Descarga exitosa!",
                text: "El historial ha sido descargado correctamente.",
                icon: "success"
            });

        } catch (error) {
            console.error('Error al descargar el historial clínico: ', error);

            MySwal.fire({
                title: "¡Error en la descarga!",
                text: "Error al descargar el historial clínico.",
                icon: "error"
            });
        }
    };






    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar historial por paciente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div className="card animated fadeInDown">
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr >
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Apellido Paterno</th>
                                <th>Apellido Materno</th>
                                <th>Correo</th>
                                <th>Descargar Historial</th>
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
                                    <tr key={u.id} className="text-center">
                                        <td>{u.id}</td>
                                        <td>{u.NomPac}</td>
                                        <td>{u.ApePatPac}</td>
                                        <td>{u.ApeMatPac}</td>
                                        <td>{u.email}</td>
                                        <td>
                                            <button key={u.id} className="btn-edit" onClick={() => onDownloadClick(u.id)}><FaFileDownload /></button>
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