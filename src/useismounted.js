import { useCallback, useEffect, useRef } from 'react'

// Code obtained from: https://www.codemzy.com/blog/ismounted-hook-with-useeffect-reactjs

const useIsMounted = () => {
  const isMounted = useRef(false);
  const isMountedFunction = useCallback(() => isMounted.current, []);

  useEffect(() => {
    isMounted.current = true; 

    return () => {
      isMounted.current = false; 
    }
  }, []);

  return isMountedFunction;
};

export default useIsMounted;
