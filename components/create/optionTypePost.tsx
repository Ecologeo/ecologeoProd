import React, { useState, useEffect, useRef } from "react";
import stylesThis from '../../pages/create/styles.module.scss';
import { FaFileUpload } from 'react-icons/fa';
import * as _ from 'lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const stylesPa = {
  width: '178px',
  height: '178px',
  cursor: 'pointer',
  padding: '10px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  fontSize: '20px'
}

export default function OptionTypePost(props: any) {

  const [itemInfo, setItemInfo] = useState(0)

  const selectOption = () => {

  }

  const handleTooltipOpen = (item: any) => {
    setItemInfo(itemInfo != item ? item : 0)
  }

  const handleTooltipClose = () => {
    setItemInfo(0)
  }

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      width: 250,
      fontSize: theme.typography.pxToRem(14),
      border: '1px solid #dadde9',
      padding: '10px'
    },
  }));

  const renderTooltip = (data: any) => {
    return (
      <div className={stylesThis.helpCreate}>
        <HtmlTooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={itemInfo == data.item}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={<React.Fragment>
            <Typography color="inherit">{data.title}</Typography>
            {data.text}
          </React.Fragment>}
        ><div onClick={() => handleTooltipOpen(data.item)}><InfoIcon color="primary" /></div></HtmlTooltip>
      </div>
    )
  }


  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        textAlign: 'center',
        '& > :not(style)': {
          margin: '20px',
          width: '178px',
          height: '178px',
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          fontSize: '20px'
        },
      }}
    >
      <div>
        <Paper
          onClick={() => props.updateTypePost(1)}
          elevation={3}
          sx={{ background: '#8EC0D8', color: '#115576', ...stylesPa }}
        >
          <p>Pedir <span style={{ fontWeight: 'bold', fontSize: '23px' }}>opiniones</span> de un producto ecológico</p>

        </Paper>
        {renderTooltip({ item: 1, title: "Opiniones", text: "Cuando vas a comprar un producto y quieres saber las opiniones de los miembros de la comunidad Ecologeo, esta es la mejor opción." })}

      </div>
      <div>
        <Paper
          onClick={() => props.updateTypePost(2)}
          elevation={3}
          sx={{ background: '#90E0B3', color: '#0D8541', ...stylesPa }}
        >
          <p> Hacer una <span style={{ fontWeight: 'bold', fontSize: '23px' }}>recomendación</span> de un producto ecológico</p>
        </Paper>
        {renderTooltip({ item: 2, title: "Recomendaciones", text: "Para brindar una recomendación de un producto e incentivar el uso de este porque sabes que su proceso de producción es amigable con el ambiente, esta es la mejor opción." })}
      </div>
      <div>
        <Paper
          onClick={() => props.updateTypePost(3)}
          elevation={3}
          sx={{ background: '#FFD5A4', color: '#BA6C12', ...stylesPa }}
        >
          <p> Mostrar un <span style={{ fontWeight: 'bold', fontSize: '23px' }}>hallazgo</span> de un producto ecológico</p>
        </Paper>
        {renderTooltip({ item: 3, title: "Hallazgo", text: "Si encontraste un producto ecológico que te parece interesante y que seguramente comprarás porque es amigable con el medioambiente y otros beneficios adicionales, esta es tu mejor opción." })}
      </div>
    </Box>

  )

}