import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../home/style.module.scss'
import Footer from '../../components/footer';
import Header from '../../components/header';
import Posts from '../../components/foro/posts';
import SelectNft from '../../components/perfil/selectNFT';
import { get } from '../../utils/SesionStorage';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router'

function SelectNftPage(props:any) {

  const router = useRouter();
  const user = router.query.user??''
  //const user = props.match.params.user

  useEffect(() =>{
    ReactGA.send({ hitType: "pageview", page: '/selectNft' });
  },[])

  return (
    <div className={styles.container}>
           
      <Header  />
      <main className={styles.main}>
        <SelectNft 
            user_id={user} 
        />
      </main>
      
      <Footer />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectNftPage);
