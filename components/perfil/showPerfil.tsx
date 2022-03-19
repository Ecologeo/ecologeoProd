import React, { useState, useEffect, useRef } from 'react';
import * as userAction from '../../actions/user';
import * as postAction from '../../actions/foro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import avatar from '../../pages/assets/img/avatar_default.png';
import styleThis from './style.module.scss';
import styleCreate from '../../pages/create/styles.module.scss';
import styles from '../../pages/home/style.module.scss';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import BookIcon from '@mui/icons-material/Book';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Tooltip from "@mui/material/Tooltip";
import BtnSeguir from '../foro/btnSeguir';
import { get } from '../../utils/SesionStorage';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import ModalResponse from "../utils/modalResponse";
import Chip from '@mui/material/Chip';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TooltipPoints from './tooltipPoints';
import CarouselMui from '../utils/carouselMui';
import Image from 'next/image';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const typeUserData: any = {
    'noData': 'Tipo de usuario sin definir',
    'Consumer': 'Consumidor ecológico',
    'Company': 'Empresa'
}

function ShowPerfil(props: any) {

    const [urls, setUrls] = useState<Array<any>>([]);
    const [names, setNames] = useState('');
    const [userName, setUserName] = useState('');
    const [typeUser, setTypeUser] = useState('');
    const [about, setAbout] = useState('');
    const [path_avatar, setPath_avatar] = useState('');
    const [countFollows, setCountFollows] = useState('');
    const [idUserSeguir, setIdUserSeguir] = useState('');
    const [nameFriend, setNameFriend] = useState('');
    const [id_user, setId_user] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const [textAlert, setTextAlert] = React.useState('');
    const [typeAlert, setTypeAlert] = React.useState<AlertColor>("warning")
    const [vfollow, setVfollow] = useState([]);
    const [idUserPerfil, setIdUserPerfil] = useState('');
    const [messageResp, setMessageResp] = useState('');
    const [openResp, setOpenResp] = useState(false);
    const [nft, setNft] = useState<any>({});
    const [showForm, setShowForm] = useState(false);
    const [nftPerfil, setNftPerfil] = useState([]);


    useEffect(() => {
        const user_id = props.user_id ?? '';
        const idUser = get("@id_user") ?? '';
        setId_user(idUser);
        //if (idUser != '') {
        //    props.actionsPost.validateFollow({ perfil: user_id, visitor: idUser });
        //}
        props.actions.getUser({ user_id });
        props.actions.NftByUser({ user_id });
        props.actions.NftByPerfil({user_id});
        //props.actionsPost.countFollows({ idUser: user_id, type: 'perfil' });

    }, []);

    useEffect(() => {
        if (props.dataUser) {
            setNames(props.dataUser.name)
            setPath_avatar(props.dataUser.hasOwnProperty('path_avatar') ? props.dataUser.path_avatar : '')
            setTypeUser(props.dataUser.role)
            setAbout(props.dataUser.about)
            setUserName(props.dataUser.userName)
            setUrls(props.dataUser.links)
            setIdUserPerfil(props.dataUser._id)
            if (id_user != '') {
                props.actionsPost.validateFollow({ perfil: props.dataUser._id, visitor: id_user });
            }
            props.actionsPost.countFollows({ idUser: props.dataUser._id, type: 'perfil' });
            props.getPost(props.dataUser._id)
        }

    }, [props.dataUser]);

    useEffect(() =>{
        if(props.dataNft){
            setNft(props.dataNft);
        }
        
    },[props.dataNft])

    useEffect(() => {
        if(props.dataNftPerfil){
            setNftPerfil(props.dataNftPerfil)
        }
    },[props.dataNftPerfil])

    useEffect(() => {
        if (props.error) {
          if (props.error.hasOwnProperty('status') && props.error.status === 429) {
            setMessageResp('Por favor comunícate con soporte para analizar tus necesidades de consulta en Ecologeo.');
          }else{
            setMessageResp('No se encontró ningún usuario con estos términos de búsqueda.');
          }
          setOpenResp(true);
        }
    
      }, [props.error]);


    useEffect(() => {
        if (props.dataCountFollows) {
            setCountFollows(props.dataCountFollows);
        }
    }, [props.dataCountFollows])

    useEffect(() => {
        if (props.dataFollow && nameFriend != '') {
            setTextAlert("Seguiste a " + nameFriend);
            setOpenAlert(true);
            setTypeAlert('success');
            props.actionsPost.countFollows({ idUser: idUserPerfil, type: 'perfil' });
            props.getPost(idUserPerfil)
        }
    }, [props.dataFollow])

    useEffect(() => {
        if (props.dataVFollow) {
            setVfollow(props.dataVFollow);
        }

    }, [props.dataVFollow]);


    const getIconUrl = (type: string) => {
        switch (type) {
            case 'personal':
            case 'other':
                return <Tooltip title="Sitio personal" arrow><LanguageIcon sx={{ color: '#3b83bd' }} /></Tooltip>
            case 'facebook':
                return <Tooltip title="Url de Facebook" arrow><FacebookIcon sx={{ color: '#3b5998' }} /></Tooltip>
            case 'blog':
                return <Tooltip title="Url del Blog" arrow><BookIcon sx={{ color: '#fc4f08' }} /></Tooltip>
            case 'twitter':
                return <Tooltip title="Url de Twitter" arrow><TwitterIcon sx={{ color: '#00acee' }} /></Tooltip>
            case 'linkedin':
                return <Tooltip title="Url de Linkedin" arrow><LinkedInIcon sx={{ color: '#0e76a8' }} /></Tooltip>
            case 'youtube':
                return <Tooltip title="Url de YouTube" arrow><YouTubeIcon sx={{ color: '#c4302b' }} /></Tooltip>
        }
    }

    const setFollow = (userFriend: any, nameUser: any) => {

        const data = {
            user: id_user,
            userFriend
        }
        setIdUserSeguir(userFriend);
        setNameFriend(nameUser)
        props.actionsPost.setFollow(data);

    }

    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    };

    const closeModal = (e: any, result:any) => {
        setShowForm(!showForm);
        if(result=='ok'){
            props.actions.NftByUser({ user_id: id_user });
        }
      };

      const flickityOptions = {
        initialIndex: 2
    }



    return (
        <div className="card">
            <div className={styleThis.contanier} >
                <div className={styleThis.subContanierShow} >
                    <div className={styleThis.boxImgPerfil} >
                        <div className={styleCreate.textIcon} >
                            <div className="avatarPerfil">
                            <Image
                                src={path_avatar !== '' ? path_avatar : avatar}
                                alt="Avatar"
                                layout="fill"
                                className="avatar" />
                            </div>
                        </div>

                    </div>
                    <div className={styleThis.boxTextPerfil} >
                        <h2 style={{ marginBlockEnd: '0.2em' }}>{names}</h2>
                        <p className={styleThis.pWithOutStartEnd} >@{userName}</p>
                        <p className={styleThis.pWithOutStartEnd} >{typeUserData[typeUser]}</p>
                        <div className={styleThis.boxPoints} >
                            <p className={styleThis.pWithOutStartEnd}>
                                <Chip 
                                icon={nft.hasOwnProperty('points') && nft.points > 0? <TagFacesIcon />: <SentimentDissatisfiedIcon />} 
                                label={nft.hasOwnProperty('points')?nft.points + ' Puntos':'0 Puntos'}  />
                                
                            </p>
                            <TooltipPoints />
                        </div>
                       
                        
                        {vfollow[0] === 0 || vfollow.length === 0 ?
                            <BtnSeguir
                                idUserSeguir={idUserSeguir}
                                setFollow={setFollow}
                                idUserPost={idUserPerfil}
                                nameUser={names}
                                id_user={id_user}
                                backgrounColor={"#FFF"}
                                type={'perfil'} /> : null
                        }

                    </div>


                </div>
                <div className={styleThis.boxLinks} style={{ margin: '15px 0px' }}>
                    <div className={styleThis.textFollow}>
                        <a href={"/follows/" + idUserPerfil + "/d"}>
                            {countFollows.length > 0 ? countFollows[0] : '0'} Seguidos
                        </a>
                    </div>
                    <div className={styleThis.textFollow}>
                        <a href={"/follows/" + idUserPerfil + "/s"}>
                            {countFollows.length > 0 ? countFollows[1] : '0'} Seguidores
                        </a>
                    </div>
                    <div className={styleThis.textFollow}>{countFollows.length > 0 ? countFollows[2] : '0'} Publicaciones</div>
                </div>
                <Divider />
                <div className={styleThis.divNFTGet} >
                    <h3>NFT adquiridos</h3>
                    {nftPerfil && nftPerfil.length > 0?<CarouselMui images={nftPerfil} />:
                    <div>0 NFT</div>}
                </div>                
                <Divider />
                <p className={styleThis.aboutPerfil}>Acerca de</p>
                <p>{about}</p>
                <Divider />
                <div >
                    <p className={styleThis.aboutPerfil}>Sitos web</p>
                    <div style={{ display: 'flex' }}>
                        {urls.map((val: any, id: any) => (
                            <div key={id} className={styleThis.iconUrls} >{getIconUrl(val.key)}</div>
                        ))}
                    </div>


                </div>


                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={props.isLoading}
                >
                    <CircularProgress color="success" />
                </Backdrop>
                <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
                    <Alert
                        onClose={handleCloseAlert}
                        severity={typeAlert}
                        sx={{ width: '100%' }}>
                        {textAlert}
                    </Alert>
                </Snackbar>

                <ModalResponse
                title={''}
                message={messageResp}
                open={openResp}
            />


            </div>
        </div>

    );
}

const mapStateToProps = (state: any) => ({
    isLoading: state.user.isLoading,
    dataUser: state.user.dataUser,
    error: state.user.error,
    isLoadingCountFollows: state.foro.isLoadingCountFollows,
    errorCountFollows: state.foro.errorCountFollows,
    dataCountFollows: state.foro.dataCountFollowsPerfil,
    dataFollow: state.foro.dataFollow,
    dataVFollow: state.foro.dataVFollow,
    dataNft: state.user.dataNft,
    dataNftPerfil: state.user.dataNftPerfil
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch),
    actionsPost: bindActionCreators(postAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPerfil);