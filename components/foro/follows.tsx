import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import * as userAction from '../../actions/user';
import * as postAction from '../../actions/foro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import avatar from '../../pages/assets/img/avatar_default.png';
import Link from 'next/link'
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../pages/home/style.module.scss';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const AntTabs: any = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: '#1890ff',
    },
});

const typeUserData: any = {
    'noData': 'Tipo de usuario sin definir',
    'Consumer': 'Consumidor ecológico',
    'Company': 'Empresa'
}

const AntTab: any = styled((props: any) => <Tab disableRipple {...props} />)(
    ({ theme }) => ({
        textTransform: 'none',
        minWidth: 0,
        [theme.breakpoints.up('sm')]: {
            minWidth: 0,
        },
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(1),
        fontSize: '0.975rem',
        color: 'rgba(0, 0, 0, 0.85)',
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&.Mui-selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&.Mui-focusVisible': {
            backgroundColor: '#d1eaff',
        },
    }),
);

function TabPanel(props: any): any {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Follows(props: any) {
    const [type, setType] = React.useState(props.type ? (props.type === 'd' ? 0 : 1) : 0);

    const [dataFld, setDataFld] = useState([]);
    const [dataFls, setDataFls] = useState([]);
    const [typeSeleted, setTypeSeleted] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setType(newValue);
        if (dataFld.length === 0 && newValue === 0) {
            setTypeSeleted(newValue);
            props.actionsPost.getFollows({ type: newValue+1, idUser: props.id_user })
        }
        if (dataFls.length === 0 && newValue === 1) {
            setTypeSeleted(newValue);
            props.actionsPost.getFollows({ type: newValue+1, idUser: props.id_user })
        }
    };

    useEffect(() => {
        setTypeSeleted(type);
        props.actions.getUser({ user_id:props.id_user });
        props.actionsPost.getFollows({ type: type+1, idUser: props.id_user })

    }, [])

    useEffect(() => {
        if (props.dataFollows) {
            if (typeSeleted === 0) {
                setDataFld(props.dataFollows)
            } else {
                setDataFls(props.dataFollows)
            }
        }

    }, [props.dataFollows])

    const renderFollow = (val: any, id: any) => {
        return (
            <div key={id} style={{ marginBottom: '15px' }}  >
                <div className="linkAll">
                    <Link href={"/eco/" + val.userName}>
                        {val.hasOwnProperty('path_avatar') ?
                            <Image
                                src={val.path_avatar}
                                alt="Avatar"
                                className="avatar"
                                width="40" height="40" /> :
                            <Image
                                src={avatar}
                                alt="Avatar"
                                className="avatar"
                                width="40" height="40" />}

                    </Link>
                    <Link href={"/eco/" + val.userName} >
                        <div style={{ marginLeft: '10px' }}>
                            <span >{val.name}</span>
                            <div className={styles.textFollow}>
                                {typeUserData[val.role]}
                            </div>
                        </div>
                    </Link>
                </div>

            </div>
        )
    }




    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AntTabs value={type} onChange={handleChange} aria-label="basic tabs example">
                    <AntTab label="Seguidos" {...a11yProps(0)} />
                    <AntTab label="Seguidores" {...a11yProps(1)} />
                </AntTabs>
            </Box>
            <TabPanel value={type} index={0}>
                {
                    dataFld.length > 0 ?
                        dataFld.map((val: any, id: any) => (
                           <div>{renderFollow(val.user, id)}</div> 
                        )) :
                        <div>
                            {props.isLoading ?
                                <CircularProgress color="success" /> :
                                <span>No tiene seguidos</span>
                            }

                        </div>}
            </TabPanel>
            <TabPanel value={type} index={1}>
                {
                    dataFls.length > 0 ?
                        dataFls.map((val: any, id: any) => (
                            <div>{renderFollow(val.user, id)}</div> 
                         )) :
                        <div>
                            {props.isLoadingSearchPost ?
                                <CircularProgress color="success" /> :
                                <span>No tiene seguidores</span>
                            }

                        </div>}
            </TabPanel>
        </Box>
    );
}

const mapStateToProps = (state: any) => ({
    isLoadingFollows: state.foro.isLoadingFollows,
    dataFollows: state.foro.dataFollows,
    errorFollows: state.foro.errorFollows,
    typeFollow: state.foro.typeFollow,
    dataDelFollows: state.foro.dataDelFollows,
    isLoadingDelFollows: state.foro.isLoadingDelFollows,
    dataCountFollows: state.foro.dataCountFollows
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch),
    actionsPost: bindActionCreators(postAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Follows);