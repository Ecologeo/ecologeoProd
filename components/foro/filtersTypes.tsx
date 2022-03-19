import React, { useState, useEffect, useRef } from 'react';
import * as userAction from '../../actions/user';
import * as postAction from '../../actions/foro';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import avatar from '../../pages/assets/img/avatar_default.png';
import styleThis from '../perfil/style.module.scss';
import styleCreate from '../../pages/create/styles.module.scss';
import { get } from '../../utils/SesionStorage';
import CircularProgress from '@mui/material/CircularProgress';
import { type } from '../create/data/characteristics';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import DoneIcon from '@mui/icons-material/Done';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

 
function FilterTypes(props: any) {
    const [typeExclude, setTypeExclude] = useState<any>([]);
    const [id_User, setId_User] = useState('');
 
    /*const handleDelete = (chipToDelete: ChipData) => () => {
        setChipData((chips) => chips.filter((chip) => chip.value !== chipToDelete.value));
      };*/

    useEffect(() =>{
        if(props.id_user){
            setId_User(props.id_user);
            props.actions.getUser({ user_id:props.id_user });
        }
        
    },[])

    useEffect(() => {
        if (props.dataUser) {
            setTypeExclude(
                props.dataUser.hasOwnProperty('typeExclude') && 
                props.dataUser.typeExclude != "" &&
                props.dataUser.typeExclude != "-" ? props.dataUser.typeExclude.split("-") : []);
        }
    }, [props.dataUser])
    
    /*useEffect(() =>{
        props.onFilterByType(typeExclude.join('-'));
    },[typeExclude])*/

    const handleClick = (value:any) =>{
        let typeEx = [];
        if(typeExclude.indexOf(value) != -1){
            //setTypeExclude((types:any) => types.filter((type:any) => type != value));
            typeEx = typeExclude.filter((type:any) => type != value)
        }else{
            //setTypeExclude((types:any) => [...types, value]);
            typeEx = [...typeExclude, value];
        }
        props.onFilterByType(typeEx.length > 0? typeEx.join('-'):'-')
        setTypeExclude(typeEx);
    }
    const verifyType = (value:any) =>{
        return typeExclude.includes(value);
    }

    return (
            <div className="cardTypes">
            <div >
            <h3>Tipos de productos</h3>
            <Paper
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    listStyle: 'none',
                    p: 0.5,
                    m: 0,
                }}
                component="ul"
                > 
                
              {type.map((val:any,id:any) =>(
                   <ListItem key={id}>
                  <Chip 
                    label={val.label} 
                    size="small" 
                    onClick={() => handleClick(val.value)}
                    variant={verifyType(val.value)?'outlined':'filled'}
                    deleteIcon={<DoneIcon />}
                    />
                  </ListItem>
                ))} 
                </Paper>
            </div>
        </div>

    );
}

const mapStateToProps = (state: any) => ({
    isLoading: state.user.isLoading,
    dataUser: state.user.dataUser,
    error: state.user.error,
    isLoadingCountFollows: state.foro.isLoadingCountFollows,
    errorCountFollows: state.foro.errorCountFollows,
    dataCountFollows: state.foro.dataCountFollowsPerfil,
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch),
    actionsPost: bindActionCreators(postAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterTypes);