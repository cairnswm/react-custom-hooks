import usePubSub from "./usePubSub";
import { useState, useEffect } from "react";

export const useGlobalState = (storeName, initialValue) => {    

    const { data, subscribe, publish } = usePubSub(storeName, initialValue);

    const [value, setValue] = useState(data || initialValue);

    useEffect(() => {
        return subscribe(args => { 
            setValue(args); 
        }, data || initialValue);
    }, [subscribe, storeName, data, initialValue])

    const set = (val) => {
        if (typeof val === 'function') {
            val = val(value)
        }
        publish(val)
    }

    return [ value, set ]
}

export default useGlobalState;