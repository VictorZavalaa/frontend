import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import '../../styles/BarraBusqueda.css';
import Swal from "sweetalert2";

//Cambiar el nombre del sintoma...


export default function ListaSintomas() {

    const [sintomas, setSintomas] = useState([]);
    const [filteredSintomas, setFilteredSintomas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');


    // Para obtener los sintomas
    useEffect(() => {
        getSintomas();
    }, []);


    // Para buscar un sintoma
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredSintomas(sintomas);
        } else {
            setFilteredSintomas(
                sintomas.filter(sintoma =>
                    sintoma.NomSintoma.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, sintomas]);


    // Para eliminar un sintoma
    const onDeleteClick = sintoma => {

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
                axiosClient.delete(`/sintomas/${sintoma.id}`)
                .then(() => {

                    Swal.fire({
                        title: "¡Eliminado!",
                        text: "El registro ha sido eliminado.",
                        icon: "success",
                    });
                    setTimeout(() => {
                        getSintomas();
                    }, 1000);
                })
            }
        });                  
    }


    // Para obtener los sintomas
    const getSintomas = () => {
        setLoading(true);
        axiosClient.get('/sintomas')
            .then(({ data }) => {
                setLoading(false);
                if (data && Array.isArray(data.data)) {
                    setSintomas(data.data);
                    setFilteredSintomas(data.data);
                } else {
                    console.error("La respuesta de la API no es un array");
                }
            }).catch((error) => {
                console.error("Error al obtener los sintomas", error);
                setLoading(false);
            });
    };

    return (
        <div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar sintomas por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
            </div>

            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
                <Link className="btn-add" to="/Sintomas/new">Nuevo Sintoma</Link>
            </div>

            <div className="card animated fadeInDown">
                <div style={{ overflowX: "auto" }}>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre del sintoma</th>
                                <th>Descripción</th>
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
                                {filteredSintomas.map(u => (
                                    <tr key={u.id}>
                                        <td>{u.id}</td>
                                        <td>{u.NomSintoma}</td>
                                        <td>{u.DescSintoma}</td>
                                        <td>
                                            <Link className="btn-edit" to={`/Sintomas/${u.id}`}>Update</Link>
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