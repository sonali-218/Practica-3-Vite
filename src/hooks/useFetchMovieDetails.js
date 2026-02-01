import { useEffect, useState } from "react";
import { API_KEY } from "./useFetchMovies";

/**
 * @param {string} selectedID - ID único para la peli seleccionada
 * @returns {Object} - retorna: movie, isLoading, error
 */

export function useFetchMovieDetails(selectedID) {
    const [movie, setMovie] = useState({});

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        // si no hay ID, limpiar el estado
        if (!selectedID) {
            setMovie({});
            setError("");
            return;
        }

        /** función asincrónica para detalles de la peli 
         * @param {string} selectedID - ID único de la peli a consultar
        */
       async function fetchMovieDetails(selectedID) {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedID}`);

                if (!response.ok)
                    throw new Error("Error al cargar los detalles de la película");

                const data = await response.json();

                setMovie(data);
            } catch (err) {
                setError(err.message);
                setMovie({});
            } finally {
                setIsLoading(false);
            }
       }

       fetchMovieDetails(selectedID);
    }, [selectedID]);

    return { movie, isLoading, error};
}