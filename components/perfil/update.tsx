import React, { useState, useEffect, useRef } from 'react';
import * as userAction from '../../actions/user';
import * as postAction from '../../actions/foro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import avatar from '../../pages/assets/img/avatar_default.png';
import styles from '../../pages/home/style.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import styleThis from './style.module.scss';
import styleCreate from '../../pages/create/styles.module.scss';
import { urlsData } from './data/urls';
import AddIcon from '@mui/icons-material/Add';
import FieldsUrls from './fieldUrls';
import { save, get } from '../../utils/SesionStorage';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import esLocale from 'date-fns/locale/es';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Image from 'next/image';


const styleText: any = {
    margin: 0,
    marginBottom: '25px',
    display: 'block'
}
const styleTextArea: any = {
    margin: 0,
    marginBottom: '25px'
}

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

function UpdatePerfil(props: any) {

    const [urls, setUrls] = useState<Array<any>>([]);
    const [names, setNames] = useState('');
    const [userName, setUserName] = useState('');
    const [urlImg, setUrlImg] = useState(null);
    const [urlImgd, setUrlImgd] = useState(null);
    const [typeUser, setTypeUser] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [sex, setSex] = useState('-9');
    const [about, setAbout] = useState('');
    const [path_avatar, setPath_avatar] = useState('');
    const [validUrls, setValidUrls] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalText, setModalText] = useState('')
    const [title, setTitle] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [openModal, setOpenModal] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [validUserName, setValidUserName] = useState(false);

    const inputEl = useRef<any>(null);
    const imgEl = useRef<any>(null);

    useEffect(() => {
        const user_id = get("@id_user") ?? '';
        props.actions.getUser({ user_id, type:'update' });

    }, []);

    useEffect(() => {
        if (props.userProfileResponse) {
            
            setOpenModal(true);
            setTitle('Consulta Exitosa');
            setMessage("El perfil se modificó correctamente");
            setNames(props.userProfileResponse.name)
            setBirthdate(props.userProfileResponse.birthDate == null ? new Date() : new Date(props.userProfileResponse.birthDate));
            setSex(props.userProfileResponse.sex??'-9')
            setPath_avatar(props.userProfileResponse.hasOwnProperty('path_avatar') ? props.userProfileResponse.path_avatar : '')
            setUrlImg(null);
            setUrls(props.userProfileResponse.links)
            if(props.userProfileResponse.hasOwnProperty('links') && props.userProfileResponse.length >0){
                validData(props.userProfileResponse.links);
            }
            setUserName(props.userProfileResponse.userName)
            setValidUserName(props.userProfileResponse.userName !=='')
            setTypeUser(props.userProfileResponse.role)
            setAbout(props.userProfileResponse.about??'');
            save('@path_avatar_user', props.userProfileResponse.hasOwnProperty('path_avatar') ? props.userProfileResponse.path_avatar : '');
        }

    }, [props.userProfileResponse])

    useEffect(() => {
        if (props.dataUser) {
            setNames(props.dataUser.name)
            setBirthdate(props.dataUser.birthDate == null ? new Date() : (new Date(props.dataUser.birthDate)))
            setSex(props.dataUser.sex??'-9')
            setPath_avatar(props.dataUser.hasOwnProperty('path_avatar') ? props.dataUser.path_avatar : '')
            setTypeUser(props.dataUser.role)
            setAbout(props.dataUser.about??'')
            setUserName(props.dataUser.userName)
            setValidUserName(props.dataUser.userName !=='')
            setUrls(props.dataUser.links)
            if(props.dataUser.hasOwnProperty('links') && props.dataUser.length >0){
                validData(props.dataUser.links);
            }
            setEmail(props.dataUser.email);

        }

    }, [props.dataUser])

    useEffect(() =>{
        if(props.errorProfile){
            setOpenModal(true);
            setTitle('Ocurrió un error');
            setMessage(props.errorProfile.message);
        }

    },[props.errorProfile])

    useEffect(()=>{
        if(props.dataUserName){
           setValidUserName(props.dataUserName.length==0); 
        }else{
            setValidUserName(userName !=='');
        }

    },[props.dataUserName])

    const addUrls = (e: any) => {
        if (urls.length < urlsData.length) {
            setUrls((prevUrls) => ([...prevUrls, { key: "-9", value: "" }]));
        }
    }


    const validData = (data: any) => {
        let valid = false;
        for (const d of data) {
            if (d.value.trim() !== '' && d.key !== '-9') {
                valid = true;
            } else {
                valid = false;
                break;
            }
        }
        return valid;
    }

    const removeUrl = (id: any) => {
        let setUrlsField = [...urls];
        setUrlsField.splice(id, 1);
        setValidUrls(validData(setUrlsField));
        setUrls(setUrlsField);

    }

    const handleChangeUrls = (e: any, id: any) => {
        let setUrlsField = [...urls]
        setUrlsField[id][e.target.name] = e.target.value
        if (e.target.name === 'key') {
            setUrlsField[id]['value'] = '';
        }
        setValidUrls(validData(setUrlsField));
        setUrls(setUrlsField);
    }

    const handleChange = (e: any) => {
        setBirthdate(e.target.value);
    }

    const updatePerfil = () => {
        if ((names == null || names.trim() === "") ||
            (userName == null || userName.trim() === "")) {

            setOpenModal(true);
            setMessage("El nombre del usuario es obligatorio para poder actualizar el perfil");
            return
        }
        if(!validUserName){
            setOpenModal(true);
            setMessage("El nombre del usuario ya existe, ingresa otro para poder actualizar el perfil");
            return
        }
        const data = {
            name: names,
            userName,
            birthDate: birthdate === new Date() ? null : birthdate,
            sex,
            imgAvatar: urlImgd,
            urlImage: path_avatar,
            about: about.trim(),
            role: typeUser,
            links: (urls.length > 0 && validData(urls)) ? urls : []

        }
        props.actions.updateProfile(data);
    }

    const openFolder = () => {
        inputEl.current.click();
    }
    const sub = (e: any) => {
        e.preventDefault();
        var file: any = inputEl.current.files[0];
        if (file) {
            updateImage(file);
            setUrlImgd(file)
        }

    }

    const updateImage = (file: any) => {
        var preview = imgEl.current;
        var reader = new FileReader();
        reader.onloadend = function () {
            setUrlImg(reader.result)
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            setUrlImg(null);
        }
    }

    const handleClose = () => {
        setOpenModal(false);
    }

    const validateUserName = (e:any) => {
        if(e.target.value.trim() != userName && /^[a-zA-Z0-9._%+-]+$/.test(e.target.value.trim())){
            setUserName(e.target.value.trim());
            props.actions.userByUserName({userName: e.target.value});
        }
    }



    return (
        <div className={styleThis.contanier} >
            <h2>Actualizar Perfil</h2>
            <div className={styleThis.subContanier} >
                <div className={styleThis.boxImg} >
                    <div className={styleCreate.textIcon} onClick={openFolder}>
                        
                        {urlImg !== null ?
                            <img
                            ref={imgEl}
                            src={urlImg !== null ? '' + urlImg : (path_avatar !== '' ? path_avatar : avatar)}
                            alt="Avatar"
                            className="avatar avatarPerfil" />:
                            <div className="avatarPerfil">
                            <Image
                                src={path_avatar !== '' ? path_avatar : avatar}
                                alt="Avatar"
                                layout="fill"
                                className="avatar" />
                            </div>
                        }
                        
                        
                        
                    </div>
                    <input
                        ref={inputEl}
                        type="file"
                        className={styleCreate.inputFile}
                        accept="image/*"
                        onChange={(e) => sub(e)} />

                <p style={{color: '#747474'}}>{email}</p>

                </div>
                <div className={styleThis.boxInputs} >
                    <TextField
                        fullWidth sx={styleText}
                        id="outlined-basic"
                        color="success"
                        focused
                        variant="outlined"
                        label="Nombre completo"
                        name="name"
                        value={names}
                        onChange={(e: any) => setNames(e.target.value)}
                        inputProps={{
                            maxLength: 100,
                            autoComplete: 'off'
                        }}
                    />
                    <TextField
                        error={!validUserName}
                        fullWidth sx={styleText}
                        id="outlined-basic"
                        color={validUserName?"success": "error"}
                        focused
                        variant="outlined"
                        label="Nombre de usuario"
                        name="userName"
                        value={userName}
                        onChange={(e: any) => validateUserName(e) }
                        helperText={!validUserName?"Este nombre de usuario ya existe.":""}
                        inputProps={{
                            maxLength: 100,
                            autoComplete: 'off'
                        }}
                    />
                    <TextField
                        id="outlined-select-currency"
                        fullWidth sx={styleText}
                        select
                        focused
                        color="success"
                        name="typeUser"
                        label="Tipo de usuario"
                        value={typeUser}
                        onChange={(e: any) => setTypeUser(e.target.value)}
                    >
                        <MenuItem key={'noData'} value={'noData'}>
                            Sin definir
                        </MenuItem>
                        <MenuItem key={'Consumer'} value={'Consumer'}>
                            Consumidor ecológico
                        </MenuItem>
                        <MenuItem key={'Company'} value={'Company'}>
                            Empresa
                        </MenuItem>

                    </TextField>

                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        locale={esLocale} >
                        <MobileDatePicker
                            label="Fecha de nacimiento"
                            inputFormat="MM/dd/yyyy"
                            value={birthdate}
                            onChange={(newValue: any) => setBirthdate(newValue)}
                            renderInput={(params) => <TextField focused color="success" fullWidth sx={styleText} {...params} />}
                        />
                    </LocalizationProvider>




                    <TextField
                        id="outlined-select-currency"
                        fullWidth sx={styleText}
                        select
                        focused
                        color="success"
                        name="sex"
                        label="Sexo"
                        onChange={(e: any) => setSex(e.target.value)}
                        value={sex}
                    >
                        <MenuItem key={'-9'} value={'-9'}>
                            Seleccionar
                        </MenuItem>
                        <MenuItem key={'M'} value={'M'}>
                            Masculino
                        </MenuItem>
                        <MenuItem key={'F'} value={'F'}>
                            Femenino
                        </MenuItem>
                        <MenuItem key={'NA'} value={'NA'}>
                            Prefiero no decirlo
                        </MenuItem>

                    </TextField>
                </div>

            </div>
            <TextField
                id="outlined-multiline-static"
                focused
                label="Sobre mi"
                color="success"
                multiline
                rows={3}
                fullWidth sx={styleTextArea}
                name="about"
                value={about}
                onChange={(e: any) => setAbout(e.target.value)}
                inputProps={{ maxLength: 200 }}
            />
            <div >
                <FieldsUrls
                    fields={urls}
                    removeUrl={removeUrl}
                    handleChangeUrls={handleChangeUrls}
                />
                {(urlsData.length > urls.length) ?
                    <div className={styleCreate.boxInputs}>
                        <button
                            onClick={addUrls}
                            className={[styleThis.btn, styleThis.linkBtn, ((urlsData.length < urls.length)) ? styles.buttonDisabled : ''].join(' ')}
                            disabled={(urlsData.length < urls.length)}>
                            <div style={{ display: "flex" }}><AddIcon /> Agregar url de sitio web </div>
                        </button>
                    </div> : null
                }


            </div>

            <div style={{ textAlign: 'right' }}>

                <button
                    onClick={updatePerfil}
                    className={styles.loginButton}
                >
                    <div style={{ display: "flex" }}>Guardar</div>
                </button>
            </div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoading}
            >
                <CircularProgress color="success" />
            </Backdrop>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '15px' }}>
                        {message}
                    </Typography>
                    <Button variant="outlined" onClick={handleClose}>Ok</Button>
                </Box>
            </Modal>


        </div>

    );
}

const mapStateToProps = (state: any) => ({
    isLoading: state.user.isLoading,
    dataUser: state.user.dataUser,
    error: state.user.error,
    userProfileResponse: state.user.userProfileResponse,
    errorProfile: state.user.errorProfile,
    dataUserName: state.user.dataUserName,
    isLoadingUserName: state.user.isLoadingUserName,
    errorUserName: state.user.errorUserName

})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch),
    actionsPost: bindActionCreators(postAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePerfil);