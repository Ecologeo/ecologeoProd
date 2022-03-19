import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../home/style.module.scss'
import Footer from '../../components/footer';
import Header from '../../components/header';
import Posts from '../../components/foro/posts';
import UpdatePerfil from '../../components/perfil/update';
import { get } from '../../utils/SesionStorage';
import ReactGA from 'react-ga4';

function UpPerfil(props:any) {

  useEffect(() =>{
    ReactGA.send({ hitType: "pageview", page: '/updatePerfil' });
  },[])

  return (
    <div className={styles.container}>
           
      <Header  />
      <main className={styles.main}>
      <div className="card">
        <UpdatePerfil  />
        </div>    
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

export default connect(mapStateToProps, mapDispatchToProps)(UpPerfil);
