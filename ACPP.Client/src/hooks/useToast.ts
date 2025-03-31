import { useState } from "react";

export const useToast = () => {

    const [message, setMessage] = useState("");
    const [intent, setIntent] = useState("");

    const updateToastState = (messageState: string, intentState: string) => {
        setMessage(messageState);
        setIntent(intentState);
    }

    return { message, intent, updateToastState };
}