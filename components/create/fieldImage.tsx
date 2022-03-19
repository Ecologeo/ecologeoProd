import React, { useState, useEffect, useRef } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import { FaFileUpload } from 'react-icons/fa';


export default function FieldImage(props: any) {

    const inputEl = useRef<any>(null);
    const imgEl = useRef<any>(null);
    const [imgProduct, setImgProduct] = useState('');

    useEffect(() =>{
        setImgProduct(props.img);
        if(!props.isImgServe){
            updateImage(props.img);
        }
    }, [props.img])

    const openFolder = () => {
        inputEl.current.click();
    }

    const updateImage = (file:any) =>{
        var preview = imgEl.current;
        var reader  = new FileReader();
        reader.onloadend = function () {
          preview.src = reader.result;
        }
        if (file) {
            reader.readAsDataURL(file);
          } else {
            preview.src = "";
          }
    }


    const sub = (e:any) => {
        e.preventDefault();
        var file    = inputEl.current.files[0];
        if (file) {
            updateImage(file);
            props.setImage(file);
            props.setIsImgServe(false);
        } 
        
      }

    return (
        <div className={stylesThis.boxUploadImg} >
            <div className={stylesThis.textIcon} onClick={openFolder}>
                <div style={{display: (imgProduct !==null? 'none': '')}} >
                    <p>Subir imagen del producto o servicio.</p>
                    <p style={{color:"#747474"}}>Peso menos de: 50MG</p>
                    <p style={{color:"#747474"}}>Tamaño en pixeles: 500x400</p>
                    <FaFileUpload color="#3cb371" size={35} />
                </div>
                <img 
                    style={{display: (imgProduct !==null? '': 'none')}}
                    ref={imgEl} 
                    src={''+imgProduct} 
                    height="200" />
                
            </div>
            <input 
                ref={inputEl}
                type="file"  
                className={stylesThis.inputFile}
                accept="image/*"
                onChange={(e) => sub(e)}/>
        </div>

    )

}