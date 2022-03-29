import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { FaEllipsisH } from "react-icons/fa";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from 'next/router'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function MenuListComposition(props:any) {
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const router = useRouter();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const copyLink =(event: Event | React.SyntheticEvent) =>{
    
    
    var textField = document.createElement('textarea')
    textField.innerText = 'https://ecologeo.com/post/'+props.idPost+'/'+props.namePost
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove();

    handleClose(event);
    handleClickAlert();
        
  }

  const redirectToUpdatePost = () =>{
    router.push('/create/'+props.idPost+"/"+props.typePost);
  }

  return (
         
   
    <Stack direction="row" spacing={0}>

      <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          <FaEllipsisH 
          size={20}
          color="#3CB371"
          />
        </Button>
      
      <div>
        
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-end"
          transition
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                zIndex: 100
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={copyLink}>
                    <ContentCopyIcon />
                      Copiar enlace del Post
                    </MenuItem>
                    {props.id_user === props.userPost?
                    <>
                    <MenuItem onClick={() => props.removePost(props.idPost, props.urlImage)}>
                     
                    <DeleteOutlineIcon />
                    Eliminar publicación
                  
                    </MenuItem>
                    <MenuItem onClick={() => redirectToUpdatePost()}>
                     
                     <EditIcon />
                     Actualizar publicación
                   
                     </MenuItem>
                    </>:null
                    }
                    
                    
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>

      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
          Enlace copiado!
        </Alert>
      </Snackbar>        

    </Stack>
    
  );
}
