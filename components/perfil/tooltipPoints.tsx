
import React, { useState, useEffect } from "react";
import styles from './style.module.scss';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';


export default function TooltipPoints(props: any) {

    const [itemInfo, setItemInfo] = useState(false);

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

      const handleTooltipClose = () => {
        setItemInfo(false)
      }

      const handleTooltipOpen = () => {
        setItemInfo(!itemInfo)
      }


    return (
          <HtmlTooltip
            PopperProps={{
              disablePortal: true,
            }}
            onClose={handleTooltipClose}
            open={itemInfo}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={<React.Fragment>
              <Typography variant="h6" color="inherit">Como Ganar Puntos</Typography>
              <p>1. Por publicar una recomendación ganas 5 puntos</p>
              <p>2. Por compartir un hallazgo ganas 3 puntos</p>
              <p>3. Por una petición de opinión ganas 2 puntos.</p>
              <p>4. Por cada punto positivo que recibas en un comentario ganas 1 punto.</p>
              <p>5. Por cada punto positivo recibido en una publicación (recomendación, hallazgo o petición) ganas 1 punto.</p>
              
              <p>Nota: Desde los 50 puntos podrás escoger un NFT.</p>
            </React.Fragment>}
          ><div className={styles.iconInfo} onClick={() => handleTooltipOpen()}><InfoIcon color="primary" /></div></HtmlTooltip>
         
        
      )

}