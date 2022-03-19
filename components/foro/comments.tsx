import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styles from '../../pages/home/style.module.scss'
import stylesThis from './style.module.scss';
import stylesBox from '../styles/box.module.scss'
import * as foroActions from '../../actions/foro';
import { bindActionCreators } from 'redux';
import avatar from '../../pages/assets/img/avatar_default.png';
import { AiOutlineSend } from "react-icons/ai";
import SendIcon from '@mui/icons-material/Send';
import Tooltip from "@mui/material/Tooltip";
import Divider from '@mui/material/Divider';
import { calculateTimePost } from '../../utils/index';
import CustomizedMenus from './menuPost';
import MenuComment from './menuComment';
import CircularProgress from '@mui/material/CircularProgress';
import { get } from '../../utils/SesionStorage';
import ModalConfirm from '../utils/modalConfirm';
import axios from 'axios';
import config from '../../config';
import { concatFilter } from '../../utils';
import Backdrop from '@mui/material/Backdrop';
import ModalAuth from '../auth/modalAuth';
import * as linkify from 'linkifyjs';
import CaretPositioning from './EditCaretPositioning'
import BtnLikeComment from './btnLikeComment';
import TagComment from './menuTagComment';
import 'linkify-plugin-mention';
import Image from 'next/image';
var sanitizeHtml = require('sanitize-html');






