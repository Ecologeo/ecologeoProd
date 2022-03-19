import * as React from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { connect } from 'react-redux'
import * as foroAction from '../../actions/foro'
import { bindActionCreators } from 'redux'
import Badge, { BadgeProps } from '@mui/material/Badge';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { calculateTimePost } from '../../utils/index';
import config from '../../config';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        top: 5,
        background: '#3cb371',
        padding: '0 4px',
        color: '#FFF'
    },
}));


function ModalNoti(props: any) {
    const [open, setOpen] = React.useState(false);
    const [dataNoti, setDataNoti] = React.useState([]);
    const [countNewNoti, setCountNewNoti] = React.useState(0);

    const anchorRef = React.useRef<any>(null);
    //const history = useHistory();

    const handleToggle = () => {
        if(countNewNoti > 0){
            props.actions.updateStatusNotiAll({}) ;
            setCountNewNoti(0);
        }
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

    React.useEffect(() =>{
        props.actions.getNotifications({idUser:props.id_user})
    },[]);

    React.useEffect(() =>{
        if(props.dataNoti){
            setDataNoti(props.dataNoti);
            let count = 0;
            for(const noti of props.dataNoti){
                if(noti.status === 'NEW'){
                    count++;
                }
            }
            setCountNewNoti(count);
        }

    },[props.dataNoti])

    React.useEffect(() =>{
        if(props.dataNotiUp){
            window.location = config.url_web+props.dataNotiUp.urlMain;
        }

    },[props.dataNotiUp])

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);




    const redirectNoti = (noti:any) => {
        //history.push(url);
        noti.status = "OPENED";
        props.actions.updateStatusNoti(noti);
        //window.location = config.url_web+noti.urlMain;
    }


    return (


        <Stack direction="row" spacing={0}>


            <div
                ref={anchorRef}
                style={{ marginTop: "10px", cursor: 'pointer' }}
                onClick={handleToggle} >
                <StyledBadge
                    badgeContent={countNewNoti} >
                    <NotificationsNoneIcon color="action" fontSize="large" />
                </StyledBadge >
            </div>

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
                                    <List sx={{ width: '100%', maxWidth: 360, height: '70vh', overflow: 'auto', bgcolor: 'background.paper', paddingBottom:0 }}>
                                        <ListItem alignItems="flex-start">
                                            <Typography
                                                sx={{ display: 'inline', fontSize: '20px' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Notificaciones
                                            </Typography>
                                        </ListItem>
                                        {
                                        dataNoti.length > 0?
                                        dataNoti.map((val:any, id:any) =>(
                                            <>
                                            
                                             <ListItem key={id} alignItems="flex-start" sx={{bgcolor: val.status != 'OPENED'?'#e1edf2':'#FFF', padding:0}}>
                                             <ListItemButton  onClick={(e) => redirectNoti(val)}>
                                                 <ListItemAvatar>
                                                     <Avatar alt="Etiqueta" src={val.urlImage} />
                                                 </ListItemAvatar>
                                                 <ListItemText
                                                     primary={val.message}
                                                     secondary={
                                                         <React.Fragment>
                                                             {calculateTimePost(
                                                                val.year,
                                                                val.yearCurrent,
                                                                val.month,
                                                                val.monthCurrent,
                                                                val.day,
                                                                val.dayCurrent,
                                                                val.hour,
                                                                val.hourCurrent,
                                                                val.minutes,
                                                                val.minutesCurrent)}
                                                         </React.Fragment>
                                                     }
                                                 />
                                                 </ListItemButton>
                                             </ListItem>
                                             {dataNoti.length - 1 > id?<Divider  />:null}
                                             
                                             </>
                                             
                                        )):
                                        <div style={{padding: '20px' , textAlign: 'center'}}>
                                            <NotificationsNoneIcon color="action" fontSize="large" />
                                            <p>Todavia no tienes Notificaciones</p>
                                        </div>}
                                       
                                        

                                    </List>
                                </ClickAwayListener>
                            </Paper>
                            { /* <Paper>
                                <h3>Notificaciones</h3>
                                <ClickAwayListener onClickAway={handleClose}>
                                    
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {notifications.map((val:any, id:any)=>(
                                          <MenuItem key={id} onClick={redirectPerfil}>
                                                {val.message}
                                            </MenuItem>  

                                        ))}

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper> */ }
                        </Grow>
                    )}
                </Popper>
            </div>


        </Stack>

    );
}

const mapStateToProps = (state: any) => ({
    isLoadingNoti: state.foro.isLoadingNoti,
    errorNoti: state.foro.errorNoti,
    dataNoti: state.foro.dataNoti,
    dataNotiUp: state.foro.dataNotiUp
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalNoti);