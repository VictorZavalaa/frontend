import axiosClient from '../axiosClient';

function DescargarCSV() {

    const downloadFile = (data) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'administradores.csv');
        document.body.appendChild(link);
        link.click();
    }

    const handleDownload = async () => {
        try {
            axiosClient.get('/export-csv', { responseType: 'blob' })
                .then(({ data }) => {
                    downloadFile(data);
                });
        } catch (error) {
            console.error('Error al descargar el archivo:', error);
        }
    };
    

    return <button onClick={handleDownload}>Descargar CSV</button>;
}

export default DescargarCSV;