function Comments(props: any) {

    const [commen, setCommen] = useState<any>('');
    const [activeSend, setActiveSend] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [dataComment, setDataComment] = useState<any>([]);
    const [visible, setVisible] = useState(false);
    const [id_user, setId_user] = useState('');
    const [modalConfirm, setModalConfirm] = React.useState(false);
    const [titleModal, setTitleModal] = useState('');
    const [contentModal, setContentModal] = useState('');
    const [commMenu, setCommMenu] = useState('');
    const [idPostComment, setIdPostComment] = React.useState('');
    const [pageComment, setPageComment] = React.useState(1);
    const [modalConfirmVisibleRep, setModalConfirmVisibleRep] = React.useState(false);
    const [textConfirmRep, setTextConfirmRep] = React.useState('');
    const [show, setShow] = useState(false);
    const [caretPosition, setCaretPosition] = useState({ start: 0, end: 0 })
    const [openTag, setOpenTag] = useState(false);
    const [textSearch, setTextSearch] = useState('');



    const textComm = useRef<any>(null);
    const areaComm = useRef<any>(null);

    useEffect(() => {
        const idUser = get("@id_user") ?? '';
        setId_user(idUser);
    }, [])


    const closeModal = (e: any) => {
        setShow(!show);
    };

    const getComments = async () => {
        const params = {
            idPost: props.idPost,
            idComment: props.idComment != undefined ? props.idComment : '',
            pageSize: 5,
            pageNum: pageComment
        }
        const token = get("@token") ?? '';
        let result = await axios({
            method: 'get',
            url: config.url_api_foro + "/v1/api/comment/getcommentbypost",
            params,
            headers: {
                'Cache-Control': 'no-cache',
                'content-type': 'application/json',
                'authorization': token
            }
        }).then((response) => {
            setPageComment(pageComment + 1);
            return response.data;
        }).catch((error) => {
            //handle error
            //console.log(error);
        });
        const moreComments = result && result.length > 0 ? concatFilter(dataComment.concat(result)) : dataComment

        setDataComment(moreComments);
    }

    const sanitize = (html: any) => {
        return sanitizeHtml(html, {
            allowedTags: ['a', 'span'],
            allowedAttributes: {
                'a': ['href', 'class', 'rel', 'target'],
                'span': ['class']
            }
        });
    }

    useEffect(() => {
        setVisible(props.visible);
        if (props.visible) {
            getComments();
        } else {
            setDataComment([])
            setPageComment(1)
        }
    }, [props.visible]);

    /*useEffect(()=>{
        setDataComment(props.dataCommentsPost);     
    },[props.dataCommentsPost])*/

    useEffect(() => {
        if (props.dataCommentsDel) {
            if (commMenu != '') {
                props.actions.clearDelComment();
                const idComment = commMenu;
                let dataComments = dataComment.filter(function (el: any) { return el._id !== idComment; });
                setDataComment(dataComments);
                setCommMenu('');
                props.updateComments(-1);
            }

        }
    }, [props.dataCommentsDel])



    useEffect(() => {
        if (props.dataComment.hasOwnProperty('data')) {
            //setDataComment((prevDataComment:any) =>[props.dataComment.data,...prevDataComment])
            if (props.dataComment.data.post === props.idPost && props.dataComment.data.comment === props.idComment) {

                setDataComment((prevDataComment: any) => {
                    if (prevDataComment.length > 0) {
                        return [props.dataComment.data, ...prevDataComment]
                    } else {
                        return [props.dataComment.data]
                    }
                }
                )
                props.updateComments(1);
            }

        }
    }, [props.dataComment])

    useEffect(() => {
        if (props.dataRepComment) {
            if (commMenu != '') {
                props.actions.clearRepComment();
                const idComment = commMenu;
                let dataComments = dataComment.filter(function (el: any) { return el._id !== idComment; });
                setDataComment(dataComments);
                setCommMenu('');
                props.updateComments(-1);
            }
        }
    }, [props.dataRepComment])

    useEffect(() => {

        if (commen) {
            CaretPositioning.restoreSelection(document.getElementById("contentComment" + props.idPost + props.idComment),caretPosition);
        }

    }, [commen])



    const saveComment = () => {

        if (id_user === '') {
            setShow(!show);
        } else {
            if (commen.trim() !== '') {
                let text = commen.trim();
                text = text.replace('<span class="linkComment">', '').replace('</span>', '');
                const urls = linkify.find(text);
                for (const url of urls) {
                    text = text.replace(url.value, '<a class="linkComment" rel="nofollow" target="_blanck" href="' + url.href + '">' + url.value + '</a>')
                }

                let data: any = {
                    text,
                    post: props.idPost,
                }
                if (props.idComment != undefined) {
                    data['comment'] = props.idComment;
                }
                setCommen('');
                setActiveSend(false)
                setPageComment(1);
                areaComm.current.style.height = "44px";
                textComm.current.style.height = "44px";
                const tags = linkify.find(text, 'mention');
                if(tags.length > 0){
                    data['tags'] = tags;
                }
                props.actions.setComment(data);
            } else {
                setCommen(commen.trim());
                setActiveSend(false);
                areaComm.current.style.height = "44px";
                textComm.current.style.height = "44px";
            }
        }

    }

    const loadMore = async () => {
        getComments();
    }



    const auto_grow = (e: any) => {
        //e.preventDefault()
        addFocus(e);
        e.currentTarget.style.height = (e.currentTarget.scrollHeight) + "px";
        textComm.current.style.height = (e.currentTarget.scrollHeight) + "px";
        
    }

    const addFocus = (event: any) => {

        let text = event.currentTarget.innerText;
        
        const text2 = event.currentTarget.textContent;
        let savedCaretPosition = CaretPositioning.saveSelection(event.currentTarget);
        /*if(savedCaretPosition.enter === false){
            text = text.replace("\n\n","\n")
        }*/
        text = text.replace('<span class="linkComment">', '').replace('</span>', '');
        const urls = linkify.find(text);
        for (const url of urls) {
            text = text.replace(url.value, '<span class="linkComment">' + url.value + '</span>')
        }


        let iar = text2.indexOf("@") === 0 ? text2.indexOf("@") : text2.indexOf(" @");
        let sp = true;
        let textTag = '';
        let count = 0;
        while (iar != -1 && sp) {
            textTag = text2.slice(iar === 0 || count > 0 ? (iar + 1) : (iar + 2), savedCaretPosition.end);
            if (textTag.length > 0) {
                sp = /\s/g.test(textTag);
            }
            iar = text2.indexOf("@", iar + 1 ); 
            count++;
        }

        if (!sp) {
            setTextSearch(textTag);
            setOpenTag(true);
        } else {
            setOpenTag(false);
        }

        setCaretPosition(savedCaretPosition);
        setActiveSend(text !== '');
        //areaComm.current.innerHTML = sanitize(text)
        setCommen(text);
    }

    const updateCaret = (term: any, account: any) => {
        let caret = caretPosition;
        caret.end = (account.length - term.length) + caret.end;
        caret.start = caret.end;
        CaretPositioning.restoreSelection(document.getElementById("contentComment" + props.idPost + props.idComment), caret);
    }

    const modalConfirmClose = () => {
        setModalConfirm(false);
    }

    const modalConfirmShow = (idComment: any) => {
        setModalConfirm(true);
        setCommMenu(idComment);
        setContentModal('¿Seguro deseas eliminar este comentario?');
    }

    const removeComment = () => {
        const data = {
            idComment: commMenu
        }
        props.actions.deleteComment(data);
        setModalConfirm(false);
    }

    const reportCommentConfirm = (idComment: any) => {
        if (id_user === '') {
            setShow(!show);
        } else {
            setModalConfirmVisibleRep(true);
            setCommMenu(idComment);
            setTextConfirmRep('¿Seguro desea reportar el comentario? Revisaremos si incumple con las reglas de la comunidad, si es así, será eliminado el comentario. Gracias por reportar las inconsistencias.');
        }
    }
    const hideModalConfirmRep = () => {
        setModalConfirmVisibleRep(false);
    }

    const reportComment = () => {
        const data = {
            idComment: commMenu,
            idUser: props.user._id
        }
        props.actions.reportComment(data);
        setModalConfirmVisibleRep(false);
    }

    const updatePointsComment = (idComment: any, pip: any) => {
        const data = {
            idComment,
            pip
        }
        props.actions.updatePointsComment(data);
    }

    const setAccountText = (term: any, account: any) => {
        const text = commen.replace("@" + term, '<a class="linkComment" rel="nofollow" target="_blanck" href="/eco/' + account + '">@' + account + '</a>')
        setCommen(text);
        updateCaret(term, account);
        setOpenTag(false);
    }


    return (
        visible ?
            < div className={props.idComment === undefined ? '' : stylesThis.subComment} >
                {props.idComment === undefined ? <Divider /> : null}
                <div style={{ marginBottom: '15px' }} className="cardHeader">

                    <div className={stylesThis.boxComment}>
                        {props.pathAvatar != '' ?
                            <Image
                                src={props.pathAvatar}
                                alt="Avatar"
                                className="avatar"
                                width="40" height="40" /> :
                            <Image
                                src={avatar}
                                alt="Avatar"
                                className="avatar"
                                width="40" height="40" />}

                        <div ref={textComm} className={stylesThis.boxInputComment}>

                            <div
                                id={'contentComment' + props.idPost + props.idComment}
                                contentEditable="true"
                                ref={areaComm}
                                className={stylesBox.textAreaComment}
                                suppressContentEditableWarning={true}
                                onInput={(e) => auto_grow(e)}
                                dangerouslySetInnerHTML={{ __html: sanitize(commen) }}
                            >
                            </div>

                        </div>

                        <Tooltip title="Añadir comentario" arrow>
                            <button
                                onClick={saveComment}
                                className={[stylesThis.btn, stylesThis.commentButton, activeSend ? '' : stylesThis.buttonDisabled].join(' ')}
                            >
                                <div style={{ display: "flex" }}><SendIcon sx={{ fontSize: 20 }} /></div>
                            </button>
                        </Tooltip>
                    </div>
                </div>
                <div >
                    {props.isLoading ||
                        props.isLoadingCommentsPost ||
                        props.isLoadingCommentsDel ?
                        <div className={stylesThis.BoxLoad}>
                            <CircularProgress color="success" />
                        </div>
                        : null}
                    {
                        dataComment && dataComment.length > 0 ?
                            dataComment.map((val: any, id: any) => (
                                !val.hasOwnProperty('report') || (val.hasOwnProperty('report') && !val.report.includes(id_user)) ?
                                    <div key={id} >
                                        <Divider />
                                        <div style={{ margin: '15px 0px 0px 15px' }} className="cardHeader">
                                            <a href={"/eco/" + val.user.userName}>
                                                <div className="linkAll" >
                                                    {val.user.hasOwnProperty('path_avatar') ?
                                                        <Image
                                                            src={val.user.path_avatar}
                                                            alt="Avatar"
                                                            className="avatar"
                                                            width="40" height="40" /> :
                                                        <Image
                                                            src={avatar}
                                                            alt="Avatar"
                                                            className="avatar"
                                                            width="40" height="40" />}
                                                    <div className="ml10">
                                                        <span className="linkName" >{val.user.name}</span>
                                                        <div style={{ fontSize: 12 }}>
                                                            {
                                                                calculateTimePost(
                                                                    val.year,
                                                                    val.yearCurrent,
                                                                    val.month,
                                                                    val.monthCurrent,
                                                                    val.day,
                                                                    val.dayCurrent,
                                                                    val.hour,
                                                                    val.hourCurrent,
                                                                    val.minutes,
                                                                    val.minutesCurrent)
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className={stylesThis.options}>
                                                <MenuComment
                                                    removeComm={modalConfirmShow}
                                                    reportCommentConfirm={reportCommentConfirm}
                                                    idComm={val._id}
                                                    id_user={id_user}
                                                    userComm={val.user._id} />
                                            </div>

                                        </div>
                                        <div className="cardComment">
                                            <div style={{ width: '40px', height: '20px' }}></div>
                                            <div 
                                            style={{ width: '100%', whiteSpace: 'pre-wrap' }} 
                                            className="ml10" 
                                            dangerouslySetInnerHTML={{ __html: sanitize(val.text) }} ></div>
                                            <div className={stylesThis.options}>
                                            </div>
                                        </div>

                                        <BtnLikeComment
                                            item={val}
                                            idPost={props.idPost}
                                            updatePointsComment={updatePointsComment}
                                            idComment={props.idComment != undefined ? props.idComment : undefined}
                                        />

                                    </div> : null
                            )) : null}
                    {dataComment.length >= (5 * (pageComment - 1)) && dataComment.length > 0 ?
                        <>
                            <Divider />
                            <div className={stylesThis.BoxLoad}>

                                <button
                                    className={[stylesThis.btn, stylesThis.moreButton].join(' ')}
                                    onClick={() => loadMore()}
                                >Ver mas comentarios</button>
                            </div></>
                        :
                        null
                    }
                </div>
                <TagComment
                    anchorRef={areaComm}
                    open={openTag}
                    textSearch={textSearch}
                    setAccountText={setAccountText}
                />
                <ModalConfirm
                    open={modalConfirm}
                    onClose={modalConfirmClose}
                    onAction={removeComment}
                    title={titleModal}
                    content={contentModal} />

                <ModalConfirm
                    open={modalConfirmVisibleRep}
                    onClose={hideModalConfirmRep}
                    onAction={reportComment}
                    title={titleModal}
                    content={textConfirmRep} />

                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={props.isLoadingCommentsDel}
                >
                    <CircularProgress color="success" />
                </Backdrop>
                <ModalAuth show={show} closeModal={closeModal} />
            </div> : null
    );
}

const mapStateToProps = (state: any) => ({

    isLoading: state.foro.isLoadingComments,
    dataComment: state.foro.dataComments,
    error: state.foro.errorComments,
    isLoadingCommentsPost: state.foro.isLoadingCommentsPost,
    dataCommentsPost: state.foro.dataCommentsPost,
    errorCommentsPost: state.foro.errorCommentsPost,
    isLoadingCommentsDel: state.foro.isLoadingCommentsDel,
    dataCommentsDel: state.foro.dataCommentsDel,
    dataRepComment: state.foro.dataRepComment,
    isLoadingRepComment: state.foro.isLoadingRepComment,
    pageComment: state.foro.pageComment
});

const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
