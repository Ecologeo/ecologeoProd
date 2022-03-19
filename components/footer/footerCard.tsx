import React from 'react';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { foot } from './footData';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(1),
  }));
 
  export default function footerCard(props: any) { 

    return (
            <div className="cardFoot">
            <div >
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                    background: 'transparent',
                    boxShadow: 0
                }}
                component="ul"
                > 
                
              {foot.map((val:any,id:any) =>(
                  
                   <ListItem key={id} >
                    <a href={val.link}>
                      <a className="a-footer">{val.label}</a>
                    </a>
                    </ListItem>
                ))} 
                </Paper>
                <div>
                    <span>© 2021 Ecologeo.</span>	
                </div>
            </div>
        </div>

    );
}
