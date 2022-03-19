import React, { useState, useEffect, useRef} from 'react';
import styles from '../styles/box.module.scss'
import stylesHome from '../../pages/home/style.module.scss';
import CaretPositioning from '../foro/EditCaretPositioning';
import {useCaretPosition} from '../utils/caretInput';
import TextField from '@mui/material/TextField';
import BtnFacebook from './btnFacebook';


export default function Login(props: any) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [start, setStart] = useState(0);
    const [validEmail, setValidEmail] = useState(true);
    //const { ref: refEmail, updateCaret: upCaretEMail } = useCaretPosition();

    const refEmail = useRef<any>(null);
    const refPass = useRef<any>(null);

    useEffect(()=>{
        if(email){refEmail.current.setSelectionRange(start,start);}
    },[email])

    useEffect(()=>{
        if(password){refPass.current.setSelectionRange(start,start);}
    },[password])

    useEffect(() => {
        setEmail(props.email);       
    }, [props.email])

    useEffect(() => {
        setPassword(props.password);        
    }, [props.password])

    useEffect(() => {
        setValidEmail(props.validEmail);
    }, [props.validEmail])

      const onChangeInput = (e:any) =>{
        const { selectionStart } = e.currentTarget;
        setStart(selectionStart);
        props.onChangeText(e)
      }

   

    return (
        <>
            <p>Iniciar con el correo electrónico</p>

            <div className={[styles.boxInput, !validEmail? styles.fieldBad:''].join(' ')}>

            <input
                    ref={refEmail}
                    className={styles.field}
                    type="text"
                    name="email"
                    id="emailLogin"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e: any) => { onChangeInput(e) }}
                />
            </div>

            <div className={styles.boxInput}>
                <input
                    ref={refPass}
                    className={styles.field}
                    type="password"
                    name="password"
                    id="passLogin"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e: any) => { onChangeInput(e) }}
                />

            </div>

            <p>
                <a className={styles.linka} onClick={() => props.setOption(4)} >¿Olvidaste la contraseña?</a>
            </p>

            <button
                type="button"
                onClick={props.onLogin}
                className={stylesHome.loginButton} >
                Iniciar sesión
            </button>
            <p>O continuar con</p>
            <BtnFacebook />

        </>
    )
}