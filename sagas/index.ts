import { takeLatest, all } from "redux-saga/effects";
import * as types from "./../actions";
import { loggin, logout, resetPassword,
   register, registerFacebook, verifyCode,
   recoverPassword } from "./authSagas";

import { createPost, getPosts, 
  getPostsById,getPostsByPerfil, 
  updatePoint,setComments, getCommentByPost, 
  deletePost, setFollow, deleteComments, 
  reportComment, getSearchPosts,countFollows,
  validateFollows, getFollows, updatePost,
  getHeaderCS, updatePointComment, getNotifications,
  updateNotiAll, updateNoti } from './foroSaga';

import {getUserByName, getUser, updateProfile, 
  getUserByUserName, geNftByUser, 
  getImageNftByStatus, saveSelectNft,
  getCollections, getNftByPerfil} from './userSagas';

function* actionWatcherAuth() {
  
  yield takeLatest(types.REGISTER, register);
  yield takeLatest(types.REGISTER_FACEBOOK, registerFacebook);
  yield takeLatest(types.LOGIN, loggin);
  yield takeLatest(types.LOGOUT, logout);
  yield takeLatest(types.RESET_PASSWORD, resetPassword);
  yield takeLatest(types.VERIFY_CODE, verifyCode);
  yield takeLatest(types.RECOVER_PASSWORD, recoverPassword);
  yield takeLatest(types.GET_USER_BY_USERNAME, getUserByUserName);
  
}

function* actionWatcherForo() {
  yield takeLatest(types.FORO_POST_CREATE, createPost);
  yield takeLatest(types.FORO_POST_GET, getPosts);
  yield takeLatest(types.FORO_POST_BY_ID_GET, getPostsById);
  yield takeLatest(types.FORO_POST_GET_PERFIL, getPostsByPerfil);
  yield takeLatest(types.UPDATE_POINT_GET, updatePoint);
  yield takeLatest(types.SET_COMMENT, setComments);
  yield takeLatest(types.GET_COMMENTS_BY_POST, getCommentByPost);
  yield takeLatest(types.FORO_DELETE_POST, deletePost);
  yield takeLatest(types.SET_FOLLOW, setFollow);
  yield takeLatest(types.DELETE_COMMENT_POST, deleteComments);
  yield takeLatest(types.COMMENT_REPORT_POST, reportComment);
  yield takeLatest(types.SEARCH_POST, getSearchPosts);
  yield takeLatest(types.COUNT_FOLLOW, countFollows);
  yield takeLatest(types.VALIDATE_FOLLOW, validateFollows);
  yield takeLatest(types.FORO_GET_FOLLOWS, getFollows);
  yield takeLatest(types.FORO_POST_UPDATE, updatePost); 
  yield takeLatest(types.FORO_GET_CS, getHeaderCS); 
  yield takeLatest(types.UPDATE_POINT_COMMENT_GET, updatePointComment); 
  yield takeLatest(types.NOTIFICATION_GET, getNotifications);
  yield takeLatest(types.UPDATE_STATUS_NOTI_ALL, updateNotiAll);
  yield takeLatest(types.UPDATE_STATUS_NOTI, updateNoti);
  
  
}

function* actionWatcherUser() {
  yield takeLatest(types.GET_USER_BY_NAME, getUserByName);
  yield takeLatest(types.GET_USER_BY_ID, getUser);
  yield takeLatest(types.UPDATE_PROFILE, updateProfile);
  yield takeLatest(types.GET_NFT_BY_USER, geNftByUser);
  yield takeLatest(types.GET_IMAGE_NFT_BY_STATUS, getImageNftByStatus);
  yield takeLatest(types.SAVE_SELECT_NFT, saveSelectNft);
  yield takeLatest(types.GET_COLLECTIONS, getCollections);
  yield takeLatest(types.GET_NFT_BY_PERFIL, getNftByPerfil);
  
  
  
  
  
}

export default function* rootSaga() {
  yield all([
    actionWatcherAuth(), 
    actionWatcherForo(),
    actionWatcherUser()
  ]);
}
