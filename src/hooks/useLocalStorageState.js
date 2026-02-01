import { useState, useEffect } from "react";

export function useLocalStorageState(initialState, key) {

  // Inicializamos el estado leyendo de localStorage
  const [value, setValue] = useState(function () {
    const storedValue = localStorage.getItem(key);
    // Si hay datos, los convertimos de JSON
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  // Cada vez que 'value' o 'key' cambien, actualizamos localStorage
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}