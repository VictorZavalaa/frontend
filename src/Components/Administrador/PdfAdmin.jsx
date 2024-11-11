
export default function PdfAdmin() {

    const handleButtonClick = () => {
        window.location.href = "http://localhost:8000/api/administrador-pdf";
    }
       




    return (
        <div>
            <button className="btn btn-primary" onClick={handleButtonClick} >Generar PDF</button>
        </div>
    )

    //Configurar el pdf para que que tengas que tener un token de accesso para tener acceso a la pagina del pdf, si no es inseguro 

}