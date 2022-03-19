import React, { useState, useEffect, useRef } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { FaLongArrowAltRight, FaTrashAlt, FaLevelDownAlt } from 'react-icons/fa';
import { charact, eco, type, sello, ecoText } from './data/characteristics';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import * as _ from 'lodash';
import { valueKey } from './data/characteristics';
import { currency } from './data/currency'
import InputAdornment from '@mui/material/InputAdornment';
import AutoNumeric from "autonumeric"
import CurrencyTextField from './currencyTextField';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Divider from '@mui/material/Divider';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            width: 250
        },
    },
};



export default function FieldsCharact(props: any) {

    const [currencyValue, setCurrencyValue] = useState('COP')
    const [open, setOpen] = React.useState(false);

    let inputPrice: any = useRef<any>(null)

    //const options = { style: 'currency', currency: 'COP' };
    const numberFormat = new Intl.NumberFormat('es-ES');
    let autonumeric: any = null;


    const handleChangeEco = (event: SelectChangeEvent<string[]>, id: any) => {
        const { target: { value } } = event;
        let dato = typeof value === 'string' ? value.split(',') : value;

        if (dato.indexOf('Seleccionar') > -1) {
            _.remove(dato, function (c) {
                return (c === "Seleccionar");
            });
        }

        if (dato.length === 0) {
            dato = valueKey['eco'];
        }

        const e = {
            target: {
                name: 'value',
                value: dato
            }
        }
        props.handleChangeCharacter(e, id);
    };


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };


    const addFieldDato = (val: any, id: any) => {

        switch (val.key) {
            case 'name':
            case 'where':

                return (
                    <TextField
                        fullWidth sx={{ margin: 0 }}
                        id="outlined-basic"
                        color="success"
                        placeholder="Dato"
                        focused
                        variant="outlined"
                        name="value"
                        value={val.value}
                        helperText={val.key=='where'?"País-Ciudad-Tienda ó Sitio web ":""}
                        inputProps={{
                            maxLength: 100,
                            autoComplete: 'off'
                        }}
                        onChange={(e: any) => props.handleChangeCharacter(e, id)}
                    />
                )
            case 'price':
                return (
                    <div style={{ display: 'flex' }}>
                        <FormControl focused sx={{ margin: 0, width: '30%' }}>
                            <Select
                                labelId="demo-controlled-open-select-label"
                                id="demo-controlled-open-select"
                                open={open}
                                onClose={handleClose}
                                onOpen={handleOpen}
                                value={val.aux}
                                color="success"
                                name="aux"
                                onChange={(e: any) =>  props.handleChangeCharacter(e, id)}
                                input={
                                    <OutlinedInput />
                                }
                            >
                                {currency.map((option: any) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {open ? option.label : option.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <CurrencyTextField
                            fullWidth sx={{ margin: 0, marginLeft: '10px', width: '70%' }}
                            variant="outlined"
                            value={val.value}
                            currencySymbol="$"
                            preDefined="integerPos"
                            //minimumValue="0"
                            outputFormat="string"
                            digitGroupSeparator=","
                            decimalCharacter="."
                            color="success"
                            focused
                            name="value"
                            inputProps={{
                                maxLength: 10,
                                autoComplete: 'off'
                            }}
                            onChange={(e: any) =>  props.handleChangeCharacter(e, id)}
                        />


                    </div>
                )

            case 'eco':
                return (
                    <FormControl focused sx={{ margin: 0, width: '100%' }}>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            color="success"
                            multiple
                            name='value'
                            value={val.value}
                            onChange={(e) => handleChangeEco(e, id)}
                            input={
                                <OutlinedInput />
                            }
                            renderValue={(selected) => {
                                return selected.join(', ')
                            }}
                            MenuProps={MenuProps}
                            fullWidth sx={{ margin: 0 }}
                            SelectDisplayProps={
                                {}
                            }
                        >

                            {ecoText.map((name: any) => (
                                <MenuItem key={name} value={name} >
                                    <Checkbox checked={val.value.indexOf(name) > -1} />
                                    <ListItemText
                                        primary={name}
                                        primaryTypographyProps={{ style: { whiteSpace: "normal" } }}
                                    >
                                    </ListItemText>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )
            case 'type':
            case 'sello':
                const data = val.key === 'type' ? type : sello;
                return (
                    <TextField
                        id="outlined-select-currency"
                        fullWidth sx={{ margin: 0 }}
                        select
                        placeholder="Seleccionar"
                        focused
                        color="success"
                        value={val.value}
                        name="value"
                        onChange={(e: any) => props.handleChangeCharacter(e, id)}
                    >
                        <MenuItem key={'-9'} value={'-9'}>
                            Seleccionar
                        </MenuItem>
                        {data.map((option: any) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                )
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
                        value={val.value}
                        inputProps={{ maxLength: 500 }}
                        onChange={(e: any) => props.handleChangeCharacter(e, id)}
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

    const redenItemMenu = (option: any, key: any) => {

        const field = props.fields.filter((elem: any) => elem.key === option.value);
        if (field.length === 0 || option.value === key) {
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
                            disabled={id <= 1 ? true : false}
                            id="outlined-select-currency"
                            fullWidth sx={{ margin: 0 }}
                            color="primary"
                            select
                            placeholder="Atributo"
                            focused
                            name="key"
                            value={val.key}
                            onChange={(e: any) => props.handleChangeCharacter(e, id)}
                        >
                            <MenuItem key={'-9'} value={'-9'}>
                                Seleccionar
                            </MenuItem>
                            {charact.map((option: any) => (
                                redenItemMenu(option, val.key)
                            )
                            )}
                        </TextField>
                    </div>
                    <div 
                        className={stylesThis.iconEquals}>
                            <FaLongArrowAltRight size={25} />
                    </div>
                    <div className={stylesThis.iconMovil}>
                        <KeyboardArrowDownIcon fontSize="large" />
                        <div
                        style={{ cursor: "pointer", margin: '5px 0px 0px 20px' }}
                        onClick={() => { if (id > 1) props.removeCharacter(id) }}>
                            <FaTrashAlt size={20} color={id <= 1 ? '#cccccc' : ''} />
                        </div>
                    </div>        

                    <div className={stylesThis.bInput}>
                        {addFieldDato(val, id)}
                    </div>
                    
                    <div
                        style={{ cursor: "pointer" }}
                        className={stylesThis.iconEquals}
                        onClick={() => { if (id > 1) props.removeCharacter(id) }}>
                            <FaTrashAlt size={25} color={id <= 1 ? '#cccccc' : ''} />
                    </div>

                    <div className={stylesThis.diviMovil} >
                        <Divider />
                    </div>

                </div>
                
            ))}
        </>

    )

}