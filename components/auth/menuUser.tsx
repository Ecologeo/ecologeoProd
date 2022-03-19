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
import Avatar from '@mui/material/Avatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import avatar from '../../pages/assets/img/avatar_default.png';
import { connect } from 'react-redux'
import * as authAction from '../../actions/auth'
import { bindActionCreators } from 'redux'
import { get, cleanSession } from '../../utils/SesionStorage';
import ModalConfirm from '../utils/modalConfirm';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router'
import SupportIcon from '@mui/icons-material/Support';
import Image from 'next/image';
import Link from 'next/link';


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

function MenuUser(props: any) {
    const [open, setOpen] = React.useState(false);
    const [avatarUser, setAvatarUser] = React.useState(avatar);
    const [nameUser, setNameUser] = React.useState(null);
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [titleError, setTitleError] = React.useState('');
    const [messageError, setMessageError] = React.useState('');
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

    React.useEffect(() => {
        setAvatarUser(props.avatarUser)
    }, [props.avatarUser])

    React.useEffect(() => {
        setNameUser(props.nameUser)
    }, [props.nameUser])

    React.useEffect(() => {
        if (props.datalogout !== undefined) {
            cleanSession();
            window.location.href = "/";
            
        }
    }, [props.datalogout])

    React.useEffect(() => {
        if (props.error) {

            setTitleError('Ocurrió un error');
            setMessageError('Por favor comunícate con soporte');

            setOpenModal(true);
        }

    }, [props.error])

    const logout = () => {
        const token: any = get('@token');
        const data = { token }
        setModalConfirm(false);
        props.actions.logout(data);
    }

    const modalConfirmClose = () => {
        setModalConfirm(false)
    }

    const modalConfirmShow = () => {
        setModalConfirm(true)
    }

    const handleCloseError = () => {
        setOpenModal(false);
    }

    const myLoader = (image:any) => {
        return `${image.src}?w=${image.width}&q=${ image.quality  || 75}`;
    }

    const redirectPerfil = () => {
        router.push('/updatePerfil');
    }


    return (


        <Stack direction="row" spacing={0}>



            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                style={{marginRight: '10px'}}
                onClick={handleToggle}
            >
                <div style={{marginRight: '10px'}}>
                <Image
                    src={avatarUser}
                    alt="Avatar"
                    className="avatar"
                    width="40" 
                    height="40"
                    />
                </div>
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
                                        <a href={"/eco/" + props.id_user}>
                                        <MenuItem >
                                             {nameUser}
                                        </MenuItem>
                                        </a>
                                        <MenuItem onClick={redirectPerfil}>
                                             Actualizar el perfil
                                        </MenuItem>

                                        <a href={"/selectNft/"+ props.id_user}>
                                        <MenuItem >
                                             Escoge tu NFT
                                        </MenuItem>
                                        </a>
                                        
                                        <Divider />

                                        <a href={"/help"}>
                                        <MenuItem >
                                            <ListItemIcon>
                                                <SupportIcon fontSize="small" />
                                            </ListItemIcon>
                                            Soporte
                                        </MenuItem>
                                        </a>

                                        <MenuItem onClick={modalConfirmShow}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Cerrar sesión
                                        </MenuItem>

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>

            <Modal
                open={openModal}
                onClose={handleCloseError}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {titleError}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, marginBottom: '15px' }}>
                        {messageError}
                    </Typography>
                    <Button variant="outlined" onClick={handleCloseError}>Ok</Button>
                </Box>
            </Modal>

            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={props.isLoading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>


            <ModalConfirm
                open={modalConfirm}
                onClose={modalConfirmClose}
                onAction={logout}
                title={"¿Seguro de cerrar sesión?"}
                content={"Puedes volver a conectarte en cualquier momento."} />

        </Stack>

    );
}

const mapStateToProps = (state: any) => ({
    isLoading: state.auth.isLoading,
    error: state.auth.error,
    datalogout: state.auth.datalogout
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(authAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuUser);