import React, { useState, useEffect, useRef } from "react";
import styleForo from '../foro/style.module.scss';
import avatar from '../../pages/assets/img/avatar_default.png';
import { calculateTimePost } from '../../utils/index';
import Image from 'next/image';
import SumatyPost from './sumaryPost';
import ButtonLikes from "./buttonLikes";
import AcordionPost from './acordionPost';
import CustomizedMenus from './menuPost';
import BtnSeguir from './btnSeguir';
import styles from './style.module.scss';

const typeUserData: any = {
    'noData': 'Tipo de usuario sin definir',
    'Consumer': 'Consumidor ecológico',
    'Company': 'Empresa'
}

export default function OnePost(props: any) {

    const [idUserSeguir, setIdUserSeguir] = useState('');
    const [nameFriend, setNameFriend] = React.useState('');
    const [id_user, setId_user] = useState('');
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [postMenu, setPostMenu] = useState('');
    const [imgMenu, setImgMenu] = useState('');
    const [contentModal, setContentModal] = useState('');
    const [idPostComment, setIdPostComment] = React.useState('');

    const getCharacteristic = (data: any, type: any) => {
        return data.filter((elemt: any) => elemt.type === type);
    }

    useEffect(() =>{
        if(props.id_user){
            setId_user(props.id_user)
        }        
    },[props.id_user])

    const setFollow = (userFriend: any, nameUser: any) => {

        const data = {
            user: id_user,
            userFriend
        }
        setIdUserSeguir(userFriend);
        setNameFriend(nameUser);
        props.actions.setFollow(data);

    }

    const modalConfirmShow = (idPost: any, urlImage: any) => {
        setModalConfirm(true)
        setPostMenu(idPost);
        setImgMenu(urlImage);
        setContentModal('¿Seguro deseas eliminar esta publicación?');
    }

    const updatePoints = (idPost: string, pip: any) => {
        const data = {
            idPost,
            pip
        }
        props.actions.updatePoint(data);
    }

    const updateIdPostComment = (idPost: any) => {
        setIdPostComment(idPostComment === idPost ? '' : idPost);
    }


    return (
        <div  key={props.id} className="card">

                                        <div className="cardHeader">

                                            <div className="linkAll" >
                                                <a href={"/eco/" + props.val.user.userName}>
                                                        <Image
                                                            src={ props.val.user.hasOwnProperty('path_avatar') ?props.val.user.path_avatar:avatar}
                                                            alt="Avatar"
                                                            className="avatar"
                                                            width="40" height="40" 
                                                            objectFit="cover"
                                                            objectPosition="center"/> 
                                                </a>
                                                <div className="ml10">
                                                    <a href={"/eco/" + props.val.user.userName}>
                                                        <span className="linkName" >{props.val.user.name}</span>
                                                        <span className="linkNameRole" >{typeUserData[props.val.user.role]}</span>
                                                    </a>

                                                    <div style={{ fontSize: 12, display: 'flex', marginTop: '5px', alignItems: 'center' }}>
                                                        {
                                                            calculateTimePost(
                                                                props.val.year,
                                                                props.val.yearCurrent,
                                                                props.val.month,
                                                                props.val.monthCurrent,
                                                                props.val.day,
                                                                props.val.dayCurrent,
                                                                props.val.hour,
                                                                props.val.hourCurrent,
                                                                props.val.minutes,
                                                                props.val.minutesCurrent)
                                                        }
                                                        {!props.val.hasOwnProperty("userFriend") ?
                                                            <BtnSeguir
                                                                idUserSeguir={idUserSeguir}
                                                                setFollow={setFollow}
                                                                idUserPost={props.val.user._id}
                                                                nameUser={props.val.user.name}
                                                                id_user={id_user}
                                                                backgrounColor={"#FFF"}
                                                                type={'post'} /> : null}
                                                    </div>                                                    
                                                </div>
                                            </div>
                                            <div className={styles.options}>
                                                <CustomizedMenus
                                                    removePost={modalConfirmShow}
                                                    idPost={props.val._id}
                                                    typePost={props.val.typePost}
                                                    id_user={id_user}
                                                    userPost={props.val.user._id}
                                                    urlImage={props.val.urlImage} />
                                            </div>

                                        </div>

                                        <AcordionPost
                                            index={1}
                                            img={props.val.urlImage}
                                            characteristic={getCharacteristic(props.val.character.data, 'character')}
                                            benefits={getCharacteristic(props.val.character.data, 'benefit')}
                                            frequencys={getCharacteristic(props.val.character.data, 'frequency')}
                                            skipped={new Set([])}
                                            typePost={props.val.typePost}
                                        />

                                    
                                        {/*
                props.val.description !== '' ?
                    <div className="cardBody">
                        <p className="m15">{props.val.description}</p>
                    </div> : null*/
                                        }
                                        {/*
                props.val.hasOwnProperty('urlImage') ? (
                    props.val.hasOwnProperty('typeFile') && props.val.typeFile === 'video' ?
                    <div className="cardBody">
                        <video 
                            src={props.val.urlImage} 
                            
                            width="600"  
                            controls
                            controlsList="nodownload"
                            >
                        </video>
                    </div>:
                    <div className="cardBody">
                        <div className={styles.imagePost}>
                            <img
                                src={props.val.urlImage}
                                className={styles.image} />
                        </div>
                    </div>
                ) : null*/
                                        }

                                        <ButtonLikes
                                            item={props.val}
                                            id_user={id_user}
                                            updatePoints={props.updatePoints}
                                            idPostComment={idPostComment}
                                            updateIdPostComment={updateIdPostComment}
                                        />


                                    </div>
    )

}