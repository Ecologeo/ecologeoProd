import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../home/style.module.scss'
import Footer from '../../components/footer';
import Header from '../../components/header';
import Posts from '../../components/foro/posts';
import ShowPerfil from '../../components/perfil/showPerfil';
import ReactGA from "react-ga4";
import { useRouter } from 'next/router'

function Perfil(props:any) {

const [dataPosts, setDataPosts] = useState([]);
const router = useRouter();
const user = router.query.user??''
//const user = props.match.params.user

  useEffect(()=>{
    //props.actions.getPostByPerfil({ id_user: user, pageNum: 1 });
    ReactGA.send({ hitType: "pageview", page: '/eco' });
  },[]) 

  useEffect(() => {
    if(props.dataPostsPerfil){
      setDataPosts(props.dataPostsPerfil);
    }
  }, [props.dataPostsPerfil])

  const updatePosts = (postMenu:any) =>{
    let dataPostsFilter = dataPosts.filter(function (el: any) { return el._id !== postMenu; });
    setDataPosts(dataPostsFilter);
  }

  const getPost = (id:any) =>{
    props.actions.getPostByPerfil({ id_user: id, pageNum: 1 });
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <ShowPerfil 
        user_id={user} 
        getPost={getPost} />
        
        <Posts 
        postsInfo={dataPosts}
        updatePosts={updatePosts}
        messageError={"No fue posible encontrar el perfil."}
        />
      </main>
      
      <Footer />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
    dataPostsPerfil: state.foro.dataPostsPerfil,
    isLoadingPostPerfil: state.foro.isLoadingPostPerfil,
    errorPostPerfil: state.foro.errorPostPerfil,
    dataCountFollows: state.foro.dataCountFollowsPerfil,
    pagePerfil: state.foro.pagePerfil
  })
  
  const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroAction, dispatch)
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Perfil);
  