import React, {useState, useEffect}  from 'react';
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux'
import styles from './styleModal.module.scss';


function ModalImage(props: any) {
    const [open, setOpen] = React.useState(false);
    const [img, setImage] = React.useState('');

    useEffect(() =>{
        if(typeof props.open =='boolean'){
            setOpen(props.open);
        }        
    },[props.open]);

    useEffect(() =>{
        setImage(props.img);
    },[props.img])

    const handleClose = (event: Event | React.SyntheticEvent) => {
        props.onClose()
    };

    return (open ?


        <Stack direction="row" spacing={0}>

            <div className={styles.modal}>
            <span className={styles.close} onClick={handleClose}>&times;</span>
            <img className={styles.modalContent} src={img} id="img01" />
            <div className={styles.caption} ></div>
            </div>
                
        </Stack>:null

    );
}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalImage);