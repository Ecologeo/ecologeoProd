import React, { useState, useEffect } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FaLongArrowAltRight, FaTrashAlt } from 'react-icons/fa';
import { benefit } from './data/benefits';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';
import * as _ from 'lodash';

export default function FieldsBenefit(props: any) {


    const addFieldDato = (key:any, value:any, id:any) =>{

        switch(key){
            case 'health':
            case 'environment':
            case 'quality':  
            case 'animal': 
            case 'other':
                return (
                    <TextField
                    id="outlined-multiline-static"
                    focused
                    placeholder="Dato"
                    color="success"
                    multiline
                    rows={3}
                    fullWidth sx={{ margin: 0 }}
                    name="value"
                    value={value}
                    inputProps={{ maxLength: 500 }}
                    onChange={(e:any)=>props.handleChangeBenefit(e,id)}
                  />
                )
            default:
                return (
                    <TextField
                    fullWidth sx={{ margin: 0 }}
                    disabled
                    id="outlined-basic"
                    label="Dato"
                    variant="outlined" />  
                )
                    
                
        }

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
            {props.fields.map((val: any, id: any) => (
                <div key={id} className={stylesThis.boxInputs}>
                    <div className={stylesThis.bInput}>
                        <TextField
                            id="outlined-select-currency"
                            fullWidth sx={{ margin: 0 }}
                            color="success"
                            select
                            placeholder="Atributo"
                            focused 
                            name="key"
                            value={val.key}
                            onChange={(e:any)=>props.handleChangeBenefit(e,id)}
                        >
                            <MenuItem key={'-9'} value={'-9'}>
                                   Seleccionar
                            </MenuItem>
                            {benefit.map((option: any) => (
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
                        onClick={() =>  props.removeBenefit(id) }>
                            <FaTrashAlt size={20}  />
                        </div>
                    </div>   

                    <div className={stylesThis.bInput}>
                        {addFieldDato(val.key, val.value, id)}
                    </div>
                    <div 
                    style={{cursor: "pointer"}}
                    className={stylesThis.iconEquals} 
                    onClick={() =>  props.removeBenefit(id) }><FaTrashAlt size={25} /></div>

                    <div className={stylesThis.diviMovil} >
                        <Divider />
                    </div>

                </div>
            ))}
        </>

    )

}