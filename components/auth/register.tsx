import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/box.module.scss'
import stylesHome from '../../pages/home/style.module.scss';
import BtnFacebook from './btnFacebook';

export default function Login(props: any) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [validateData, setValidateData] = useState(false);
    const [validEmail, setValidEmail] = useState(true);
    const [sendCode, setSendCode] = useState(false);
    const [start, setStart] = useState(0);

    const refName = useRef<any>(null);
    const refCode = useRef<any>(null);
    const refEmail = useRef<any>(null);
    const refPass = useRef<any>(null);

    useEffect(() => {
        if(name){refName.current.setSelectionRange(start,start);}
    }, [name])

    useEffect(()=>{
        if(email){refEmail.current.setSelectionRange(start,start);}
    },[email])

    useEffect(()=>{
        if(password){refPass.current.setSelectionRange(start,start);}
    },[password])

    useEffect(()=>{
        if(code){refCode.current.setSelectionRange(start,start);}
    },[code])


    useEffect(() => {
        setName(props.name);
    }, [props.name])

    useEffect(() => {
        setEmail(props.email);
    }, [props.email])

    useEffect(() => {
        setPassword(props.password);
    }, [props.password])

    useEffect(() => {
        setValidateData(props.validateData);
    }, [props.validateData])

    useEffect(() => {
        setValidEmail(props.validEmail);
    }, [props.validEmail])

    useEffect(() => {
        setCode(props.code);
    }, [props.code])

    useEffect(() => {
        setSendCode(props.sendCode);
    }, [props.sendCode])

    const onChangeInput = (e:any) =>{
        const { selectionStart } = e.currentTarget;
        setStart(selectionStart);
        props.onChangeText(e)
      }


    return (
        <>
            <p>Registrate con el correo electrónico</p>

            <div className={styles.boxInput}>
                <input
                    ref={refName}
                    className={styles.field}
                    type="text"
                    name="name"
                    placeholder="Nombres completos"
                    value={name}
                    onChange={(e: any) => { onChangeInput(e) }}
                />
            </div>

            <div className={[styles.boxInput, !validEmail? styles.fieldBad:''].join(' ')}>
                <input
                    ref={refEmail}
                    className={styles.field}
                    type="text"
                    name="email"
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
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e: any) => { onChangeInput(e) }}
                />

            </div>

            <p style={{fontSize:"12px"}}>
              Al continuar  acepta los <a style={{fontSize: "14px", color: "#8EC0D8"}} target="_blank" rel="noreferrer" href="https://ecologeo.com/condition">términos y condiciones</a>
            </p>

            <div className={styles.InputButton}>
                <div className={styles.divBox}>
                    <input 
                        ref={refCode}
                        className={styles.field} 
                        type="text"
                        name="code"
                        value={code}
                        autoComplete="off"
                        onChange={(e: any) => { onChangeInput(e) }}
                        placeholder="Código de 6 dígitos"/>
                </div>
                <button 
                    disabled={!validateData}
                    className={[styles.buttonBox, !validateData? styles.buttonDisabled: ''].join(' ')}
                    onClick={props.onRegister}>
                    Enviar código
                </button>
            </div>

            <br />

            <button
                type="button"
                disabled={(!(Number.isInteger(Number(code)) && code.length ===6) || !sendCode)}
                onClick={props.onValidate}
                className={[stylesHome.loginButton, (!(Number.isInteger(Number(code)) && code.length ===6) || !sendCode)? stylesHome.buttonDisabled:''].join(' ')} >
                Finalizar
            </button>
            <p>O continuar con</p>
            <BtnFacebook />

        </>
    )
}