// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import breakpoints from '../../common/helpers/Breakpoints';

export const useStyles = makeStyles({
    homeHeader: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        ...shorthands.margin('2%', '5%'),
        ...breakpoints.md({
            ...shorthands.margin('2%', '2%')
        })
    },
    headerText: {
        color: tokens.colorNeutralForegroundOnBrand,
        ...breakpoints.lg({
            display: 'none'
        })
    },
    automationsData: {
        margin:'50px 0 50px 50px',
        ...breakpoints.md({
            margin:'10px 0 0 10px'
        }),
        ...breakpoints.sm({
            margin:'10px 0 0 10px'
        }),
        ...breakpoints.xs({
            margin:'10px 0 0 10px'
        }),
    },
    myProfileContainer:{
        flexDirection: 'column',
        display: 'flex',
    },
    stats:{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '15px',
        gap: '51px',
        alignSelf: 'stretch',
        ...breakpoints.md({
            gap: '10px',
        }),
        ...breakpoints.sm({
            gap: '5px',
        }),
        ...breakpoints.xs({
            gap: '5px',
        }),
    },
    statItem:{
        display: 'flex',
        flexDirection: 'column',
        marginRight: '40px',
    },
    statHeader:{
        color: tokens.colorNeutralForeground1,
        fontSize: '18px',
        fontWeight: 400,
        fontStyle: 'normal',
        lineHeight: '24px',
        ...breakpoints.md({
            marginLeft: '8px',
        }),
    },
    statHeaderMobile:{
        ...breakpoints.sm({
            marginBottom: '20px',
        }),
    },
    statNumberContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...breakpoints.md({
            marginLeft: '4px',
        }),
    },
    statNumber:{
        color: tokens.colorNeutralForeground1,
        fontSize: '74px',
        fontWeight: 400,
        margin: '40px 0 0 3px',
        alignSelf: 'stretch',
        ...breakpoints.md({
            fontSize: '61px',
        }),
    },
    statHours:{
        fontSize: '26px',
        fontStyle: 'normal',
        fontWeight: 700,
        margin: '60px 0 0 18px',
        ...breakpoints.md({
            fontSize: '61px',
            fontWeight: 400,
            margin: '37px 0 0 3px',
        }),
        ...breakpoints.sm({
            fontSize: '61px',
            fontWeight: 400,
            margin: '37px 0 0 3px',
        }),
        ...breakpoints.xs({ 
            fontSize: '61px',
            fontWeight: 400,
            margin: '37px 0 0 3px',
        }),
    },
    installationDataPeriod:{
        fontSize: '14px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '20px',
        margin: '24px 0 10px 15px',
        color: tokens.colorNeutralForeground3,
    },
    automationsText: {
        color: tokens.colorNeutralForeground1,
        fontSize: '18px',
        fontWeight: 500,
        margin: '18px 0 15px 8px',
    },
    table:{
        maxWidth:'90%',
        marginLeft: '8px',
    },
    headerTableText:{
        fontWeight: 600,
    },
    text:{
        color: tokens.colorNeutralForeground3,
        fontSize: '14px',
    },
    linkColor:{
        color: '#005A9E',
        fontSize: '14px',
        cursor: 'pointer',
    },
    myProfile: {
        padding: '20px',
    },
    spinner: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDataText: {
        fontSize: '18px',
        fontWeight: 700,
        lineHeight: '20px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
    },
    //For mobile view
    listContainer:{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-between',
        fontSize: '14px',
        fontStyle: 'normal',
        lineHeight: '20px',
    },
    listRow:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: '20px',
    },
    listRowHeader:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '4px',
        flex: '1 0 0',
    },
    listSolutionName:{
        fontWeight: 600,
    },
    listTimeSavings:{
        color: tokens.colorNeutralForeground3,
    }
});
