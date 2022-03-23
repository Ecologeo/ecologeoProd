import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ModalDetail from '../modals/details';
import styles from '../../pages/home/style.module.scss';
import styleThis from './style.module.scss';
import { connect } from 'react-redux'
import * as userAction from '../../actions/user';
import { bindActionCreators } from 'redux';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {CustomInput} from '../../utils/inputPlaceHolder';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TooltipPoints from './tooltipPoints';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ModalConfirm from '../utils/modalConfirm';
import stylesForo from '../foro/style.module.scss';
import Divider from '@mui/material/Divider';


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

const PAGESIZE = 100;


function SelectNft(props: any) {

    const [show, setShow] = useState(props.show);
    const [imagesNft, setImagesNft] = useState([]);
    const [checked, setChecked] = useState<any>([]);
    const [address, setAddress] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const [titleError, setTitleError] = useState('');
    const [messageError, setMessageError] = useState('');
    const [nft, setNft] = useState<any>({});
    const [points, setPoints] = useState(0);
    const [collections, setCollections] = useState([]);
    const [valueFilter, setValueFilter] = useState<any>([]);
    const [valuePFilter, setValuePFilter] = useState<any>([]);
    const [pointsFilter, setPointsFilter] = useState<any>([]);
    const [sumPoints, setSumPoints] = useState(0);
    const [contentModal, setContentModal] = useState('');
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [pageImageNFT, setPageImageNFT] = React.useState(1);

    useEffect(() =>{
        props.actions.NftByUser({ user_id: props.user_id });
        if(imagesNft.length == 0){
            props.actions.imageNftByStatus(
                {
                    status:'active', 
                    filterC:[],
                    filterP:[],
                    pageSize: PAGESIZE,
                    pageNum: pageImageNFT});
        }
        if(collections.length == 0){
            props.actions.getCollections({status:'active', filter:''});
        }

    },[])

    useEffect(() =>{
        if(props.dataNft){
            setNft(props.dataNft);
            setPoints(props.dataNft.points);
        }
        
        
    },[props.dataNft])

    useEffect(() =>{
        setPageImageNFT(props.pageImageNFT);

    },[props.pageImageNFT])

    useEffect(() =>{

        if(props.dataCollections){
            setCollections(props.dataCollections.filterC);
            setPointsFilter(props.dataCollections.filterP);
        }
    },[props.dataCollections])

  

    useEffect(()=>{
        if(props.dataImageNft){
            setImagesNft(props.dataImageNft);
        }

    },[props.dataImageNft])

    useEffect(() =>{
        if(props.dataSelectNft){
            setTitleError('NFT Escogido');
            setMessageError('Se guardó exitosamente el NFT que escogiste, te notificaremos vía correo electrónico cuando lo enviemos a tu dirección de wallet, o realicemos la venta en caso que no tengas tu dirección de wallet aun, si lo vendemos por ti te enviaremos el dinero a tu cuenta.');
            setOpenModal(true);
        }
        
    },[props.dataSelectNft])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id:string, point:number) => {
        const check = [...checked];
        if(event.target.checked){
            check.push(id);
            setSumPoints(sumPoints + point);
        }else{
            check.splice(check.indexOf(id),1);
            setSumPoints(sumPoints - point);
        }
        setChecked(check);
        
    };

    const handleInput = (e:any) =>{
        setAddress(e.target.value);
    }

    const modalConfirmShow = (e:any) => {
        e.preventDefault();
        if(checked.length > 0){
            setModalConfirm(true);
            setContentModal('¿Confirma la adquisición de '+checked.length+' NFT?');
        }
        
    }

    const modalConfirmClose = () => {
        setModalConfirm(false)
    }

    const saveSelectNft = () =>{
        if(checked.length > 0){
            const data = {
                idsImage: checked,
                addressWallet: address,
                sumPoints 
            }
            props.actions.saveSelectNft(data);
        }
       
    }

    const handleClose = (e:any) => {
        setOpenModal(false);
        props.actions.NftByUser({ user_id: props.user_id });
        props.actions.imageNftByStatus({
            status:'active', 
            filterC:[],filterP:[],
            pageSize: PAGESIZE,
            pageNum: 1
            });
        props.actions.getCollections({status:'active', filter:''});
        setModalConfirm(false);
        setValueFilter([]);
        setSumPoints(0);
        setValuePFilter([]);
        setAddress('');
        setChecked([]);
    }

    const filterCollections = (filter:any, type:any) => {
        let filterC = valueFilter;
        let filterP = valuePFilter;
        if(type=='collection'){
            setValueFilter([...filter]);
            filterC = filter;
        }else{
            setValuePFilter([...filter]);
            filterP = filter;
        }
        
        props.actions.imageNftByStatus({
            status:'active',
            filterC,filterP,
            pageSize: PAGESIZE,
            pageNum: 1});
        
    }

    const loadMore = async () => {
        let filterC = valueFilter;
        let filterP = valuePFilter;
        props.actions.imageNftByStatus({
            status:'active',
            filterC,filterP,
            pageSize: PAGESIZE,
            pageNum: pageImageNFT});
    }


    return (
            
                <div style={{textAlign: 'center'}} className="card">
                    <h2>Escoge tu NFT</h2>
                    <div><a target="_blanck" style={{color:'blue'}} href="https://opensea.io/collection/tropical-advocate"> Colección en Opensea</a></div>
                    
                    <div className={styleThis.boxPoints} style={{justifyContent: 'center', margin: '10px'}} >
                            <p className={styleThis.pWithOutStartEnd}>
                                <Chip 
                                icon={points > 0? <TagFacesIcon />: <SentimentDissatisfiedIcon />} 
                                label={points + ' Puntos'}  />
                                
                            </p>
                            <TooltipPoints />
                    </div>
                    
                    <label >Puntos invertidos:  <b>{sumPoints}P</b></label>

                    <div className={styleThis.labelFiltros}>
                        Filtros:
                    </div>
                    <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        value={valueFilter}
                        onChange={(event, newValue) => {
                            filterCollections(newValue,'collection');
                        }}
                        options={collections}
                        getOptionLabel={(option) => option}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                                <span key={index}>
                            <Chip 
                                label={option}
                                {...getTagProps({ index })}
                            />
                            </span>
                            ))
                        }
                        style={{ margin:'10px' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Colecciones" placeholder="Filtrar por" />
                        )}
                        />

                        <Autocomplete
                        multiple
                        id="fixed-tags-demo"
                        value={valuePFilter}
                        onChange={(event, newValue) => {
                            filterCollections(newValue, 'point');
                        }}
                        options={pointsFilter}
                        getOptionLabel={(option) => option+"P"}
                        renderTags={(tagValue, getTagProps) =>
                            tagValue.map((option, index) => (
                            <span key={index}>
                            <Chip
                                label={option+"P"}
                                {...getTagProps({ index })}
                            />
                            </span>
                            ))
                        }
                        style={{ margin:'10px' }}
                        renderInput={(params) => (
                            <TextField {...params} label="Puntos" placeholder="Filtrar por" />
                        )}
                        />
                    
                    <div className={styleThis.labelFiltros}>
                        Selecciona tus NFTs:
                    </div>

                    <div className={styleThis.boxImageNft}>
                    
                    {
                        collections.map((valC:any,idc)=>(
                            (valueFilter.length == 0 || valueFilter.includes(valC)) ?
                            <div key={idc} className={styleThis.containerNFT}>
                                {imagesNft.filter( (el:any) => el.collections == valC).length >0? <h4>{valC}</h4>:null}
                                <div className={styleThis.containerDivNFT}>
                                {
                                    imagesNft.filter( (el:any) => el.collections == valC).map((val:any,id) =>(
                           
                                        <div key={id} className={styleThis.divImgNft}>
                                        <img className={styleThis.imgNft} key={id} src={val.urlImage} width="149"  />       
                                        <div className={styleThis.namePointNft}>
                                        <FormControlLabel 
                                        control={
                                        <Checkbox 
                                        disabled={!checked.includes(val._id) && (Number(val.point) > (points - sumPoints) ) } 
                                        checked={checked.includes(val._id)} 
                                        onChange={(e) =>handleChange(e,val._id, Number(val.point))}  />} 
                                        label={val.name} />
                                        <div>{val.point +"P"}</div>
                                        </div>
                                       </div> 
                                                         
                                    ))
                                }
                                </div>
                                
                            </div> :null
                        ))
                    }
                    {imagesNft.length >= (PAGESIZE * (pageImageNFT - 1)) && imagesNft.length > 0  && !props.ended ?
                        <>
                            <Divider />
                            <div className={stylesForo.BoxLoad}>

                                <button
                                    className={[stylesForo.btn, stylesForo.moreButton].join(' ')}
                                    onClick={() => loadMore()}
                                >Ver mas NFT</button>
                            </div></>
                        :
                        null
                    }
                    </div>
                    <div className={styleThis.inputNft}>
                        <label>Dirección Wallet</label>
                        <CustomInput 
                            onChange={handleInput}
                            value={address}
                            aria-label="Demo input" 
                            placeholder="ej: 0x1ed3... o destination.eth" />
                    </div>
                    
                    <button 
                    onClick={modalConfirmShow}
                        className={[styles.loginButton, (checked.length ==0)? styles.buttonDisabled:''].join(' ')} >
                           Guardar
                    </button>

                    <Modal
                        open={openModal}
                        onClose={handleClose}
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
                            <Button variant="outlined" onClick={handleClose}>Ok</Button>
                        </Box>
                    </Modal>
                    {props.isLoadingSelectNft  || props.isLoadingImageNft?
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={props.isLoading}
                        >
                            <CircularProgress color="success" />
                        </Backdrop> : null
                    }

                <ModalConfirm
                open={modalConfirm}
                onClose={modalConfirmClose}
                onAction={saveSelectNft}
                title={''}
                content={contentModal} />

                </div>
            
        
    )
}

const mapStateToProps = (state: any) => ({
    isLoadingImageNft: state.user.isLoadingImageNft,
    dataImageNft: state.user.dataImageNft,
    errorImageNft: state.user.errorImageNft,
    isLoadingSelectNft: state.user.isLoadingSelectNft,
    dataSelectNft: state.user.dataSelectNft,
    isLoadingCollections: state.user.isLoadingCollections,
    dataCollections: state.user.dataCollections,
    errorCollections: state.user.errorCollections,
    dataNft: state.user.dataNft,
    pageImageNFT: state.user.pageImageNFT,
    ended: state.user.ended
})

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(userAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectNft);