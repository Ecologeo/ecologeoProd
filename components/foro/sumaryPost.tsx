import React, { useState, useEffect, useRef } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import styleForo from '../foro/style.module.scss';
import { FaFileUpload } from 'react-icons/fa';
import { Accordion, AccordionSummary, AccordionDetails } from './accordion';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { charact, type, sello } from '../create/data/characteristics';
import { benefit } from '../create/data/benefits';
import { frequency } from "../create/data/frequency";
import { capitalize, getNameUrlSimple } from '../../utils';
import ModalImage from './modalImage';
import Image from 'next/image';
import Link from 'next/link';


export default function SumaryPost(props: any) {

    const inputEl = useRef<any>(null);
    const imgEl = useRef<any>(null);
    const [expanded, setExpanded] = useState<string | false>();
    const [character, setCharacter] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [frequencys, setFrequencys] = useState([]);
    const [skipped, setSkipped] = useState(new Set<number>());
    const [nameProd, setNameProd] = useState('');
    const [openImg, setOpenImage] = useState(false);
    const [imgSrc, setImageSrc] = useState<any>('');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    useEffect(() => {
        if (props.index === 0) {
            updateImage(props.img);
        }
        setImageSrc(props.img);
    }, [props.img])

    useEffect(() => {
        if (props.characteristic) {
            const name: any = props.characteristic.filter((el: any) => el.key == 'name');
            setNameProd(name[0].value);
            setCharacter(props.characteristic);
        }

    }, [props.characteristic]);

    useEffect(() => {
        setBenefits(props.benefits);
    }, [props.benefits]);

    useEffect(() => {
        setFrequencys(props.frequencys);
    }, [props.frequencys]);

    useEffect(() => {
        setSkipped(props.skipped);
    }, [props.skipped])

    const updateImage = (file: any) => {
        var preview = imgEl.current;
        var reader = new FileReader();
        reader.onloadend = function () {
            preview.src = reader.result;
        }
        if (file) {
            reader.readAsDataURL(file);
        } else {
            preview.src = "";
        }
    }

    const getLabel = (data: any, key: any) => {
        const label = data.filter((elemt: any) => elemt.value === key);
        return label.length > 0 ? label[0].label : 'Sin datos';
    }

    const getcharacter = (val: any) => {

        switch (val.key) {
            case 'name':
            case 'where':
            case 'other':
                return capitalize(val.value);
            case 'price':
                return val.value + ' ' + val.aux
            case 'type':
                return getLabel(type, val.value);
            case 'sello':
                return getLabel(sello, val.value);
            case 'eco':
                return (typeof val.value === 'object') ? val.value.join(', ') : val.value

        }

    }

    const renderTables = (data: any, arr: any, type: any) => {
        return (
            <TableContainer component={Paper} sx={{ boxShadow: '0px 0px 0px 0px' }}>
                <Table aria-label="simple table" sx={{ border: 0 }}>
                    <TableBody>
                        {data.map((val: any, id: any) => (
                            <TableRow
                                key={id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row"
                                    sx={{ fontSize: '0.995rem', fontWeight: '600', color: 'rgba(70, 70, 70, 0.87)' }}>
                                    {getLabel(arr, val.key)}
                                </TableCell>
                                <TableCell sx={{ fontSize: '0.995rem' }} align="left">
                                    {type === 'character' ? getcharacter(val) : val.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        )
    }

    const onCloseImg = () => {
        setOpenImage(false)
    }
    
    

    return (
        <div >

            <div className={styleForo.cardBodySummary}>
                
                        <Link href={"/post/"+props.idPost+"/"+getNameUrlSimple(nameProd)}>
                        <div className={styleForo.imageSumary}>
                        <Image
                            layout="fill" objectFit="contain"
                            src={props.index === 0 ? '' : props.img}
                            className={styleForo.image}
                        />
                        </div>
                        </Link>
                        <Link href={"/post/"+props.idPost+"/"+getNameUrlSimple(nameProd)}>
                        <Typography sx={{marginTop:'10px',
                         cursor: 'pointer', 
                         textAlign: 'left',
                         padding: '5px', 
                         marginLeft: '10px' }} >
                             <b>{nameProd}</b>
                        </Typography>
                        </Link>
            </div>

            <ModalImage
                open={openImg}
                onClose={onCloseImg}
                img={props.index === 0 ? '' : props.img}
            />
        </div>
    )

}