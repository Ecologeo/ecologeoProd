import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ModalDetail from '../modals/details';
import styles from '../styles/box.module.scss'
import { FaRegUser, FaFacebookSquare } from "react-icons/fa";
import { connect } from 'react-redux'
import * as authAction from '../../actions/auth'
import { bindActionCreators } from 'redux'
import { save, get } from '../../utils/SesionStorage';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Login from './login';
import Register from './register'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import config from '../../config';
import RecoverPassword from '../auth/recoverPassword';
import ReactGA from "react-ga4";
import CaretPositioning from '../foro/EditCaretPositioning';
import {handlerIsLogin} from './util';
import BtnFacebook from './btnFacebook';


const styleModal = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function useModalAuth(props: any) {

    const [show, setShow] = useState(props.show);
    const [option, setOption] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(true);
    const [password, setPassword] = useState('');
    const [dataLogin, setDataLogin] = useState<any>({});
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [validateData, setValidateData] = useState(false);
    const [sendCode, setSendCode] = useState(false);
    const [code, setCode] = useState('');
    const [validateEmail, setValidateEmail] = useState(false);
    const [emailPass, setEmailPass] = useState('');
    const [validEmailPass, setValidEmailPass] = useState(true);
    const [idUserRegister, setIdUserRegister] = useState('');
    const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 })
    


    


    useEffect(() => {
        setShow(props.show);
    }, [props.show]);

    useEffect(() => {
        if (props.dataLogin !== undefined) {
            setDataLogin(props.dataLogin);
            handlerIsLogin(props.dataLogin);
        }
    }, [props.dataLogin])

    useEffect(() => {
        if(props.option){
            setOption(props.option)
        }
        
    },[props.option])

    useEffect(() => {
        if (props.data !== undefined) {
            setTitleError('Código de verificación');
            setMessageError('Enviamos el código a tu correo, ingresalo en el campo que dice "Código de 6 dígitos".');
            setOpenModal(true);
            setIdUserRegister(props.data._id);
            /*setDataLogin(props.data);
            const data = {
                token: props.data.token,
                user: {
                    name: props.data.name,
                    _id: props.data._id,
                    email: props.data.email,
                    email_confirm: props.data.email_confirm,
                    role: props.data.role
                },
                process: 'register'
            }*/
            setSendCode(true)
            //handlerIsLogin(data);
        }
    }, [props.data])

    useEffect(() => {
        if (props.verifyEmail !== undefined) {
            setTitleError('Varificación del correo');
            setMessageError('Tu correo electrónico ha sido verificado con éxito!!! \n Ahora puedes comenzar a influir más en el mercado con tus compras ecológicas');
            setOpenModal(true);
            setValidateEmail(true);
            setDataLogin(props.verifyEmail);
            const data = {
                token: props.verifyEmail.token,
                user: {
                    name: props.verifyEmail.name,
                    _id: props.verifyEmail._id,
                    email: props.verifyEmail.email,
                    email_confirm: props.verifyEmail.email_confirm,
                    role: props.verifyEmail.role
                },
                process: 'register'
            }
            handlerIsLogin(data);
        }

    }, [props.verifyEmail])

    

    useEffect(() =>{
        if (props.dataRecover !== undefined) {
            setTitleError('Recuperar contraseña');
            setMessageError('Enviamos a tu correo un enlace para restablecer la contraseña, sigue los pasos que se indican en el correo.');
            setOption(1);
            setEmailPass('');
            setValidEmailPass(true);
            setOpenModal(true);
            props.actions.clearRegister();
        }

    },[props.dataRecover])

    



    useEffect(() => {
        if (props.error) {
            if (props.error.status === 400) {
                setTitleError('Error en la operación');
                setMessageError(props.error.message);
            } else if (props.error.status === 401) {
                setTitleError('Ocurrió un error');
                setMessageError('Revisa los datos que has ingresado y vuelve a intentarlo');
            } else {
                setTitleError('Ocurrió un error');
                setMessageError('Por favor comunícate con soporte');
            }
            setOpenModal(true);
        }


    }, [props.error])


    const onLogin = (e: any) => {
        e.preventDefault();
        if ((email !== null || email !== '') || (password !== null || password !== '')) {
            const data = {
                username: email,
                password: password,
                tokenDivece: ""
            }
            ReactGA.event({
                category: "Auth",
                action: "login",
                label: "User login", // optional
            })
            props.actions.login(data);
        } else {
            setTitleError('Validación');
            setMessageError('Debe ingresar todos los campos');
            setOpenModal(true);
        }
    }

   

    const onRegister = (e: any) => {
        e.preventDefault();
        try{
            if ((name !== null && name !== '') &&
            (email !== null && email !== '') &&
            (password !== null && password !== '')) {

            const data = {
                name: name.trim(),
                email: email,
                password: password,
                tokenDivece: "",
                role: "noData"
            }
            ReactGA.event({
                category: "Auth",
                action: "Register",
                label: "User Register", // optional
            })
            props.actions.register(data);
        } else {
            setTitleError('Validación');
            setMessageError('Debe ingresar todos los campos');
            setOpenModal(true);
        }
        }catch(e){
            console.log("e: ", e);
        }
        
        
    }

    const onValidate = (e: any) => {
        e.preventDefault();
        if ((code == null || code === "" || !Number.isInteger(Number(code)) || code.length !== 6)) {
            setTitleError('Validación');
            setMessageError('Ingresa el código enviado a tu correo');
            setOpenModal(true);
        } else {
            //let token = get('@token');
            let data = {
                code: Number(code),
                id_user: idUserRegister
            }

            ReactGA.event({
                category: "Auth",
                action: "verifyCode",
                label: "Verify code", // optional
            })

            props.actions.verifyCode(data);
        }

    }

    const onChangeText = (e: any) => {

        if ((name.trim() !== null && name.trim() !== '' && name.trim().length > 3) &&
            (email !== null && email !== '' && /^[a-z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) &&
            (password !== null && password !== '' && password.length > 4)) {
            setValidateData(true);
        } else {
            setValidateData(false);
        }

        //let savedCaretPosition = CaretPositioning.saveSelection(e.currentTarget);
        
        switch (e.target.name) {
            case 'name':                
                setName(e.target.value);        
                break;
            case 'email':
                setValidEmail(/^[a-z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value))
                setEmail(e.target.value)
                //setTimeout(() => setEmail(e.target.value), 500);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
            case 'code':
                setCode(e.target.value);
                break;
            case 'emailPass':
                setValidEmailPass(/^[a-z0-9._%+-]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(e.target.value))
                setEmailPass(e.target.value);
                break;
        }
        //setCaretPosition(savedCaretPosition);

    }

    const handleClose = () => {
        if (validateEmail) {
            window.location.href = "/";
        }
        setOpenModal(false);
    }


    const onRecoverPassword = () =>{
        if(validEmailPass && emailPass !== ''){
            props.actions.recoverPassword({ email: emailPass }) 
        }else{
            setTitleError('Validación');
            setMessageError('El formato del correo no es correcto, verificalo e intentalo nuevamente');
            setOpenModal(true); 
        }
        
    }

    const renderForms = (option: number) => {
        switch (option) {
            case 1:
                return (
                    <>
                        <div className={styles.boxLogin} onClick={() => setOption(2)}>
                            <div className={styles.iconBox}> <FaRegUser size={25} /> </div>
                            <div className={styles.textBox}> Iniciar con el correo electrónico </div>
                        </div>

                        <BtnFacebook />
                    </>
                )
            case 2:
                return (
                    <Login
                        email={email}
                        password={password}
                        onChangeText={onChangeText}
                        onLogin={onLogin}
                        setOption={setOption}
                        validEmail={validEmail}
                        caretPosition={caretPosition} />
                )
            case 3:
                return (
                    <Register
                        name={name}
                        email={email}
                        password={password}
                        code={code}
                        validEmail={validEmail}
                        onChangeText={onChangeText}
                        onRegister={onRegister}
                        onValidate={onValidate}
                        validateData={validateData}
                        sendCode={sendCode}
                    />
                )
            case 4:
                return (
                    <RecoverPassword 
                    emailPass={emailPass}
                    validEmail={validEmailPass}
                    onChangeText={onChangeText}
                    onRecoverPassword={onRecoverPassword}
                    />
                )
        }
    }

    return (
        <ModalDetail
            onClose={props.closeModal}
            onBack={() => setOption(1)}
            show={show}
            option={option}
            title={option === 3 ? "Regístrate en Ecologeo" : "Iniciar sesión en Ecologeo"}
            render={
                <div>
                    {renderForms(option)}
                    <div className={styles.footerLogin}>
                        {option === 3 ? <span>¿Tienes cuenta? <span onClick={() => setOption(2)} className={styles.register}> Inicia Sesión</span></span>
                            : <span>¿No tienes cuenta? <span onClick={() => setOption(3)} className={styles.register}> Regístrate</span></span>
                        }

                    </div>
                    <Modal
                        open={openModal}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={styleModal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {titleError}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '15px' }}>
                                {messageError}
                            </Typography>
                            <Button variant="outlined" onClick={handleClose}>Ok</Button>
                        </Box>
                    </Modal>
                    {props.isLoading ?
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={props.isLoading}
                        >
                            <CircularProgress color="success" />
                        </Backdrop> : null
                    }

                </div>
            }
        />
    )
}

const mapStateToProps = (state: any) => ({
    dataLogin: state.auth.dataLogin,
    isLoading: state.auth.isLoading,
    data: state.auth.data,
    verifyEmail: state.auth.verifyEmail,
    dataRecover: state.auth.dataRecover,
    error: state.auth.error,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(authAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(useModalAuth);