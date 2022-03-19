import * as types from './index'

export const createPost = (params:any) => ({
  type: types.FORO_POST_CREATE,
  params,
})
export const setImage = (params:any) => ({
  type: types.SET_IMAGE_FORO,
  params,
})

export const clearPost = () => ({
  type: types.CLEAR_POST
})

export const getPosts = (params:any) => ({
  type: types.FORO_POST_GET,
  params
})

export const updatePoint = (params:any) => ({
  type: types.UPDATE_POINT_GET,
  params
})

export const setComment = (params:any) => ({
  type: types.SET_COMMENT,
  params
})

export const getCommentByPost = (params:any) => ({
  type: types.GET_COMMENTS_BY_POST,
  params
})

export const deleteComment = (params:any) => ({
  type: types.DELETE_COMMENT_POST,
  params
})

export const clearDelComment = () => ({
  type: types.CLEAR_DEL_COMMENT
})

export const setFollow = (params:any) => ({
  type: types.SET_FOLLOW,
  params
})

export const getPostsById = (params:any) => ({
  type: types.FORO_POST_BY_ID_GET,
  params
})

export const getFollows = (params:any) => ({
  type: types.FORO_GET_FOLLOWS,
  params
})

export const setTypeFollow = (params:any) => ({
  type: types.SET_TYPE_FOLLOW,
  params
})

export const deleteFollow = (params:any) => ({
  type: types.DELETE_FOLLOW,
  params
})

export const clearDelFollow = ()=>({
  type: types.CLEAR_DEL_FOLLOW
})

export const countFollows = (params:any) => ({
  type: types.COUNT_FOLLOW,
  params
})

export const setCountFollows = (params:any)=>({
  type: types.SET_COUNT_FOLLOW,
  params
})

export const getPostByPerfil = (params:any)=>({
  type: types.FORO_POST_GET_PERFIL,
  params
})

export const deletePost = (params:any)=>({
  type: types.FORO_DELETE_POST,
  params
})

export const clearDelPost = () => ({
  type: types.CLEAR_DEL_POST
})

export const reportPost = (params:any)=>({
  type: types.FORO_REPORT_POST,
  params
})

export const clearRepPost = () => ({
  type: types.CLEAR_REPORT_POST
})

export const reportComment = (params:any)=>({
  type: types.COMMENT_REPORT_POST,
  params
})

export const clearRepComment = () => ({
  type: types.CLEAR_REPORT_COMMENT
})

export const getSearchPost = (params:any) => ({
  type: types.SEARCH_POST,
  params
})
export const validateFollow = (params:any) =>{
  return ({
      type: types.VALIDATE_FOLLOW,
      params,
  })
}

export const updatePost = (params:any) => ({
  type: types.FORO_POST_UPDATE,
  params,
})

export const getCS = (params:any) => ({
  type: types.FORO_GET_CS,
  params,
})

export const updatePointsComment = (params:any) => ({
  type: types.UPDATE_POINT_COMMENT_GET,
  params,
})

export const getNotifications = (params:any) => ({
  type: types.NOTIFICATION_GET,
  params,
})

export const updateStatusNotiAll = (params:any) => ({
  type: types.UPDATE_STATUS_NOTI_ALL,
  params,
})

export const updateStatusNoti = (params:any) => ({
  type: types.UPDATE_STATUS_NOTI,
  params,
})






