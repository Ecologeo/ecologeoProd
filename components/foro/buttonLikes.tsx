import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styles from "./style.module.scss";
import {
    FaRegHeart,
    FaHeart,
    FaRegComment,
    FaRegCheckCircle,
    FaRegTimesCircle,
    FaTimesCircle,
    FaCheckCircle,
    FaArrowAltCircleDown,
    FaArrowAltCircleUp,
    FaRegArrowAltCircleDown,
    FaRegArrowAltCircleUp
} from "react-icons/fa";

import Tooltip from "@mui/material/Tooltip";
import Comments from './comments';
import ModalAuth from '../auth/modalAuth';
import { get } from '../../utils/SesionStorage';

function ButtonsLike(props: any) {
    const [points, setPoints] = useState(
        props.item.hasOwnProperty("points") ? props.item.points : []
    );
    const [apprCount, setApprCount] = useState('');
    const [disapprCount, setDisapprCount] = useState('')
    const [modalCommentsVisible, setModalCommentsVisible] = useState(false);
    const [countComments, setCountComments] = useState(
        props.item.commentsList.length > 0 ? props.item.commentsList[0].count : 0
    );
    const [id_user, setId_user] = useState("");
    const [visibleComment, setvisibleComment] = useState(true);
    const [show, setShow] = useState(false);
    const [pathAvatar, setPathAvatar] = useState('')

    useEffect(() => {
        setPoints(props.item.hasOwnProperty("points") ? props.item.points : []);
        setCountComments(
            props.item.commentsList.length > 0 ? props.item.commentsList[0].count : 0
        );
        const idUser = get("@id_user") ?? '';
        setId_user(idUser);
        const path_avatar = get("@path_avatar_user")?? '';
        setPathAvatar(path_avatar);
    }, []);

    useEffect(()=>{
        setPoints(props.item.hasOwnProperty("points") ? props.item.points : []);
        setCountComments(
            props.item.commentsList.length > 0 ? props.item.commentsList[0].count : 0
        );

    },[props.item])


    useEffect(() => {
        const apprc = getPointsApprov('approve');
        setApprCount(apprc.length === 0 ? '' : apprc.length);
        const dapprc = getPointsApprov('disapprove');
        setDisapprCount(dapprc.length === 0 ? '' : dapprc.length);
    }, [points])

    const updatePoints = (idPost: string, like: any) => {
        props.updatePoints(idPost, like);
    };

    const updateComments = (count: number) => {
        setCountComments(countComments + count);
    };

    const setApproved = (type: any) => {
        if(id_user === ''){
            setShow(!show);
        }else{
        let pts = [...points];
        let pip = [];
        const appr = pts.filter((elemt: any) => elemt.user === props.id_user);

        if (appr.length > 0) {
            const indx = pts.findIndex((el: any) => el.user === props.id_user);
            pip.push({ comm: "del", type: appr[0].type });
            pts.splice(indx, indx >= 0 ? 1 : 0);
        }

        if (
            appr.length === 0 ||
            (appr.length > 0 && appr[0].type !== type)
        ) {
            pts.push({
                user: props.id_user,
                type,
            });
            pip.push({ comm: "add", type });
        }

        setPoints(pts);
        props.updatePoints(props.item._id, pip);
        }
    };
    const closeModal = (e: any) => {
        setShow(!show);
      };

    const getPointsApprov = (type: string) => {
        return points.filter((el: any) => el.type == type)
    }

    const getUserPoints = (user: any, type: any) => {
        return points.filter((el: any) => (el.user == user && el.type == type));
    }

    const onVisibleComment = (idPost:any) =>{
        props.updateIdPostComment(idPost);
    }

    

    return (
        <>
            <div className="cardHeader" style={{ margin: "15px 0px 10px 0px" }}>
                <div className={styles.likeComment}>
                    <Tooltip title="Punto positivo" arrow>
                        <div
                            onClick={() => setApproved("approve")}
                            style={{ marginRight: "10px" }}
                            className={styles.divLikes}
                        >
                            {getUserPoints(props.id_user, "approve").length > 0 ?
                                <FaArrowAltCircleUp size={25} color="#3CB371" /> :
                                <FaRegArrowAltCircleUp size={25} color="#3CB371" />
                            }

                            {apprCount !== '' ?
                                <div className={styles.textLikes}>
                                    {apprCount}
                                </div> : null}
                        </div>
                    </Tooltip>
                    <Tooltip title="Punto negativo" arrow>
                        <div
                            onClick={() => setApproved("disapprove")}
                            style={{ marginLeft: "10px" }}
                            className={styles.divLikes}
                        >
                            {getUserPoints(props.id_user, "disapprove").length > 0 ?
                                <FaArrowAltCircleDown size={25} color="#E7542D" /> :
                                <FaRegArrowAltCircleDown size={25} color="#E7542D" />
                            }
                            {disapprCount !== '' ?
                                <div className={styles.textLikes}>
                                    {disapprCount}
                                </div> : null}
                        </div>
                    </Tooltip>
                </div>

                <div className={styles.likeComment}>
                    <Tooltip title="Comentarios" arrow>
                        <div
                            onClick={() => {setvisibleComment(!visibleComment)}}
                            className={styles.divLikes}>
                            <FaRegComment size={25} color="#3CB371" />
                            {countComments != 0 ? <div className={styles.textLikes}>
                                {countComments}
                            </div> : null}
                        </div>
                    </Tooltip>
                </div>

            </div>
            <div className={styles.containerComment}>
                <Comments
                    user={props.item.user}
                    idPost={props.item._id}
                    visible={visibleComment}
                    updateComments={updateComments}
                    pathAvatar={pathAvatar}
                />
            </div>
            <ModalAuth show={show} closeModal={closeModal} />
        </>
    );
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsLike);
