import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ModalDetail from '../modals/details';
import styles from '../../pages/home/style.module.scss';
import styleThis from './style.module.scss';
import { connect } from 'react-redux'
import * as userAction from '../../actions/user';
import { bindActionCreators } from 'redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {CustomInput} from '../../utils/inputPlaceHolder';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
    const [imagesNft, setImagesNft] = useState([]);
    const [checked, setChecked] = useState<any>([]);
    const [address, setAddress] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');

    useEffect(() => {
        setShow(props.show);
        if(props.show && imagesNft.length == 0){
            props.actions.imageNftByStatus({status:'active'});
        }
    }, [props.show]);

    useEffect(()=>{
        if(props.dataImageNft){
            setImagesNft(props.dataImageNft);
        }

    },props.dataImageNft)

    useEffect(() =>{
        if(props.dataSelectNft){
            setTitleError('NFT Escogido');
            setMessageError('Se guardó exitosamente el NFT que escogiste, ahora haremos las operaciones respectivas y te notificaremos vía correo electrónico cuando lo enviemos a tu dirección de wallet, o realicemos la venta en caso que no tengas tu dirección de wallet aun, si lo vendemos por ti te enviaremos el dinero a tu cuenta.".');
            setOpenModal(true);
        }
        
    },[props.dataSelectNft])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id:string) => {
        const check = [...checked];
        if(event.target.checked){
            check.push(id);
        }else{
            check.splice(check.indexOf(id),1);
        }
        console.log("check: ", check);
        setChecked(check)
        
    };

    const handleInput = (e:any) =>{
        setAddress(e.target.value);
    }

    const saveSelectNft = (e:any) =>{
        e.preventDefault();
        const data = {
            idsImage: checked,
            addressWallet: address
        }
        props.actions.saveSelectNft(data);
    }

    const handleClose = (e:any) => {
        setOpenModal(false);
        props.closeModal(e, 'ok');
    }

    return (
        <ModalDetail
            onClose={props.closeModal}
            show={show}
            option={0}
            title={"Escoge tu NFT"}
            render={
                <div>
                    <label >Selecciona {Math.trunc(props.points/50)} NFT</label>
                    <div className={styleThis.boxImageNft}>
                    {
                        imagesNft.map((val:any,id) =>(
                            <div className={styleThis.divImgNft}>
                            <img className={styleThis.imgNft} key={id} src={val.urlImage} width="149"  />       
                            <FormControlLabel control={<Checkbox disabled={!checked.includes(val._id) && checked.length == Math.trunc(52/50) } checked={checked.includes(val._id)} onChange={(e) =>handleChange(e,val._id)}   />} label={val.name} />
                           </div>                     
                        ))
                    }
                    </div>
                    <div className={styleThis.inputNft}>
                        <label>Dirección marketPlace</label>
                        <CustomInput 
                            onChange={handleInput}
                            value={address}
                            aria-label="Demo input" 
                            placeholder="ej: 0x1ed3... o destination.eth" />
                    </div>
                    
                    <button 
                    onClick={saveSelectNft}
                        className={[styles.loginButton, (checked.length ==0)? styles.buttonDisabled:''].join(' ')} >
                           Guardar
                    </button>

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
                    {props.isLoadingSelectNft  || props.isLoadingImageNft?
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
    isLoadingImageNft: state.user.isLoadingImageNft,
    dataImageNft: state.user.dataImageNft,
    errorImageNft: state.user.errorImageNft,
    isLoadingSelectNft: state.user.isLoadingSelectNft,
    dataSelectNft: state.user.dataSelectNft
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(useModalAuth);