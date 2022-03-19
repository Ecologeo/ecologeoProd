import React, { useState, useEffect } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FaLongArrowAltRight, FaTrashAlt } from 'react-icons/fa';
import { urlsData } from './data/urls';
import * as _ from 'lodash';
import styles from './style.module.scss';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';

export default function FieldsUrls(props: any) {


    const addFieldDato = (key:any, value:any, id:any) =>{

        return (
                    <TextField
                    fullWidth sx={{ margin: 0 }}
                    id="outlined-basic"
                    color="success"
                    focused 
                    variant="outlined" 
                    label="url"
                    name="value"
                    value={value}
                    inputProps={{ 
                        maxLength: 100,
                        autoComplete: 'off' }}
                    onChange={(e:any)=>props.handleChangeUrls(e,id)}
                    />  
                )
            
        }

    

    const redenItemMenu = (option:any, key:any)=>{

        const field = props.fields.filter((elem:any) => elem.key === option.value);
        if(field.length === 0 || option.value === key ){
            return (
                <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                </MenuItem>
            )
        }

       
    }

    return (
        <>
        <div style={{marginBottom: '20px'}} >
                        <Divider />
                    </div>
            {props.fields.map((val: any, id: any) => (
                <div key={id} className={styles.boxInputsUrls} >
                    <div className={stylesThis.bInput}>
                        <TextField
                            id="outlined-select-currency"
                            fullWidth sx={{ margin: 0 }}
                            color="success"
                            select
                            label="Tipo de Url"
                            focused 
                            name="key"
                            value={val.key}
                            onChange={(e:any)=>props.handleChangeUrls(e,id)}
                        >
                            <MenuItem key={'-9'} value={'-9'}>
                                   Seleccionar
                            </MenuItem>
                            {urlsData.map((option: any) => (
                                redenItemMenu(option, val.key)
                            )                               
                            )}
                        </TextField>
                    </div>
                    <div className={stylesThis.iconEquals}><FaLongArrowAltRight size={25} /></div>
                    <div className={stylesThis.iconMovil}>
                        <KeyboardArrowDownIcon fontSize="large" />
                        <div
                        style={{ cursor: "pointer", margin: '5px 0px 0px 20px' }}
                        onClick={() =>  props.removeUrl(id) }>
                            <FaTrashAlt size={20}  />
                        </div>
                    </div>  

                    <div className={stylesThis.bInput}>
                        {addFieldDato(val.key, val.value, id)}
                    </div>
                    <div 
                    style={{cursor: "pointer"}}
                    className={stylesThis.iconEquals} 
                    onClick={() =>  props.removeUrl(id) }><FaTrashAlt size={25} /></div>

                    <div className={stylesThis.diviMovil} >
                        <Divider />
                    </div>

                </div>
            ))}
        </>

    )

}