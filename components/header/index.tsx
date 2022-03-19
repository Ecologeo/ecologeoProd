import React, { useState, useEffect } from 'react';
import styles from '../../pages/home/style.module.scss';
import logo from '../../pages/assets/img/logo.png';
import ModalAuth from '../auth/modalAuth';
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { get } from '../../utils/SesionStorage';
import avatar from '../../pages/assets/img/avatar_default.png';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import MenuUser from '../auth/menuUser';
import Avatar from '@mui/material/Avatar';
import SearchEco from './search';
import { bindActionCreators } from 'redux';
import * as foroAction from '../../actions/foro';
import { connect } from 'react-redux';
import Badge , { BadgeProps } from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Stack from '@mui/material/Stack';
import Notifications from './modalNotification';
import SearchIcon from '@mui/icons-material/Search';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Image from 'next/image';
import Link from 'next/link';


function Header(props:any) {

  const [show, setShow] = useState(false);
  const [tokenUser, setToken] = useState(null);
  const [nameUser, setNameUser] = useState(null);
  const [avatarUser, setAvatarUser] = useState(null)
  const [showMenuUser, setShowMenuUser] = useState(false);
  const [id_user, setId_user] = useState('');
  const [showSearch, setShowSearch] = useState(false);


  useEffect(() => {
    const name: any = get('@name_user');
    const id: any = get('@id_user');
    const avatarU: any = get('@path_avatar_user');
    const token: any = get('@token');
    setNameUser(name);
    setAvatarUser(avatarU !==''?avatarU: avatar);
    setToken(token)
    setId_user(id)
  }, []);

  
  const closeModal = (e: any) => {
    setShow(!show);
  };

  const handleCloseMenu = () => {
    setShowMenuUser(false);
  }

  const onShowMenuUser = () =>{
    setShowMenuUser(true);
  }

  return (
    <div className={styles.headerConteniner} style={{height:showSearch?'110px':'70px' }}>
      <div className={styles.headerGeneral} style={{height:showSearch?'50%':'100%' }}>
        {/*<Menu />*/}
        <div className={styles.imgLogoContanier}>
            <Link href="/"><div className={styles.divLogo}><Image src={logo} alt="Ecololgeo Logo" layout="fill" /></div></Link>
                      
        </div>
        <div className={styles.searchDesk}>
          <SearchEco term={props.term} />
        </div>
        <div 
        className={styles.searchMovil}
        onClick={(e) => setShowSearch(!showSearch)} 
        style={{ marginTop: "10px", cursor: 'pointer' }}>
          <SearchIcon color="action" fontSize="large" />
        </div>
        
        <a href={"/selectNft/"+ (id_user?id_user: "NA")}>
          <Avatar sx={{ bgcolor: '#E7912D', cursor: "pointer" }}><span style={{fontSize:'14px'}}>NFT</span></Avatar>
        </a>
        {tokenUser !== null ?
          <div >
            <Stack direction="row" spacing={2}>
            <Link href="/create">
            <Avatar sx={{ bgcolor: "#3cb371", margin: "6px 8px", cursor: "pointer"}}>
              <AddIcon />
            </Avatar>
            </Link>

            <Notifications 
              id_user={id_user}
            />

            <MenuUser 
                avatarUser={avatarUser} 
                nameUser={nameUser}
                id_user={id_user}
                />
          </Stack> 
          </div>
          :
          <button onClick={() => setShow(!show)} className={styles.loginButton} >
            Iniciar sesión
          </button>}
          

        <ModalAuth show={show} closeModal={closeModal} />
        
      </div>
      {showSearch?
        <div className={styles.searchMovil}>
              <SearchEco term={props.term} />
        </div>:null
      }
      
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  isLoadingCS: state.foro.isLoadingCS,
  dataCS: state.foro.dataCS,
  errorCS: state.foro.errorCS
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);