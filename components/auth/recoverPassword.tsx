import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/box.module.scss'
import stylesHome from '../../pages/home/style.module.scss';

export default function RecoverPass(props: any) {

    const [email, setEmail] = useState('');
    const [start, setStart] = useState(0);
    const [validEmail, setValidEmail] = useState(true);

    const refEmail = useRef<any>(null);

    useEffect(()=>{
        if(email){refEmail.current.setSelectionRange(start,start);}
    },[email])

    useEffect(() => {
        setEmail(props.emailPass);
    }, [props.emailPass])

    useEffect(() => {
        setValidEmail(props.validEmail);
    }, [props.validEmail])

    const onChangeInput = (e:any) =>{
        const { selectionStart } = e.currentTarget;
        setStart(selectionStart);
        props.onChangeText(e);
      }


    return (
        <>
            <p>Recuperar contraseña</p>

            <div  className={[styles.boxInput, !validEmail? styles.fieldBad:''].join(' ')}>
                <input
                    ref={refEmail}
                    className={styles.field}
                    type="text"
                    name="emailPass"
                    placeholder="Ingresar correo electrónico"
                    value={email}
                    onChange={(e: any) => { onChangeInput(e) }}
                />
            </div>
            <br/>
            <button
                type="button"
                disabled={!validEmail || email === ''}
                onClick={props.onRecoverPassword}
                className={[stylesHome.loginButton, !validEmail || email === ''? stylesHome.buttonDisabled:''].join(' ')} >
                Enviar
            </button>

        </>
    )
}