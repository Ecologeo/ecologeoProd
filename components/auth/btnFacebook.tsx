import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ModalDetail from '../modals/details';
import styles from '../styles/box.module.scss'
import { FaRegUser, FaFacebookSquare } from "react-icons/fa";
import { connect } from 'react-redux'
import * as authAction from '../../actions/auth'
import { bindActionCreators } from 'redux'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import config from '../../config';
import {handlerIsLogin} from './util';



function BtnFacebook(props: any) {

    useEffect(() => {
        if (props.dataFacebook !== undefined && props.dataFacebook !== "" && props.dataFacebook !== null) {
            const data = {
                token: props.dataFacebook.token,
                user: {
                    name: props.dataFacebook.name,
                    email_confirm: props.dataFacebook.email_confirm,
                    role: props.dataFacebook.role,
                    _id: props.dataFacebook._id,
                    path_avatar: props.dataFacebook.hasOwnProperty('path_avatar') ? props.dataFacebook.path_avatar : '',
                    email: props.dataFacebook.email
                }
            }
            handlerIsLogin(data);
        }
    }, [props.dataFacebook])

    const responseFacebook = (response: any) => {
        try{
            const data = {
                email: response.email,
                name: response.name,
                idFacebook: response.id,
                tokenFacebook: response.accessToken,
                path_avatar: response.picture.data.url,
                tokenDivece: '',
                role: 'noData',
            }
            props.actions.registerFacebook(data);
            }catch(e){
                console.log("e: ", e); 
            }
    }
   

    return (
        <FacebookLogin
                            appId={config.id_facebook}
                            autoLoad={false}
                            callback={responseFacebook}
                            fields="name,email,picture"
                            scope="public_profile"
                            isMobile={false}
                            render={(renderProps: any) => (
                                <div className={styles.boxLogin} onClick={renderProps.onClick} >
                                    <div className={styles.iconBox}> <FaFacebookSquare size={25} color="#3B5998" /> </div>
                                    <div className={styles.textBox}>
                                        Continuar con facebook
                                    </div>
                                </div>
                            )}
                        />
    )
}

const mapStateToProps = (state: any) => ({
    dataFacebook: state.auth.dataFacebook,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(authAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(BtnFacebook);