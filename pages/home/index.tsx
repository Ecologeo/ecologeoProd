import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from './style.module.scss'
import Footer from '../../components/footer';
import Header from '../../components/header';
import Posts from '../../components/foro/posts';
import { get } from '../../utils/SesionStorage';
import CardUser from '../../components/foro/cardUser';
import ModalResponse from '../../components/utils/modalResponse';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import FiltersTypes from '../../components/foro/filtersTypes';
import FooterCard from '../../components/footer/footerCard';
import GA4React, { useGA4React } from "ga-4-react";
import ReactGA from "react-ga4";
import ModalMessage from "../../components/foro/modalMessage";




function Home(props: any) {

  const [dataPosts, setDataPosts] = useState([]);
  const [id_user, setId_user] = useState('');
  const [titleError, setTitleError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(true);

  

  useEffect(() => {
    const idUser = get("@id_user") ?? '';
    setId_user(idUser);
    props.actions.getPosts({ idUser, pageNum: 1 });
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
  }, []);

  /*useEffect(() =>{
    if(props.dataCS){
      props.actions.getPosts({ id_user, pageNum: 1, dataCS: props.dataCS.CS });
    }    
  },[props.dataCS])*/

  useEffect(() => {
      setDataPosts(props.dataPosts);
  }, [props.dataPosts])

  useEffect(() => {
    if (props.errorPost) {
      if (props.errorPost.status === 429) {
        setTitleError('Comportamiento extraño de consultas');
        setMessageError('Por favor comunícate con soporte para analizar tus necesidades de consulta en Ecologeo.');
        setOpenModal(true);
      }else{
        setMessageError(props.errorPost.message)
        setOpenModal(true)
      }
    }

  }, [props.errorPost]);

  const updatePosts = (postMenu: any) => {
    let dataPostsFilter = dataPosts.filter(function (el: any) { return el._id !== postMenu; });
    setDataPosts(dataPostsFilter);
  }

  const onFilterByType = (typeEx:any) =>{
    props.actions.getPosts({ idUser:id_user, pageNum: 1, typeEx });
  }


  const onCloseModal = () =>{
    setOpen(false);
  }



  return (
    <div className={styles.container}>
      <header>
        <title>Ecologeo</title>
        <meta name="description" content="Tecnología que te ayuda a cuidar el medio ambiente" />
        <link rel="icon" href="/favicon.ico" />
      </header>

      <Header />
      <main className={styles.main}>
        <div className={styles.containerCards}>
          <div className={styles.boxCardUser} >
            {id_user != '' ? <CardUser id_user={id_user} /> : null}
            {/*<FiltersTypes
              id_user={id_user}
              onFilterByType={onFilterByType}
            />*/}
            <FooterCard />
          </div>

          <div className={ styles.boxCardPost }>
            <Posts
              postsInfo={dataPosts}
              updatePosts={updatePosts}
              type={1}
              messageError={"Se ha presentado un error pedimos disculpas por los inconvenientes, vuelve a intentarlo más tarde :) "} />

          </div>


        </div>

        <ModalResponse
          title={titleError}
          message={messageError}
          open={openModal}
        />
        {/*id_user == '' ?
        <ModalMessage
        open={open}
        onClose={onCloseModal}
        />:null */ 
        }


        {/*props.isLoadingPost ?
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.isLoadingPost}
          >
            <CircularProgress color="success" />
          </Backdrop> : null
        */}


      </main>

      <Footer />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  dataPosts: state.foro.dataPosts,
  isLoadingPost: state.foro.isLoadingPost,
  pageForo: state.foro.pageForo,
  error: state.foro.error,
  errorPost: state.foro.errorPost,
  dataCS: state.foro.dataCS,
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
