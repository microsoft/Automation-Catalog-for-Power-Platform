// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, tokens } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
    validationStyles: {
        color: tokens.colorNeutralForegroundOnBrand,
    },
    searchBar: {
        width: '100%',
        maxWidth: '100%',
        ...breakpoints.sm({
            boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.14);'
        })
    }
});
