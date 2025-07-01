// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { useStyles } from './errorBox.styles'

export type ErrorProps = {
    errorTitle?: string;
    errorDescription?: string;
};

export default function ErrorBox(props: ErrorProps) {
    const { errorTitle, errorDescription } = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h3>{errorTitle ?? "An error occoured, please try again!"}</h3>
            <p>{errorDescription}</p>
        </div>
    );

}
