import axios from 'axios';
import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [processState, setProcessState] = useState('waiting');

  const request = useCallback( async (url) => {

    setProcessState('loading');

    try {
      const response = await axios.get(url);

      if (response.statusText !== 'OK') {
        throw new Error(`Could not fetch ${url}, status: ${response.statusText}`);
      }

      setProcessState('loaded');

      return response;
      
    } catch (e) {
      setProcessState('error');
      throw e;
    }
    
  }, []);

  return { processState, request };
};
