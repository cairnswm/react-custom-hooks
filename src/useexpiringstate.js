import { useState, useEffect } from "react";

const useExpiringState = (defaultValue, delay = 500) => {
  const [value, setValue] = useState(defaultValue);
  const [tempValue, setTempValue] = useState(defaultValue);

  useEffect(() => {
    setValue(tempValue);
    const timeoutId = setTimeout(() => {
      setValue(defaultValue);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [tempValue]);

  return [value, setTempValue];
};

export default useExpiringState;