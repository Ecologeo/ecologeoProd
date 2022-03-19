import React, { useEffect, useState } from "react";
import styles from './styles.module.scss';
import desc from './desc.js';
import ReactHtmlParser from 'react-html-parser';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


function closeOther(acc: any, panl: any) {
    for (const ac of acc) {
        ac.classList.remove("aActive");
    }
    for (const pa of panl) {
        pa.style.maxHeight = null;
    }
}

function closeOther0(panl: any) {
    
    for (const pa of panl) {
        pa.style.display = 'none';
    }
}

function selectItem(item: number) {
    return desc.filter(elem => elem.id === item)[0];
}

function hanledAccordion(e: any) {
    var acc = document.getElementsByClassName("accordion");
    var panl = document.getElementsByClassName("panel");

    const panel = e.currentTarget.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        closeOther(acc, panl);
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    e.currentTarget.classList.toggle("aActive");

}

/*function hanledAccordion0(id: any) {
    //var acc = document.getElementsByClassName("accordion0");
    var panl = document.getElementsByClassName("panel0");


    const panel:any = panl[id-1]// e.currentTarget.nextElementSibling;
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
    } else {
        closeOther([], panl);
        console.log("panel.scrollHeight: ", panel.scrollHeight);
        panel.style.maxHeight = panel.scrollHeight + "px";
    }
    //e.currentTarget.classList.toggle("aActive0");
    

}*/


export default function Help() {

    const [item, setItem] = useState(selectItem(1));
    const [idItem, setIdItem] = useState(1);


    var itemActive = (id: number) => {
        return id === idItem ? [styles.liActive, styles.divli].join(' ') : styles.divli;
    }

    var  hanledAccordion0 =(e: any) => {
        //var acc = document.getElementsByClassName("accordion0");
        var panl = document.getElementsByClassName("panel0");
    
    
        const panel:any = e.currentTarget.nextElementSibling;
        if (panel.style.display === 'block') {
            panel.style.display = 'none';
        } else {
            closeOther0(panl);
            panel.style.display = "block";
        }
        e.currentTarget.classList.toggle("aActive0");
        
    }


    var renderText = () => {
        
        return (
            <div className={styles.columnRight}>

                    {item.desc.map((val: any, id: any) => (
                        <div key={id}>
                            <button onClick={(e) => hanledAccordion(e)} className="accordion">{val.title}</button>
                            <div className="panel">
                                {ReactHtmlParser(val.text)}
                            </div>
                        </div>
                    ))}

            </div>)
        
    }

    return (
        <div className={styles.containerHelp}>
            <div className={styles.divLinkWE} >
                <a className={styles.linkWE} target="_blank" href="http://api.whatsapp.com/send?phone=+573127403022"> 
                <WhatsAppIcon /> 
                <span className={styles.spanWE} >3127403022</span>
                </a>
                <a className={styles.linkWE}> 
                    <MailOutlineIcon/> 
                <span className={styles.spanWE}>info@ecologeo.com</span> </a>
            </div>
            
            <h1>Ayuda</h1>
            <div className={styles.blockColumns}>
                <div className={styles.columnLeft}>

                    {desc.map((val, id)=>(
                        <div key={id} >
                            <div className={itemActive(val.id)} onClick={(e) => { setItem(selectItem(val.id)); setIdItem(val.id); hanledAccordion0(e); }}>{val.name}</div> 
                            <div className={'panel0'} >{renderText()}</div> 
                        </div> 
                    ))}
                    
                </div>
                
            </div>
        </div>
    )


}