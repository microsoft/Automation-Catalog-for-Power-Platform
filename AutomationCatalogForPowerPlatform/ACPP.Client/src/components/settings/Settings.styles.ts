// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import breakpoints from "../../common/helpers/Breakpoints";

export const useStyles = makeStyles({
    root: {
        backgroundImage: 'none',
        width: '100vw',
        height: 'fit-content'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginLeft: '0.5%',
        height: '30px'
    },
    settingsSection: {
        paddingBottom: tokens.spacingVerticalXL,
        marginLeft: tokens.spacingHorizontalXL,
        marginRight: tokens.spacingHorizontalXL,
    },
    settingsSectionDescription: {
        marginBottom: tokens.spacingVerticalXL,
    },
    inputField: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalXXS,
        width: '400px',
        maxWidth: '100%',
        paddingLeft: tokens.spacingHorizontalXS,
    },
    displayCanvas: {
        maxWidth: '100%',
        height: '100%',
        ...shorthands.padding('1%', '5%'),
        ...breakpoints.md({
            backgroundColor: 'none',
            ...shorthands.margin('0%'),
            ...shorthands.padding('2%'),
            boxShadow: `0 0 0, 0 0 0`,
        }),
    },
});
