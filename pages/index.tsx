import React, { useState, useEffect } from "react";
import CounterUp from "../components/monst/elements/Counterup"
import TextEffect from "../components/monst/elements/TextEffect"
import Layout from "../components/monst/layout/Layout"
import Slider1 from "../components/monst/slider/Slider1"
import styles from './home/style.module.scss'
import Posts from '../components/foro/posts';
import ReactGA from "react-ga4";
import { get } from '../utils/SesionStorage';
import * as foroAction from '../actions/foro'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SearchEco from '../components/header/search';
import ModalAuth from '../components/auth/modalAuth';
import Link from "next/link";
import Home from "./home";


function HomeIndex(props: any) {

    const [dataPosts, setDataPosts] = useState([]);
    const [id_user, setId_user] = useState('');
    const [show, setShow] = useState(false);
    const [optionAuth, setOptionAuth] = useState(1);

    useEffect(() => {
        const idUser = get("@id_user") ?? '';
        setId_user(idUser);
        props.actions.getPosts({ idUser, pageNum: 1 });
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
        
      }, []);

      useEffect(() => {
        setDataPosts(props.dataPosts);
    }, [props.dataPosts])

    const updatePosts = (postMenu: any) => {
        let dataPostsFilter = dataPosts.filter(function (el: any) { return el._id !== postMenu; });
        setDataPosts(dataPostsFilter);
      }

      const closeModal = () => {
        setShow(!show);
    };

    


    return (
        <>
        {id_user != ''?<Home/>:
        
            <Layout>
                <section className="xl:bg-contain bg-top bg-no-repeat -mt-24 pt-24" style={{ backgroundImage: "url('assets/imgs/backgrounds/intersect.svg')" }}>
                    <div className="container px-4 mx-auto">
                        <div className="pl-4 text-center">
                            <div className="max-w-2xl mx-auto mb-3">
                                <h2 className="text-3xl lg:text-5xl lg:leading-normal mb-4 font-bold font-heading wow animate__animated animate__fadeIn">
                                    Campañas <br />
                                    <span className="text-blue-500">Ecológicas</span>
                                </h2>
                                <p className="text-blueGray-400 leading-relaxed wow animate__animated animate__fadeIn">
                                    Únete a otros <strong className="text-blue-500">consumidores responsables</strong>, e impacta positivamente en {" "}
                                    <br/>
                                    <span className="typewrite d-inline text-brand">
                                        <TextEffect text1="las empresas" text2="la sociedad" text3="el planeta" />
                                    </span>
                                </p>
                            </div>
                            <div>
                                <a onClick={() => {setShow(!show); setOptionAuth(3); }} className="btn-primary py-4 px-8 mr-2 wow animate__animated animate__fadeIn hover-up-2" href="#">
                                   Inicia
                                </a>
                                <Link href="/about">
                                    <a className="btn-white wow animate__animated animate__fadeIn hover-up-2" data-wow-delay=".3s" href="#">
                                        ¿Que hacemos?
                                    </a>
                                </Link>
                                
                            </div>
                        </div>
                    </div>
                    <div style={{marginTop: '15px'}} >
                        <SearchEco term={props.term} />
                    </div>
                    <div className={ styles.boxCardPost }>
                        <Posts
                        postsInfo={dataPosts}
                        updatePosts={updatePosts}
                        messageError={"Se ha presentado un error pedimos disculpas por los inconvenientes, vuelve a intentarlo más tarde :) "} />

                    </div>

                </section>
                <ModalAuth show={show} closeModal={closeModal} option={optionAuth} />
            </Layout>
            }
            
        </>
    );
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
  
  export default connect(mapStateToProps, mapDispatchToProps)(HomeIndex);
