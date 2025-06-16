// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import breakpoints from "../../helpers/Breakpoints";

export const useStyles = makeStyles({
    root: {
        display: "flex",
        ...shorthands.borderRadius(tokens.borderRadiusMedium),
        ...shorthands.margin("1%", "5%"),
        flexDirection: "column",
        boxShadow: `0px 0.6px 1.8px ${tokens.colorNeutralShadowAmbient}, 0px 3.2px 7.2px ${tokens.colorNeutralShadowKey}`,
        backgroundColor: tokens.colorNeutralBackground1,
        ...breakpoints.md({
            ...shorthands.margin("1%", "0")
        }),
        ...breakpoints.sm({
            boxShadow: "none"
        })
    }
})
