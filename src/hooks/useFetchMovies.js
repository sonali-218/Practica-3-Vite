// Custom Hook para buscar películas en la API de OMDb según su término de búsqueda (query)
import { useEffect, useState } from "react";

// clave de API = (Open Movie Database API)
export const API_KEY = "37669abe";

/** Hook personalizado 
* @param {string} query - Término de búsqueda ingresado por el usuario
* @returns {Object} - Retorna:
* - movies encontradas
* - estado de carga de la solicitud
* - mensaje de error en caso de fallo
*/

export function useFetchMovies(query) {
    // almacenar pelis obtenidas
    const [movies, setMovies] = useState([]);

    // indicar si la solicitud está en curso
    const [isLoading, setIsLoading] = useState(false);

    // manear errores
    const [error, setError] = useState("");

    useEffect(() => {
        // si hay menos de 3 caracteres, limpiar y error
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }
        //** función asincrónica para las pelis de la API */
        async function fetchMovies() {
            try {
                setIsLoading(true); // inicia carga
                setError(null); // reinicia errores previos

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`); 

                if (!response.ok)
                    throw new Error("Error al cargar películas");

                const data = await response.json();

                // si la API responde con error:
                if (data.Response === "False")
                    throw new Error("No se encontraron resultados");

                // guardar pelis
                setMovies(data.Search);
            } catch (err) {
                // guardar mensaje de error y limpiar la lista
                setError(err.message);
                setMovies([]);
            } finally {
                setIsLoading(false) // finaliza estado de carga
            }
        }

        fetchMovies();
    }, [query]);

    // retornar valores
    return {movies, isLoading, error};
}