import React, { useState, useEffect } from 'react';
import stylesThis from './style.module.scss';
import { connect } from 'react-redux';
import ModalAuth from '../auth/modalAuth';

function  BtnSeguir(props:any) {

    const [follow, setFollow] = useState(false);
    const [show, setShow] = useState(false);
    const [names, setNames] = useState('');


  const onFollow =()=>{
    if(props.id_user === ''){
      setShow(!show);
  }else{
    setFollow(true);
    props.setFollow(props.idUserPost, names);
  }
  }

  useEffect(()=>{
    if(props.nameUser){
      setNames(props.nameUser);
    }
  },[props.nameUser])

  const closeModal = (e: any) => {
    setShow(!show);
  };

  useEffect(() =>{
      if(props.idUserSeguir){
        if(props.idUserSeguir === props.idUserPost){
            setFollow(true);
        }
      }
    
  }, [props.idUserSeguir])

 


  return (
        <div style={{ marginTop:0, marginLeft: props.type=='post'?'10px':'0px'}}>
            {!follow?

                <button
                className={props.type=='post'? stylesThis.followBtn: stylesThis.followBtnProfile}
                onClick={() => onFollow()} 
                >Seguir</button>:null}
                <ModalAuth show={show} closeModal={closeModal} />
        </div>
        
        
    )
  
}

const mapStateToProps = (state:any) => ({
})

const mapDispatchToProps = (dispatch:any) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BtnSeguir);

