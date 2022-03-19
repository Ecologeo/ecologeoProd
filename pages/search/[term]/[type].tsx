import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../../home/style.module.scss'
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import Posts from '../../../components/foro/posts';
import ResultSearch from '../../../components/header/resultSearch';
import { get } from '../../../utils/SesionStorage';
import { useRouter } from 'next/router'

function Search(props:any) {

  const router = useRouter();

  const term = router.query.term??''
  const type = router.query.type??0

  //const term = props.match.params.term;
  //const type = props.match.params.type;
  


  return (
    <div className={styles.container}>
           
      <Header term={term} />
      <main className={styles.main}>
      <div className="card">
        <ResultSearch term={term} type={type} />
        </div>    
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
})

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
