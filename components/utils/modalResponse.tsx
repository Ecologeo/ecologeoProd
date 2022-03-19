import React, { useState, useEffect } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
    title: string,
    message: string,
    open: boolean
}

export default function ModalResponse(props:Props) {

    
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  useEffect(()=>{
      if(props.title){
          setTitle(props.title);
      }

  },[props.title])

  useEffect(()=>{
    if(props.message){
        setMessage(props.message);
    }

},[props.message]);

useEffect(()=>{
    if(props.open){
        setOpen(props.open);
    }

},[props.open])

  const handleClose = () => {
    setOpen(false);
}


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
                        <Box sx={styleModal}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {title}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '15px' }}>
                                {message}
                            </Typography>
                            <Button variant="outlined" onClick={handleClose}>Ok</Button>
                        </Box>
                    </Modal>

    )

}