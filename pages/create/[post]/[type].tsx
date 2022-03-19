import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../../home/style.module.scss'
import stylesThis from '../styles.module.scss';
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import StepsFrom from "../../../components/create/steps";
import OptionsTypePost from "../../../components/create/optionTypePost";
import ReactGA from 'react-ga4';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/router'

function CreatePost(props: any) {

    
    const [typePost, setTypePost] = useState(0);
    //const [textTitle, setTextTitle] = useState('');
    const router = useRouter();
    //const { idPost, typeP } = router.query;

    const idPost = router.query.post??''
    const typeP = router.query.type??0
    const textTitle = idPost===''? 'Crear recomendación de un producto o servicio ecológico': 
                                  'Actualizar recomendación';
    const textTitleThink = idPost===''? 'Pedir opiniones de un producto o servicio ecológico': 
                                  'Actualizar la petición de opinión';

    const textTitleResearch = idPost===''? 'Mostrar hallazgo de un producto o servicio ecológico': 
                                  'Actualizar hallazgo';

    useEffect(() =>{
        ReactGA.send({ hitType: "pageview", page: '/create' });
        setTypePost(Number(typeP));
    },[])

    const updateTypePost = (type:any) =>{
        setTypePost(type);
    }

    const ShowTitle = (index:any) =>{
        switch(index){
            case 1:
                return textTitleThink;
            case 2:
                return textTitle;
            case 3: 
                return textTitleResearch;
        }

    }

    const renderForm = () =>{
        switch(typePost){
            case 0:
                return(
                    <div>
                   <h2 style={{textAlign: 'center'}}> 
                    
                   Selecciona una opción de publicación</h2>
                    <OptionsTypePost updateTypePost={updateTypePost} /> 
                </div>
                )
            case 1:
            case 2:
            case 3:
                return(
                    <div>
                        <div style={{display: 'flex'}}>
                        <span className={stylesThis.iconBack}> <ArrowBackIcon onClick={() =>updateTypePost(0)} /> </span>
                        <h2>
                        { ShowTitle(typePost)}
                        </h2>
                        </div>
                        
                    <StepsFrom idPost={idPost} typePost={typePost} /> </div>   
                )
                
        }
    }
   
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>
                <div className={stylesThis.container}>
                    {renderForm()}
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
