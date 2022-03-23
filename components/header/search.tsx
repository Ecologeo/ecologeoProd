import React, { useState, useEffect } from 'react';
import styles from '../../pages/home/style.module.scss';
import { FaSearch, FaEllipsisH } from "react-icons/fa";
import { get } from '../../utils/SesionStorage';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import config from '../../config';
import Stack from '@mui/material/Stack';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Divider from '@mui/material/Divider';
import { useRouter } from 'next/router'
import stylePerfil from "../perfil/style.module.scss";

export default function Search(props:any) {

    const [searchTerm, setSearchTerm] = React.useState(props.term??"");
    const [searchResults, setSearchResults] = React.useState<any>([]);
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = useState('');
    const anchorRef = React.useRef<any>(null);
    const router = useRouter();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(()=>{
        const tok = get("@token") ?? '';
        setToken(tok);
    },[])

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
    /*React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);*/

 const handleChange = async (event:any) => {
    setSearchTerm(event.target.value);
    if(event.target.value.length >= 2 ){
        const params = {
            term: event.target.value
        }
        let result = await axios({
            method: 'get',
            url: "/api/post/query/v1-api-post-searcheco",
            params,
            headers: {
                'Cache-Control': 'no-cache',
                'content-type': 'application/json',
                'authorization': token
            }
        }).then((response) => {
            return response.data;
        }).catch((error) => {
            //handle error
            //console.log(error);
        });
        
        if(result && (result.post.length > 0 || result.users.length > 0)){
            setOpen(true)
            setSearchResults(result);
        }else{
            setSearchResults({});
            setOpen(false)
        }
    }else{
        setSearchResults({});
            setOpen(false)
    }
    
    
  };

  const handleKeyDown = (e:any) =>{
    if (e.key === 'Enter') {
        router.push('/search/'+searchTerm+'/'+verifyTabs())
      }
  }

  const verifyTabs = () =>{
    const post = searchResults.hasOwnProperty('post') && searchResults.post.length >0;
    const user = searchResults.hasOwnProperty('users') && searchResults.users.length >0;
    return user? 'c':(post?'p':'c');
  }
 
  return (
    
    <>
        <Stack direction="row" spacing={0} sx={{justifyContent: 'center'}}>
        <form 
            ref={anchorRef}
            className={styles.formSearchInput}>
          <input 
            type="search" 
            placeholder="Buscar" 
            className={styles.searchInput} 
            value={searchTerm}
            onChange={handleChange} 
            onKeyDown={handleKeyDown} />
          <button type="button" onClick={() => router.push('/search/'+searchTerm+'/'+verifyTabs())} className={styles.searchButton}> <FaSearch size={25} color="#3cb371" /></button>
        </form>
        <div>
        <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    className={styles.modalSearch}
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                zIndex: 100
                            }}
                            
                        >
                            <Paper >
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        
                                        {
                                            searchResults.hasOwnProperty('users') 
                                            && searchResults.users.length >0?
                                            <>
                                            <p className={styles.pModalSearch}>Cuentas:</p>
                                            {searchResults.users.map((val:any, id:any)=>(
                                                <a key={id} href={"/eco/" + val.userName}>
                                                <MenuItem>
                                                <div style={{display: 'block'}}>
                                                    <p className={stylePerfil.pnameSearch}>{val.name}</p>
                                                    <p className={stylePerfil.pUsernameSearch}>@{val.userName}</p>
                                                </div>
                                                    
                                                </MenuItem>
                                                </a>
                                            ))}
                                            </>:null
                                        }

                                        {
                                            searchResults.hasOwnProperty('post') 
                                            && searchResults.hasOwnProperty('users')
                                            && searchResults.post.length >0
                                            && searchResults.users.length >0?
                                            <Divider />:null
                                        }
                                        
                                        {
                                            searchResults.hasOwnProperty('post')
                                            && searchResults.post.length >0?
                                            <>
                                            <p className={styles.pModalSearch}>Productos:</p>
                                            {searchResults.post.map((val:any, id:any)=>(
                                                <a key={id} href={"/post/" + val.post}><MenuItem >
                                                   {val.value}
                                                </MenuItem>
                                                </a> 
                                            ))}
                                            </>
                                            :null
                                        }

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
                </div>
        </Stack>
    </>
        
    
  )
}

