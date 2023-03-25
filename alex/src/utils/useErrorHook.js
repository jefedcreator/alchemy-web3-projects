// hooks/useRouteError.js
import { useState } from 'react';

function useRouteError() {
  const [error, setError] = useState(null);

  // Function to set the error
  const setRouteError = (error) => {
    setError(error);
  };

  // Function to clear the error
  const clearRouteError = () => {
    setError(null);
  };

  return { error, setRouteError, clearRouteError };
}

export default useRouteError;
