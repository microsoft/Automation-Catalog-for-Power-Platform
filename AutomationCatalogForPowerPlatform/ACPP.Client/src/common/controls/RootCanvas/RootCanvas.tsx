// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { IRootCanvasProps } from "./IRootCanvasProps";
import { useStyles } from "./RootCanvas.styles";

export const RootCanvas: React.FC<IRootCanvasProps> = ({ children, className }: IRootCanvasProps) => {

    const styles = useStyles();

    return (
        <div className={`${styles.root} ${className}`}>
            {children}
        </div>
    );

}
