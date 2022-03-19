import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import styles from '../../home/style.module.scss'
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import FollowComp from '../../../components/foro/follows';
import CardUser from '../../../components/foro/cardUser';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router'

function Follows(props:any) {

//const user = props.match.params.user
//const type = props.match.params.type;

const router = useRouter();

const user = router.query.user??''
const type = router.query.type??0

useEffect(() =>{
  ReactGA.send({ hitType: "pageview", page: '/follows' });
},[])


  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
      <div className={styles.containerCards}>
        <div className={styles.boxCardUser} >
        <CardUser id_user={user} />
        </div>
     <div className={styles.boxCardPost}>
      <div className="card">
        <FollowComp 
        id_user={user} 
        type={type} />
        </div>
        </div>
        
     
      </div>  
      </main>
      
      <Footer />
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  })
  
  const mapDispatchToProps = (dispatch: any) => ({
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Follows);
  