import React, { useState, useEffect } from "react";
import logo from "../assets/img/logo.png";
//import Loader from "../../components/Loader";
import { connect } from "react-redux";
import * as authAction from "../../actions/auth";
import { bindActionCreators } from "redux";
import RecoverPasswordComponent from "../../components/recoverPassword";
import stylesrp from './stylesrp.module.scss';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router'
import Image from 'next/image';
import Link from 'next/link';

function RecoverPassword(props: any) {

    
    const [messageError, setMessageError] = useState('');
    const [isSubmit, setIsSubmit] = useState(false);

    const router = useRouter();
    
    const [token, setToken] = useState(router.query.token);
    //const [token, setTokens] = useState(tokenPath);

    useEffect(()=>{
        ReactGA.send({ hitType: "pageview", page: '/recoverpassword' });
    },[])


    const onSubmit = (data: { password: string }) => {
        props.actions.resetPassword({
            token,
            password: data.password,
        });
    };

    return (

        <>
            <div className={stylesrp.container}>
                <div className={[stylesrp.card, stylesrp.shadow].join(' ')}>
                    <div className={stylesrp.cardBody}>
                        <div className={stylesrp.containerLogo}>
                        <Link href="/"><div className={stylesrp.divLogo}><Image src={logo} alt="Ecololgeo Logo" layout="fill" /></div></Link>
                        </div>
                        <hr />
                        {!props.dataResetPassword ? (
                            <RecoverPasswordComponent onSubmit={onSubmit} />
                        ) : (
                            <div className={stylesrp.successResetPassword}>
                                La constraseña se restableció con éxito
                            </div>
                        )}
                        {props.error && !props.dataResetPassword && (
                            <div className={stylesrp.successResetPassword}>
                                Ocurrió un error al restablecer la contraseña
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/*<Loader isloadin={props.isLoading}></Loader>*/}
        </>

    )
}

const mapStateToProps = (state: any) => ({
    dataResetPassword: state.auth.dataResetPassword,
    isLoading: state.auth.isLoading,
    error: state.auth.error,
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(authAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
