import React, { useState, useEffect, useRef } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import avatar from '../../pages/assets/img/avatar_default.png';
import styles from './style.module.scss';
import { calculateTimePost } from '../../utils/index';
import { FaEllipsisH } from "react-icons/fa";
import ButtonLikes from "./buttonLikes";
import CustomizedMenus from './menuPost';
import CircularProgress from '@mui/material/CircularProgress';
import AcordionPost from './acordionPost';
import { get } from '../../utils/SesionStorage';
import ModalConfirm from '../utils/modalConfirm';
import Backdrop from '@mui/material/Backdrop';
import BtnSeguir from './btnSeguir';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps, AlertColor } from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import ModalResponse from "../utils/modalResponse";
import Image from 'next/image';
import SumatyPost from './sumaryPost';

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


function Posts(props: any) {

    const [dataPostsInt, setdataPostsInt] = useState([]);
    const [id_user, setId_user] = useState('');
    const [visibleComment, setVisibleComment] = useState(false);
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [contentModal, setContentModal] = useState('');
    const [postMenu, setPostMenu] = useState('');
    const [imgMenu, setImgMenu] = useState('');
    const [idUserSeguir, setIdUserSeguir] = useState('');
    const [openAlert, setOpenAlert] = React.useState(false);
    const [textAlert, setTextAlert] = React.useState('');
    const [nameFriend, setNameFriend] = React.useState('')
    const [typeAlert, setTypeAlert] = React.useState<AlertColor>("warning")
    const [idPostComment, setIdPostComment] = React.useState('');
    const [messageResp, setMessageResp] = useState('');
    const [openResp, setOpenResp] = useState(false);


    const refsVideo = useRef<any>({});
    refsVideo.current = [];

    const addToRefs = (el: any, idPost: string) => {
        if (el && !refsVideo.current.includes(el)) {
            refsVideo.current[idPost] = el;
        }
    };
    useEffect(() => {
        if (props.dataDelPost) {
            props.actions.clearDelPost();
            props.updatePosts(postMenu);
        }
    }, [props.dataDelPost])

    useEffect(() => {
        const idUser = get("@id_user") ?? '';
        setId_user(idUser);
    }, [])

    useEffect(() => {
        if(props.postsInfo){
            setdataPostsInt(props.postsInfo);
        }
        
    }, [props.postsInfo])

    useEffect(() => {
        let options = {
            rootMargin: "0px",
            threshold: [0.75]
        };

        let handlePlay = (entries: any, observer: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    entry.target.play()
                } else {
                    entry.target.pause()
                }
            });
        };

        let observer = new IntersectionObserver(handlePlay, options);
        Object.keys(refsVideo.current).forEach((key) => {
            observer.observe(refsVideo.current[key])
        })
    }, [refsVideo.current]);

    useEffect(() => {
        if (props.dataFollow && nameFriend != '') {
            setTextAlert("Seguiste a " + nameFriend);
            setOpenAlert(true);
            setTypeAlert('success');
        }
    }, [props.dataFollow])

    useEffect(() => {
        if (props.errorFollow) {

            setTextAlert(props.errorFollow.response.data.hasOwnProperty('message') ? props.errorFollow.response.data.message : "No fue posible seguir al usuario " + nameFriend + ". Por favor, Comuníquese con soporte.");
            setOpenAlert(true);
            setTypeAlert('warning');
        }
    }, [props.errorFollow])



    const updatePoints = (idPost: string, pip: any) => {
        const data = {
            idPost,
            pip
        }
        props.actions.updatePoint(data);
    }

    const showModalComments = (idPost: string, countComments: any, updateComments: any) => {
        //console.log("idPost-showModalComments: ", idPost);
        //this.setState({ modalCommentsVisible: true, idPost_Comments: idPost, countComments, updateComments });
    }

    const myLoader = (image: any) => {
        return `${image.src}?w=${image.width}&q=${image.quality || 75}`;
    }

    const getCharacteristic = (data: any, type: any) => {
        return data.filter((elemt: any) => elemt.type === type);
    }

    const modalConfirmClose = () => {
        setModalConfirm(false)
    }

    const modalConfirmShow = (idPost: any, urlImage: any) => {
        setModalConfirm(true)
        setPostMenu(idPost);
        setImgMenu(urlImage);
        setContentModal('¿Seguro deseas eliminar esta publicación?');
    }

    const removePost = () => {
        setModalConfirm(false)
        setContentModal('');
        //setPostMenu('');
        setImgMenu('');
        const data = {
            idPost: postMenu,
            urlImage: imgMenu
        }
        props.actions.deletePost(data);
    }

    const setFollow = (userFriend: any, nameUser: any) => {

        const data = {
            user: id_user,
            userFriend
        }
        setIdUserSeguir(userFriend);
        setNameFriend(nameUser);
        props.actions.setFollow(data);

    }


    const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };

    const updateIdPostComment = (idPost: any) => {
        setIdPostComment(idPostComment === idPost ? '' : idPost);
    }

    const preLoad = () => {
        return (
            <div className="cardSkeleton" >
                <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton variant="rectangular"  height={400} />
                </Stack>
                <Stack spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton variant="rectangular"  height={400} />
                </Stack>
            </div>
        )
    }

    return (
        <div>
            <div className="card" style={{padding: '10px 20px', display: 'none' }}>Únete a otros consumidores responsables e impacta en las producciones de las empresas. Conoce más en <a target="_blanck" style={{color:'blue'}} href="https://about.ecologeo.com">about.ecologeo.com</a></div>
            {props.isLoadingPostById ||
                props.isLoadingPost ||
                props.isLoadingPostPerfil ?
                <>{preLoad()}</> :
                <div className={styles.containerCard}>
                    {

                        dataPostsInt && dataPostsInt.length > 0 ?
                            dataPostsInt.map((val: any, id) => (
                                
                                    <div  key={id} className="cardHome">

                                        <div className="cardHeader">

                                            <div className="linkAll" >
                                                <a href={"/eco/" + val.user.userName}>
                                                        <Image
                                                            src={ val.user.hasOwnProperty('path_avatar') ?val.user.path_avatar:avatar}
                                                            alt="Avatar"
                                                            className="avatar"
                                                            width="40" height="40" 
                                                            objectFit="cover"
                                                            objectPosition="center"/> 
                                                </a>
                                                <div className="ml10">
                                                    <a href={"/eco/" + val.user.userName}>
                                                        <span className="linkName" >{val.user.name}</span>
                                                        <span className="linkNameRole" >{typeUserData[val.user.role]}</span>
                                                    </a>
                                                    
                                                    
                                                </div>
                                            </div>
                                            {/*<div className={styles.options}>
                                                <CustomizedMenus
                                                    removePost={modalConfirmShow}
                                                    idPost={val._id}
                                                    typePost={val.typePost}
                                                    id_user={id_user}
                                                    userPost={val.user._id}
                                                    urlImage={val.urlImage} />
                                                    </div>*/}

                                        </div>

                                        <SumatyPost
                                            index={1}
                                            img={val.urlImage}
                                            characteristic={getCharacteristic(val.character.data, 'character')}
                                            benefits={getCharacteristic(val.character.data, 'benefit')}
                                            frequencys={getCharacteristic(val.character.data, 'frequency')}
                                            skipped={new Set([])}
                                            typePost={val.typePost}
                                        />
                                        <div style={{ fontSize: 12, display: 'flex', marginTop: '5px', alignItems: 'center', paddingLeft: '5px' }}>
                                                        {
                                                            calculateTimePost(
                                                                val.year,
                                                                val.yearCurrent,
                                                                val.month,
                                                                val.monthCurrent,
                                                                val.day,
                                                                val.dayCurrent,
                                                                val.hour,
                                                                val.hourCurrent,
                                                                val.minutes,
                                                                val.minutesCurrent)
                                                        }
                                                        {/*!val.hasOwnProperty("userFriend") ?
                                                            <BtnSeguir
                                                                idUserSeguir={idUserSeguir}
                                                                setFollow={setFollow}
                                                                idUserPost={val.user._id}
                                                                nameUser={val.user.name}
                                                                id_user={id_user}
                                                                backgrounColor={"#FFF"}
                                                    type={'post'} /> : null*/}
                                                    </div>



                                        {/*
                val.description !== '' ?
                    <div className="cardBody">
                        <p className="m15">{val.description}</p>
                    </div> : null*/
                                        }
                                        {/*
                val.hasOwnProperty('urlImage') ? (
                    val.hasOwnProperty('typeFile') && val.typeFile === 'video' ?
                    <div className="cardBody">
                        <video 
                            src={val.urlImage} 
                            
                            width="600"  
                            controls
                            controlsList="nodownload"
                            >
                        </video>
                    </div>:
                    <div className="cardBody">
                        <div className={styles.imagePost}>
                            <img
                                src={val.urlImage}
                                className={styles.image} />
                        </div>
                    </div>
                ) : null*/
                                        }

                                        {/*<ButtonLikes
                                            item={val}
                                            id_user={id_user}
                                            updatePoints={updatePoints}
                                            showModalComments={showModalComments}
                                            idPostComment={idPostComment}
                                            updateIdPostComment={updateIdPostComment}
                                        />*/}


                                    </div>

                            )) : 
                            
                            <>{preLoad()}</>
                    }
                </div>}


            <ModalConfirm
                open={modalConfirm}
                onClose={modalConfirmClose}
                onAction={removePost}
                title={titleModal}
                content={contentModal} />
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoadingDelPost}
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
    )

}

const mapStateToProps = (state: any) => ({
    isLoadingDelPost: state.foro.isLoadingDelPost,
    dataDelPost: state.foro.dataDelPost,
    dataRepPost: state.foro.dataRepPost,
    isLoadingRepPost: state.foro.isLoadingRepPost,
    isLoadingPost: state.foro.isLoadingPost,
    isLoadingPostById: state.foro.isLoadingPostById,
    isLoadingPostPerfil: state.foro.isLoadingPostPerfil,
    dataFollow: state.foro.dataFollow,
    errorFollow: state.foro.errorFollow
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts);