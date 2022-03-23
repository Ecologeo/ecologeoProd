import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../home/style.module.scss'
import Footer from '../../components/footer';
import Header from '../../components/header';
import Posts from '../../components/foro/posts';
import { get } from '../../utils/SesionStorage';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router'

function Post(props:any) {

const [dataPosts, setDataPosts] = useState([])

  const router = useRouter();

  const idPost = router.query.post;

  useEffect(()=>{
    const idUser = get("@id_user") ?? '000000000000000000000000';
    props.actions.getPostsById({ idPost, idUser });
    ReactGA.send({ hitType: "pageview", page: '/post' });
  },[])  

  useEffect(() => {
    setDataPosts(props.dataPostByID);
  }, [props.dataPostByID])

  const updatePosts = () => {
    window.location.href = "/";
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Posts 
        postsInfo={dataPosts}
        updatePosts={updatePosts}
        type={3}
        messageError={"No encontramos este Post Pero puedes seguir explorando más en el inicio "}
        />
      </main>
      
      <Footer />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
    isLoadingPostById: state.foro.isLoadingPostById,
    dataPostByID: state.foro.dataPostByID,
    errorPostById: state.foro.errorPostById,
  })
  
  const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroAction, dispatch)
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post);
  