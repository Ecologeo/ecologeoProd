import React, {useState, useEffect}  from 'react';
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux'
import styles from './styleModal.module.scss';
import stylesHome from '../../pages/home/style.module.scss';
import logo from '../../pages/assets/img/logo.png';
import ModalAuth from '../auth/modalAuth';
import power from '../../pages/assets/img/power.png';
import knowge from '../../pages/assets/img/knowge.png';
import influencer from '../../pages/assets/img/influencer.png';


function ModalMessage(props: any) {
    const [open, setOpen] = React.useState(false);
    const [show, setShow] = useState(false);

    useEffect(() =>{
        if(typeof props.open =='boolean'){
            setOpen(props.open);
        }        
    },[props.open]);

    

    const handleClose = (event: Event | React.SyntheticEvent) => {
        props.onClose()
    };

    const closeModal = (e: any) => {
        setShow(!show);
      };

    return (open ?


        <Stack direction="row" spacing={0}>

            <div className={styles.modal}>
            <span className={styles.close} onClick={handleClose}>&times;</span>
            <div className={styles.textModal}>
            <div className={styles.logoModal}><img src={logo} className={stylesHome.imgLogo} alt="Ecololgeo Logo" /></div>
            
            <div>
                <p className={styles.pModal}>
                    <img className={styles.imgModal} src={power} id="img01" />
                    Revolucionemos el mercado dando a conocer los mejores productos ecológicos
                </p>
                <p className={styles.pModal}>
                    <img className={styles.imgModal} src={knowge} id="img01" />
                    Ve un paso adelante conociendo los mejores precios, donde es mejor comprarlos, que beneficios tienen, etc. </p>
                <p className={styles.pModal}>
                <img className={styles.imgModal} src={influencer} id="img01" />
                    Influye en las decisiones ambientales de las empresas gracias a los reportes de Ecologeo</p>
            </div>
            
            <div className={styles.logoModal}>
            <button onClick={() => setShow(!show)} className={stylesHome.loginButton} >
                Registrate
            </button>
            </div>
            </div>
            <div className={styles.caption} ></div>
            </div>
            <ModalAuth show={show} closeModal={closeModal} option={3} />
                
        </Stack>:null

    );
}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalMessage);