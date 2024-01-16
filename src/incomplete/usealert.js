import React, { memo } from "react";
import useExpiringState from "../useexpiringstate"

/**
 * This is a custom hook in JavaScript that creates an alert component with an expiring state.
 * @returns An object with properties: `message`, `setMessage` and `Alert`.
 * @param options - An object containing the properties passed to the usealert hook.
 * @param options.defaultValue - The default value of the alert.
 * @param options.delay - The delay of the alert.
 * @param options.variant - The variant of the alert. (Bootstrap variant)
 * @usage Use the Alert where you want it to be displayed. Then setMessage with the text to be displayed
 */
const usealert = (options) => {
    const [message, setMessage] = useExpiringState(options.defaultValue || "", options.delay || 4000);

    const DisplayAlert = () => {
        return (
            <Alert show={message !== ""} variant={options.variant || "danger"} transition={true} dismissible={options.dismissible || "false"}>{message}</Alert>
        );
    }

    const Alert = memo(DisplayAlert);

    return { message, setMessage, Alert };
}

export default usealert;