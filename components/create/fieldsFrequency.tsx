import React, { useState, useEffect } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import { Input } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { FaLongArrowAltRight, FaTrashAlt } from 'react-icons/fa';
import { frequency, valueKeyF } from './data/frequency';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as _ from 'lodash';

const min = 1;
const max = 1000;

export default function FieldsBenefit(props: any) {


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
                            onChange={(e:any)=>props.handleChangeFrequency(e,id)}
                        >
                            <MenuItem key={'-9'} value={'-9'}>
                                   Seleccionar
                            </MenuItem>
                            {frequency.map((option: any) => (
                                redenItemMenu(option, val.key)
                            )                               
                            )}
                        </TextField>
                    </div>
                    <div className={stylesThis.iconEquals}><FaLongArrowAltRight size={25} /></div>
                    <div className={stylesThis.iconMovil}>
                        <KeyboardArrowDownIcon fontSize="large" />
                    </div> 

                    <div className={stylesThis.bInput}>
                        <TextField 
                        fullWidth sx={{ margin: 0 }}
                        disabled = {(val.key === 'one' || val.key === '-9')}
                        id="outlined-basic"
                        color="success"
                        focused
                        name="value"
                        label="Cantidad"
                        type="number"
                        value={val.value}
                        inputProps={{
                            min, max,
                            autoComplete: 'off' }}
                        onChange={(e:any)=>{
                            var value = parseInt(e.target.value, 10);
                            if (value > max) value = max;
                            if (value < min) value = min;
                            const e2 = {
                                target: {
                                    name: 'value',
                                    value
                                }
                            }
                            props.handleChangeFrequency(e2,id)
                        }
                            
                            }
                        />  
                    </div>
                    

                </div>
            ))}
        </>

    )

}