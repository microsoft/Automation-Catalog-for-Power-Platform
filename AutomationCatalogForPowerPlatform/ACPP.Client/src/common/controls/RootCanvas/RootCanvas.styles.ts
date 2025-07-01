// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import breakpoints from "../../helpers/Breakpoints";

export const useStyles = makeStyles({
    root: {
        display: "flex",
        backgroundImage: `linear-gradient(${tokens.colorBrandForeground1},${tokens.colorNeutralBackground1})`,
        backgroundColor: `transparent`,
        backgroundSize: 'auto 300px',
        backgroundRepeat: 'no-repeat',
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.margin("1%", "auto"),
        width: "95vw",
        maxWidth: "1280px",
        maxHeight: "100%",
        flexDirection: "column",
        ...breakpoints.md({
            width: "100vw",
            paddingTop: "10px",
        }),
        ...breakpoints.sm({
            backgroundImage: "none",
            paddingTop: "10px",
        })
    }
})
