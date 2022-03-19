
import React, { useState, useEffect } from "react";
import styles from '../../pages/home/style.module.scss'
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import charact from './data/characteristics';
import {benefit, valueKeyB} from './data/benefits';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import FieldCharacter from './fieldsCharact';
import FieldBenefit from './fieldsBenefit';
import FieldFrequency from './fieldsFrequency';
import {valueKey, withAuxCharacter, valueAuxCharacter} from './data/characteristics';
import { frequency, valueKeyF } from './data/frequency';
import FieldImage from './fieldImage';
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import AcordionPost from '../foro/acordionPost';
import { get } from '../../utils/SesionStorage';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';




function StepsFrom(props: any) {


    const [index, setIndex] = useState(0);
    const [imgProduct, setImgProduct] = useState(null);
    const [imgServer, setImgServer] = useState('');
    const [isImgServe, setIsImgServe] = useState(false);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [id_user, setId_user] = useState('');
    const [characteristic, setCharacteristic] = useState<Array<any>>(
        [
            {key:"name",value:""}, 
            {key:"type",value:"-9"}, 
            {key:"where",value:""}
        ]);
    const [benefits, setBenefits] = useState<Array<any>>(
            [
                {key:"health",value:""},
            ]);
    
    const [frequencys, setFrequencys] = useState<Array<any>>(
            [
                    {key:"-9",value:""},
            ]);

    useEffect(() =>{
        const idUser = get("@id_user") ?? '';
        setId_user(idUser);
        if(props.idPost){
            props.actions.getPostsById({ idPost: props.idPost, idUser });
        }
        /*axios.get('http://ip-api.com/json').then((resp:any) => {
            let characterField = [...characteristic]
            characterField[2]['value'] = resp.data.country +"-"+ resp.data.city+"-";
            setCharacteristic(characterField);
        });*/
    },[])

    useEffect(() => {
        if(props.dataPostByID){
            setIsImgServe(true);
            setImgServer(props.dataPostByID[0].urlImage);
            props.onApproved(true,0);
            const characts = getCharacteristic(props.dataPostByID[0].character.data,'character');
            setCharacteristic(parseDataCharacter(characts));
            validCharacteristic(characts)
            const benefitss = getCharacteristic(props.dataPostByID[0].character.data,'benefit');
            setBenefits(benefitss);
            validBenefits(benefitss);
            const fress = getCharacteristic(props.dataPostByID[0].character.data,'frequency');
            setFrequencys(fress.length >0?fress:[{key:"-9",value:""},]);
            validFrequency(fress);
        }
    }, [props.dataPostByID])

    const parseDataCharacter = (data: any) => {
        let charact:any = [];
        for(const d of data){
            if(d.key === 'eco'){
                d.value = d.value.split(', ');
            }
            charact.push(d);
        }
        return data

    }

    const getCharacteristic = (data: any, type: any) => {
        return data.filter((elemt: any) => elemt.type === type);
    }


    useEffect(() =>{
        props.setFinish(props.dataForo, characteristic[0].value);
    }, [props.dataForo])  
    
    useEffect(() =>{
        props.setFinish(props.error, '');
    }, [props.error]) 
    

    useEffect(() =>{
        setIndex(props.index);
        if(props.index === props.steps -1){
           props.onApproved(true,props.steps -1); 
        }
        if(props.index === props.steps){
                savePost();            
        }
    }, [props.index])

    useEffect(() =>{
        setSkipped(props.skipped);
    }, [props.skipped])

    const addCharacter = (e:any) =>{
        if(characteristic.length < charact.length){
            setCharacteristic((preCharacteristic) => ( [...preCharacteristic, {key:"-9", value:""}]));
            props.onApproved(false,1);
        }
        
    }

    const addBenefit = (e:any) =>{
        if(benefits.length < benefit.length){
            setBenefits((preBenefit) => ( [...preBenefit, {key:"-9", value:""}]));
            props.onApproved(false,2);
        }
        
    }

    const  removeCharacter = (id:any)=>{
        let characterField = [...characteristic];
        characterField.splice(id,1);
        validCharacteristic(characterField);
        setCharacteristic(characterField);
     }
    
     const  removeBenefit = (id:any)=>{
        let benefitsField = [...benefits];
        benefitsField.splice(id,1);
        validBenefits(benefitsField);
        setBenefits(benefitsField);
     } 

    const validData = (data:any, valuek:any) =>{
        let valid = false;
        for( const d of data){
            if(d.value !== valuek[d.key] && d.key !== '-9' && 
            ( (typeof d.value === 'string' && d.value.trim() !='' ) 
            || (typeof d.value === 'number' && d.value != '' )
            || typeof d.value === 'object' )  ){    
               valid = true;   
            }else{
               valid = false;
               break;
            }
         }
         return valid;
    }

    const validCharacteristic = (characteristicValid: any) =>{
        let valid = validData(characteristicValid,valueKey);
        props.onApproved(valid,1);
    } 

    const validBenefits = (benefitsValid: any) =>{
        let valid = validData(benefitsValid,valueKeyB);
        props.onApproved(valid,2);
    } 

    const validFrequency = (frecuencyValid: any) =>{
        let valid = validData(frecuencyValid,valueKeyF);
        props.onApproved(valid,3);
    } 

    const getArrayValue = (type: string) => {
        switch(type){
            case 'character':
                return valueKey;
            case 'benefit':
                return valueKeyB;
            case 'frequency':
                return valueKeyF;
        }
    }



    const handleChangeCharacter = (e:any, id:any) =>{
        
            let characterField = [...characteristic]
            characterField[id][e.target.name] = e.target.value;
            if(e.target.name === 'key'){
                characterField[id]['value'] =  e.target.value === '-9'? '':valueKey[e.target.value]; 
                if(withAuxCharacter.includes(e.target.value)){
                    characterField[id]['aux'] = valueAuxCharacter[e.target.value];
                }
            }
            validCharacteristic(characterField);     
            setCharacteristic(characterField);
        
    }

    const handleChangeBenefit = (e:any, id:any) =>{
        
            let benefitsField = [...benefits]
            benefitsField[id][e.target.name] = e.target.value;
            if(e.target.name === 'key'){
                benefitsField[id]['value'] =  e.target.value === '-9'? '':valueKeyB[e.target.value]; 
            }
        
            
            validBenefits(benefitsField);
            setBenefits(benefitsField);
        
    }

    const handleChangeFrequency = (e:any, id:any) =>{
        
            let frequencysField = [...frequencys]
            frequencysField[id][e.target.name] = !isNaN(e.target.value) || e.target.name === 'key' ?e.target.value:'';
            if(e.target.name === 'key'){
                frequencysField[id]['value'] = e.target.value === '-9'? '':1;
            }
            validFrequency(frequencysField);
            setFrequencys(frequencysField);
            
               
    }

    const setImage = (file:any) =>{
        setImgProduct(file);
        props.onApproved(true,0);
    }

    const getDatac = (data:any, type:string) =>{
        let charact:any = [];
        const values = getArrayValue(type);
        for(const d of data){
            if(d.value !== values[d.key] && d.key !== '-9' ){ 
                d['type'] = type;   
                d.value = d.key === 'eco'? d.value.join(', '): d.value;
                charact.push(d);         
            }
        }
        return charact;
    }

    const savePost = ()=>{
        const charac = getDatac(characteristic,'character' )
        const data:any = charac
        .concat(
            getDatac(benefits,'benefit' ), 
            getDatac(frequencys,'frequency' ));
        const params:any ={
            post:{
                description: '',
                dataImage: imgProduct,
                typeFile: 'image',
                typePost: props.typePost
                },
            data
          }
          if(props.idPost === ''){
            props.actions.createPost(params);
          }else{
            params['idPost'] = props.idPost;
            params['imgServer'] = imgServer;
            props.actions.updatePost(params); 
          }
        

    }

    const renderFormThink = (key:number) =>{
        switch(key){
            case 0:
                return props.isLoadingPostById? 
                <div style={{ textAlign: 'center' }} className={stylesThis.boxText}>
                   <p>Consultando...</p>
                    <CircularProgress color="success" /> 
                </div>:(
                    <FieldImage 
                        img={imgProduct==null && imgServer != ''?imgServer:imgProduct}
                        setImage={setImage}
                        isImgServe={isImgServe}
                        setIsImgServe={setIsImgServe}
                    />
                )
            case 1:
                return (
                    <div className={stylesThis.boxText}>
                     <FieldCharacter 
                     fields={characteristic}
                     removeCharacter={removeCharacter} 
                     handleChangeCharacter={handleChangeCharacter}
                     />
                    
                   
                    <div className={stylesThis.boxInputs }>

                    <button 
                        onClick={addCharacter} 
                        className={[styles.loginButton, (!(characteristic.length < charact.length))? styles.buttonDisabled:''].join(' ')}
                        disabled= {!(characteristic.length < charact.length)}>
                        <div style={{display: "flex"}}><AddIcon /> Agregar</div>
                    </button>
                        
                        
                    </div>
                    
                </div>
                )
            case 2:
                return (
                    <div className={[stylesThis.boxText, stylesThis.backgBody].join(' ')}>
                        
                        <div className="card" style={{width:'100%'}}>
                        <AcordionPost
                                index={isImgServe?1:0}
                                img={imgProduct==null?imgServer:imgProduct}
                                characteristic={characteristic}
                                benefits={benefits}
                                frequencys={frequencys}
                                skipped={skipped}
                                isImgServe={isImgServe}
                                typePost={props.typePost}
                            /> 
                        </div>
                         
                    </div>
                )
        }
    }
           

    const renderForms = (key:number) =>{

        switch(key){
            case 0:
                return props.isLoadingPostById? 
                <div style={{ textAlign: 'center' }} className={stylesThis.boxText}>
                   <p>Consultando...</p>
                    <CircularProgress color="success" /> 
                </div>:(
                    <FieldImage 
                        img={imgProduct==null && imgServer != ''?imgServer:imgProduct}
                        setImage={setImage}
                        isImgServe={isImgServe}
                        setIsImgServe={setIsImgServe}
                    />
                )
            case 1:
                return (
                    <div className={stylesThis.boxText}>
                     <FieldCharacter 
                     fields={characteristic}
                     removeCharacter={removeCharacter} 
                     handleChangeCharacter={handleChangeCharacter}
                     />
                    
                    <div className={stylesThis.boxInputs }>

                    <button 
                        onClick={addCharacter} 
                        className={[styles.loginButton, (!(characteristic.length < charact.length))? styles.buttonDisabled:''].join(' ')}
                        disabled= {!(characteristic.length < charact.length)}>
                        <div style={{display: "flex"}}><AddIcon /> Agregar</div>
                    </button>
                        
                        
                    </div>
                    
                </div>
                )
            case 2:
                return (
                    <div className={stylesThis.boxText}>
                     <FieldBenefit 
                     fields={benefits}
                     removeBenefit={removeBenefit}
                     handleChangeBenefit={handleChangeBenefit}
                     />   
                    
                    <div className={stylesThis.boxInputs}>
                        <button 
                            onClick={addBenefit} 
                            className={[styles.loginButton, (!(benefits.length < benefit.length))? styles.buttonDisabled:''].join(' ')}
                            disabled= {!(benefits.length < benefit.length)}>
                            <div style={{display: "flex"}}><AddIcon /> Agregar</div>
                        </button>
                    </div>
                </div>
                )
            case 3:
                return (
                    <div className={stylesThis.boxText}>
                    <FieldFrequency 
                    fields={frequencys}
                    handleChangeFrequency={handleChangeFrequency}
                    />   
                    </div> 
                )
            case 4:
                return (
                    <div className={[stylesThis.boxText, stylesThis.backgBody].join(' ')}>
                        
                        <div className="card" style={{width:'100%'}}>
                        <AcordionPost
                                index={isImgServe?1:0}
                                img={imgProduct==null?imgServer:imgProduct}
                                characteristic={characteristic}
                                benefits={benefits}
                                frequencys={frequencys}
                                skipped={skipped}
                                isImgServe={isImgServe}
                                typePost={props.typePost}
                            /> 
                        </div>
                         
                    </div>
                )
        }
    }

    const renderFormsResearch = (key:number) =>{

        switch(key){
            case 0:
                return props.isLoadingPostById? 
                <div style={{ textAlign: 'center' }} className={stylesThis.boxText}>
                   <p>Consultando...</p>
                    <CircularProgress color="success" /> 
                </div>:(
                    <FieldImage 
                        img={imgProduct==null && imgServer != ''?imgServer:imgProduct}
                        setImage={setImage}
                        isImgServe={isImgServe}
                        setIsImgServe={setIsImgServe}
                    />
                )
            case 1:
                return (
                    <div className={stylesThis.boxText}>
                     <FieldCharacter 
                     fields={characteristic}
                     removeCharacter={removeCharacter} 
                     handleChangeCharacter={handleChangeCharacter}
                     />
                    
                    <div className={stylesThis.boxInputs }>

                    <button 
                        onClick={addCharacter} 
                        className={[styles.loginButton, (!(characteristic.length < charact.length))? styles.buttonDisabled:''].join(' ')}
                        disabled= {!(characteristic.length < charact.length)}>
                        <div style={{display: "flex"}}><AddIcon /> Agregar</div>
                    </button>
                        
                        
                    </div>
                    
                </div>
                )
            case 2:
                return (
                    <div className={stylesThis.boxText}>
                     <FieldBenefit 
                     fields={benefits}
                     removeBenefit={removeBenefit}
                     handleChangeBenefit={handleChangeBenefit}
                     />   
                    
                    <div className={stylesThis.boxInputs}>
                        <button 
                            onClick={addBenefit} 
                            className={[styles.loginButton, (!(benefits.length < benefit.length))? styles.buttonDisabled:''].join(' ')}
                            disabled= {!(benefits.length < benefit.length)}>
                            <div style={{display: "flex"}}><AddIcon /> Agregar</div>
                        </button>
                    </div>
                </div>
                )
            
            case 3:
                return (
                    <div className={[stylesThis.boxText, stylesThis.backgBody].join(' ')}>
                        
                        <div className="card" style={{width:'100%'}}>
                        <AcordionPost
                                index={isImgServe?1:0}
                                img={imgProduct==null?imgServer:imgProduct}
                                characteristic={characteristic}
                                benefits={benefits}
                                frequencys={frequencys}
                                skipped={skipped}
                                isImgServe={isImgServe}
                                typePost={props.typePost}
                            /> 
                        </div>
                         
                    </div>
                )
        }
    }

    const selectRender =() =>{
        switch( props.typePost){
            case 1:
                return renderFormThink(index);
            case 2:
                return renderForms(index);
            case 3:
                return renderFormsResearch(index);

        }
    }



   return (
    <>
        { selectRender() }
    </>
        
   ) 

}

const mapStateToProps = (state: any) => ({
    isLoading: state.foro.isLoading,
    dataForo: state.foro.dataForo,
    error: state.foro.error,
    isLoadingPostById: state.foro.isLoadingPostById,
    dataPostByID: state.foro.dataPostByID,
    errorPostById: state.foro.errorPostById,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StepsFrom);