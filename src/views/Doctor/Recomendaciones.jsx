import NavbarDoctor from "../../Components/Doctor/NavbarDoctor.jsx";
import ListaRecomendaciones from "../../Components/Doctor/Recomendacion/ListaRecomendaciones.jsx";

export default function Recomendaciones() {

    return (
        <div>
            <NavbarDoctor />
            <h2> Recomendaciones </h2>
            <ListaRecomendaciones />
        </div>
    )
}