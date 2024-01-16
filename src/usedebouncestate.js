import { useState, useEffect } from "react";

const useDebounceState = (defaultValue, delay = 500) => {
  const [value, setValue] = useState(defaultValue);
  const [tempValue, setTempValue] = useState(defaultValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setValue(tempValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [tempValue]);

  return [value, setTempValue, tempValue];
};

export default useDebounceState;
