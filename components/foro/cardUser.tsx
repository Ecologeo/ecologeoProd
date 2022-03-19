import React, { useState, useEffect, useRef } from 'react';
import * as userAction from '../../actions/user';
import * as postAction from '../../actions/foro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import avatar from '../../pages/assets/img/avatar_default.png';
import styleThis from '../perfil/style.module.scss';
import styleCreate from '../../pages/create/styles.module.scss';
import { get } from '../../utils/SesionStorage';
import CircularProgress from '@mui/material/CircularProgress';
import Chip from '@mui/material/Chip';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TooltipPoints from '../perfil/tooltipPoints';
import Image from 'next/image';
import Link from 'next/link';

const typeUserData: any = {
    'noData': 'Tipo de usuario sin definir',
    'Consumer': 'Consumidor ecológico',
    'Company': 'Empresa'
}

function ShowPerfil(props: any) {

    const [names, setNames] = useState('');
    const [userName, setUserName] = useState('');
    const [typeUser, setTypeUser] = useState('');
    const [path_avatar, setPath_avatar] = useState('');
    const [countFollows, setCountFollows] = useState('');
    const [id_User, setId_User] = useState('');
    const [nft, setNft] = useState<any>({});


    useEffect(() => {
        setId_User(props.id_user);
        props.actions.getUser({ user_id:props.id_user });
        props.actionsPost.countFollows({ idUser:props.id_user, type: 'perfil' });

        props.actions.NftByUser({ user_id:props.id_user });

    }, []);

    useEffect(() =>{
        if(props.id_user){
            setId_User(props.id_user);
        }
        
    }, [props.id_user])

    useEffect(() => {
        if (props.dataUser) {
            setNames(props.dataUser.name)
            setPath_avatar(props.dataUser.hasOwnProperty('path_avatar') ? props.dataUser.path_avatar : '')
            setTypeUser(props.dataUser.role)
            setUserName(props.dataUser.userName)
        }

    }, [props.dataUser])

    useEffect(() =>{
        if(props.dataNft){
            setNft(props.dataNft);
        }
        
    },[props.dataNft])


    useEffect(() => {
        if (props.dataCountFollows) {
            setCountFollows(props.dataCountFollows);
        }
    }, [props.dataCountFollows])

    

  

    return (
        id_User!=''?
        (props.isLoading?
            <div> <CircularProgress color="success" /> </div>:
            <div className="cardUser">
            <div className={styleThis.contanier} >
                <div >
                    <div className={styleThis.boxPerfilHome} >
                        <div className={styleCreate.textIcon} >
                            <Image
                                src={path_avatar !== '' ? path_avatar : avatar}
                                alt="Avatar"
                                className="avatar"
                                width="100" height="100" />
                        </div>
                        <Link href={"/eco/" + userName}>
                            <p  className={styleThis.aboutPerfil}>{names}</p>
                        </Link>
                        
                        <p className={styleThis.pWithOutStartEnd} >@{userName}</p>
                        
                        <p className={styleThis.pWithOutStartEnd} >{typeUserData[typeUser]}</p>
                        
                        <div className={styleThis.boxPointsCard} >
                            <p className={styleThis.pWithOutStartEnd}>
                                <Chip 
                                icon={nft.hasOwnProperty('points') && nft.points > 0? <TagFacesIcon />: <SentimentDissatisfiedIcon />} 
                                label={nft.hasOwnProperty('points')?nft.points + ' Puntos':'0 Puntos'}  />
                            </p>
                            <TooltipPoints />
                        </div>


                    </div>


                </div>
                <div className={styleThis.boxLinks}  style={{ margin: '15px 0px' }}>
                    <div className={styleThis.textFollow}>
                    <Link href={"/follows/" + id_User +"/d"}>
                        <span>{countFollows.length > 0 ? countFollows[0] : '0'} Seguidos</span>
                    </Link>
                        </div>
                    <div className={styleThis.textFollow}>
                    <Link href={"/follows/" + id_User+ "/s"}>
                        <span>{countFollows.length > 0 ? countFollows[1] : '0'} Seguidores</span>
                    </Link>
                    </div>
                </div>
                
            </div>
        </div>
            )
        :null

    );
}

const mapStateToProps = (state: any) => ({
    isLoading: state.user.isLoading,
    dataUser: state.user.dataUser,
    error: state.user.error,
    isLoadingCountFollows: state.foro.isLoadingCountFollows,
    errorCountFollows: state.foro.errorCountFollows,
    dataCountFollows: state.foro.dataCountFollowsPerfil,
    dataNft: state.user.dataNft
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch),
    actionsPost: bindActionCreators(postAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ShowPerfil);