import { IDisplayCanvasProps } from "./IDisplayCanvasProps";
import { useStyles } from "./DisplayCanvas.styles";
import {
    Toast, Toaster,
    ToastIntent,
    ToastTitle, useId, useToastController
} from '@fluentui/react-components';
import { useToast } from "../../../hooks/useToast";
import { useEffect } from "react";
import { useBetween } from 'use-between';

export const DisplayCanvas: React.FC<IDisplayCanvasProps> = ({ children, className }: IDisplayCanvasProps) => {

    const styles = useStyles();

    const toasterId = useId("toaster");
    const { dispatchToast } = useToastController(toasterId);
    const useSharedToast = () => useBetween(useToast);
    const { message, intent, updateToastState } = useSharedToast();

    useEffect(() => {
        if (message && intent) {
            dispatchToast(
                <Toast>
                    <ToastTitle>{message as string}</ToastTitle>
                </Toast>,
                { intent: intent as ToastIntent }
            );
            updateToastState("", "");
        }
    }, [message, intent]);


    return (
        <div className={`${styles.root} ${className}`}>
            {children}
            <Toaster toasterId={toasterId} />
        </div>
    );

}