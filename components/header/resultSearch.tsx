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

const AntTabs:any = styled(Tabs)({
    borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
      backgroundColor: '#1890ff',
    },
  });
  
  const AntTab:any = styled((props: any) => <Tab disableRipple {...props} />)(
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

function TabPanel(props: any) {
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

function ResultSeach(props: any) {
    const [value, setValue] = React.useState(props.type?(props.type === 'c'?0:1):0);

    const [dataUser, setDataUser] = useState([]);
    const [dataPost, setDataPost] = useState([]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        if(dataPost.length === 0 && newValue==1){
            searchPost();
        }
        if(dataUser.length === 0 && newValue==0){
            searUser();
        }
    };

    useEffect(() => {
        if(value==0){
            searUser();
        }else{
            searchPost();
        }
        

    }, [])

    useEffect(() => {
        if (props.dataUser) {
            setDataUser(props.dataUser);
        }

    }, [props.dataUser])

    useEffect(() => {
        if (props.dataSearchPost) {
            setDataPost(props.dataSearchPost);
        }

    }, [props.dataSearchPost])

    

    const searchPost = () =>{
        const params = {
            pageSize: 10,
            pageNum: 1,
            term: props.term,
        }
        props.actionsPost.getSearchPost(params);
    }

    const searUser = () =>{
        const params = {
            pageSize: 100,
            pageNum: 1,
            userName: props.term,
        }
        props.actions.getUserByName(params);
    }

    

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <AntTabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <AntTab label="Cuentas" {...a11yProps(0)} />
                    <AntTab label="Productos" {...a11yProps(1)} />
                </AntTabs>
            </Box>
            <TabPanel value={value} index={0}>
                {
                    dataUser.length > 0 ?
                        dataUser.map((val: any, id: any) => (
                            <div key={id} style={{marginBottom: '15px'}}  >
                                <div  className="linkAll">
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
                                    <div style={{marginLeft: '10px'}}>
                                        <span >{val.name}</span>
                                        <div className={styles.textFollow}>
                                        <b>{val.totalFollows}</b> Seguidores
                                    </div>
                                    
                                    </div>
                                </Link>
                                </div>
                                
                            </div>
                        )) :
                        <div>
                            {props.isLoading?
                            <CircularProgress color="success" />:
                            <span>No se encontraron cuentas relacionadas con: {props.term}</span>
                            }
                            
                        </div>}
            </TabPanel>
            <TabPanel value={value} index={1}>
            {
                    dataPost.length > 0 ?
                        dataPost.map((val: any, id: any) => (
                            <div key={id} style={{marginBottom: '15px'}}  >
                                <div  className="linkAll" style={{borderRadius: '5px'}}>
                                <Link href={"/post/" + val.postMain._id}>
                                    {val.postMain.hasOwnProperty('urlImage') ?
                                        <Image
                                            src={val.postMain.urlImage}
                                            alt="Producto"
                                            width="100" height="100" /> :null}
                                        
                                </Link>
                                <div style = {{marginLeft: '15px'}}>
                                <Link href={"/post/" + val.postMain._id} >
                                    <span style={{ display:'block', marginBottom: '10px', fontWeight: "bold"}} >{val.value}</span>
                                </Link>
                                <span style={{color:'#b0b0b0',fontSize: '14px'}}>Por:</span>
                                <div className="linkAll" >
                                <Link href={"/eco/" + val.userPost._id} >
                                    {val.userPost.hasOwnProperty('path_avatar') ?
                                        <Image
                                            src={val.userPost.path_avatar}
                                            alt="Avatar"
                                            className="avatar"
                                            
                                            width="25" height="25" /> :
                                        <Image
                                            src={avatar}
                                            alt="Avatar"
                                            className="avatar"
                                            width="25" height="25" />}
                                        
                                </Link>
                                <Link href={"/eco/" + val.userPost._id} >
                                    <span style={{marginLeft: '10px', fontSize: '14px'}} >{val.userPost.name}</span>
                                </Link>
                                </div>
                                </div>
                                </div>
                                
                            </div>
                        )) :
                        <div>
                            {props.isLoadingSearchPost?
                            <CircularProgress color="success" />:
                            <span>No se encontraron productos con nombre: {props.term}</span>
                            }
                            
                        </div>}
            </TabPanel>
        </Box>
    );
}

const mapStateToProps = (state: any) => ({
    isLoading: state.user.isLoadingGetUsers,
    dataUser: state.user.dataUserByName,
    errorUser: state.user.errorUserByName,
    isLoadingSearchPost: state.foro.isLoadingSearchPost,
    dataSearchPost: state.foro.dataSearchPost,
    errorSearchPost: state.foro.errorSearchPost
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch),
    actionsPost: bindActionCreators(postAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultSeach);