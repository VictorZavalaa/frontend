import React, { useState } from 'react';
import axiosClient from '../../axiosClient';
import { saveAs } from 'file-saver';
import axios from 'axios';

//No funcional, solo prueba


const CsvUploader = () => {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  // Manejar el cambio de archivo
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("Archivo seleccionado:", selectedFile); // Log para confirmar que el archivo se selecciona
    setFile(selectedFile);
  };


  // Enviar archivo al backend
  const handleUpload = async () => {

    console.log("Hola");
    if (!file || !file.name.endsWith('.sql')) {
      setMessage('Por favor selecciona un archivo .sql');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);


    try {
      const response = await axios.post('http://localhost:8000/api/uploadSQL', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
      console.log(response.data.message);
    } catch (error) {
      setMessage('Error al restaurar la base de datos');
    }

  };











  
  const handleDownload = async () => { // Descargar base de datos

    try {
      const response = await axiosClient.get('/backup', {
          responseType: 'blob', // Para recibir el archivo como Blob
      });

      // Crear un archivo con el nombre y contenido
      const file = new Blob([response.data], { type: 'application/sql' });
      const fileName = `backup_${new Date().toISOString().slice(0, 10)}.sql`;

      // Usar file-saver para descargar el archivo
      saveAs(file, fileName);
  } catch (error) {
      console.error('Error al descargar el respaldo:', error);
  }

  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', margin:'auto', marginTop:'50px' }}>
      <div>

        <input type="file" accept=".sql" onChange={handleFileChange} />
        <button onClick={handleUpload}>Enviar</button>
      </div>
      <div>
        <button onClick={handleDownload}>Descargar base de datos (.csv)</button>
      </div>
    </div>
  );
};

export default CsvUploader;
