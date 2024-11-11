import axios from 'axios';

//Creamos una instancia de axios con una URL base para no tener que repetir la URL en cada petición
const axiosClient = axios.create({
    baseURL: 'http://localhost:8000/api',
});

// Aqui se añade el token a la cabecera de la petición para que el backend pueda identificar al usuario
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    config.headers.Authorization = `Bearer ${token}`;

    //Log para ver el metodo y la url de la petición
    console.log("Request method: ", config.method );
    console.log("Request URL: ", config.url );

    return config;
});

// Aqui se controla si el token ha expirado o no es válido, en caso de que sea así se elimina del localstorage
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        try{
            const { response } = error;

            // Si el token ha expirado o no es válido se elimina del localstorage
            if(response.status === 401) {
                localStorage.removeItem("ACCESS_TOKEN");
            }

        } catch (err ) {
            console.error(err);
        }
        
            throw error; // Se lanza el error para que el componente que ha hecho la petición pueda manejarlo
    }
);

export default axiosClient;
            