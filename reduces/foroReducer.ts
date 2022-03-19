import * as type from '../actions/index';

const WikiReducer = (state = {
    isLoading: false,
    dataImage: { data: '', uri: '', fileName: '', type: '' },
    idYoutube: '',
    isLoadingPost: false,
    isLoadingCommentsPost: false,
    isLoadingComments: false,
    dataCommentsPost: [],
    dataComments: [],
    isLoadingCommentsDel: false,
    typeFollow: '0',
    isLoadingDelFollows: false,
    isLoadingDelPost: false,
    isLoadingRepPost: false,
    isLoadingRepComment: false,
    pageComment: 1,
    dataPosts: [],
    dataPostsPerfil: [],
    pageForo: 1,
    pagePerfil: 1,
    fileForo: { data: '', uri: '', fileName: '', type: '' }
}, action: any) => {
    switch (action.type) {
        case type.FORO_POST_CREATE:
            return { ...state, isLoading: true };
        case type.FORO_POST_CREATE_RECEIVED:
            return { ...state, dataForo: action.data, isLoading: false };
        case type.FORO_POST_CREATE_FAILED:
            return { ...state, error: action.error, isLoading: false, };
        case type.SET_IMAGE_FORO:
            return { ...state, dataImage: action.params }
        case type.CLEAR_POST:
            return {
                ...state,
                isLoading: false,
                idYoutube: '',
                dataImage: { data: '', uri: '', fileName: '', type: '' }
            }

        case type.FORO_POST_GET:
            return {
                ...state, isLoadingPost: true,
                dataPosts: action.params.pageNum === 1 ? [] : state.dataPosts,
                pageForo: action.params.pageNum,
            };
        case type.FORO_POST_GET_RECEIVED:

            if (action.data.length === 0 && state.dataPosts.length > 0) {
                return {
                    ...state,
                    ended: true,
                }
            }
            const morePost = action.data.length > 0 ? state.dataPosts.concat(action.data) : state.dataPosts


            return {
                ...state,
                dataPosts: morePost,
                isLoadingPost: false,
                pageForo: state.pageForo + 1,
            };
        case type.FORO_POST_GET_FAILED:
            return { ...state, errorPost: action.error, isLoadingPost: false, };

        case type.UPDATE_POINT_GET:
            return { ...state, isLoadingPoint: true };
        case type.UPDATE_POINT_GET_RECEIVED:
            return { ...state, dataPoint: action.data, isLoadingPoint: false };
        case type.UPDATE_POINT_GET_FAILED:
            return { ...state, errorPoint: action.error, isLoadingPoint: false, };

        case type.SET_COMMENT:
            return { ...state, isLoadingComments: true };
        case type.SET_COMMENT_RECEIVED:
            return { ...state, dataComments: action.data, dataCommentsPost: action.data.data, isLoadingComments: false };
        case type.SET_COMMENT_FAILED:
            return { ...state, errorComments: action.error, isLoadingComments: false, };

        case type.GET_COMMENTS_BY_POST:
            return {
                ...state, isLoadingCommentsPost: true,
                dataCommentsPost: action.params.pageNum === 1 ? [] : state.dataCommentsPost,
                pageComment: action.params.pageNum,
            };
        case type.GET_COMMENTS_BY_POST_RECEIVED:
            if (action.data.length === 0 && state.dataCommentsPost.length > 0) {
                return {
                    ...state,
                    ended: true,
                }
            }
            const moreComments = action.data.length > 0 ? concatFilter(state.dataCommentsPost.concat(action.data)) : state.dataCommentsPost

            return {
                ...state,
                dataCommentsPost: moreComments,
                isLoadingCommentsPost: false,
                pageComment: (state.pageComment + 1)
            };
        case type.GET_COMMENTS_BY_POST_FAILED:
            return { ...state, errorCommentsPost: action.error, isLoadingCommentsPost: false, };

        case type.DELETE_COMMENT_POST:
            return { ...state, isLoadingCommentsDel: true };
        case type.DELETE_COMMENT_POST_RECEIVED:
            return { ...state, dataCommentsDel: action.data, isLoadingCommentsDel: false };
        case type.DELETE_COMMENT_POST_FAILED:
            return { ...state, errorCommentsDel: action.error, isLoadingCommentsDel: false, };

        case type.CLEAR_DEL_COMMENT:
            return {
                ...state,
                isLoadingCommentsDel: false,
                dataCommentsDel: '',
                errorCommentsDel: ''
            }
        case type.SET_FOLLOW:
            return { ...state, isLoadingFollow: true };
        case type.SET_FOLLOW_RECEIVED:
            return { ...state, dataFollow: action.data, isLoadingFollow: false };
        case type.SET_FOLLOW_FAILED:
            return { ...state, errorFollow: action.error, isLoadingFollow: false, };

        case type.FORO_POST_BY_ID_GET:
            return { ...state, isLoadingPostById: true };
        case type.FORO_POST_BY_ID_GET_RECEIVED:
            return { ...state, dataPostByID: action.data, isLoadingPostById: false };
        case type.FORO_POST_BY_ID_GET_FAILED:
            return { ...state, errorPostById: action.error, isLoadingPostById: false, };

        case type.FORO_GET_FOLLOWS:
            return { ...state, isLoadingFollows: true };
        case type.FORO_GET_FOLLOWS_RECEIVED:
            return { ...state, dataFollows: action.data, isLoadingFollows: false };
        case type.FORO_GET_FOLLOWS_FAILED:
            return { ...state, errorFollows: action.error, isLoadingFollows: false, };

        case type.SET_TYPE_FOLLOW:
            return { ...state, typeFollow: action.params.type }

        case type.DELETE_FOLLOW:
            return { ...state, isLoadingDelFollows: true };
        case type.DELETE_FOLLOW_RECEIVED:
            return { ...state, dataDelFollows: action.data, isLoadingDelFollows: false };
        case type.DELETE_FOLLOW_FAILED:
            return { ...state, errorDelFollows: action.error, isLoadingDelFollows: false, };

        case type.CLEAR_DEL_FOLLOW:
            return {
                ...state,
                isLoadingDelFollows: false,
                dataDelFollows: '',
                errorDelFollows: ''
            }

        case type.COUNT_FOLLOW:
            return { ...state, isLoadingCountFollows: true };
        case type.COUNT_FOLLOW_RECEIVED:
            return { ...state, dataCountFollows: action.data, isLoadingCountFollows: false };
        case type.COUNT_FOLLOW_PERFIL_RECEIVED:
            return { ...state, dataCountFollowsPerfil: action.data, isLoadingCountFollows: false };
        case type.COUNT_FOLLOW_FAILED:
            return { ...state, errorCountFollows: action.error, isLoadingCountFollows: false, };

        case type.SET_COUNT_FOLLOW:
            return {
                ...state,
                dataCountFollows: action.params.data,
            }

        case type.FORO_POST_GET_PERFIL:
            return {
                ...state, isLoadingPostPerfil: true,
                dataPostsPerfil: action.params.pageNum === 1 ? [] : state.dataPostsPerfil,
                pagePerfil: action.params.pageNum,
            };
        case type.FORO_POST_GET_PERFIL_RECEIVED:

            if (action.data.length === 0 && state.dataPostsPerfil.length > 0) {
                return {
                    ...state,
                    ended: true,
                }
            }
            const morePostPerfil = action.data.length > 0 ? state.dataPostsPerfil.concat(action.data) : state.dataPostsPerfil

            return {
                ...state,
                dataPostsPerfil: morePostPerfil,
                isLoadingPostPerfil: false,
                pagePerfil: state.pagePerfil + 1,
            };
        case type.FORO_POST_GET_PERFIL_FAILED:
            return { ...state, errorPostPerfil: action.error, isLoadingPostPerfil: false, };

        case type.FORO_DELETE_POST:
            return { ...state, isLoadingDelPost: true };
        case type.FORO_DELETE_POST_RECEIVED:
            return { ...state, dataDelPost: action.data, isLoadingDelPost: false };
        case type.FORO_DELETE_POST_FAILED:
            return { ...state, errorDelPost: action.error, isLoadingDelPost: false, };

        case type.CLEAR_DEL_POST:
            return {
                ...state,
                isLoadingDelPost: false,
                dataDelPost: '',
                errorDelPost: ''
            }

        case type.FORO_REPORT_POST:
            return { ...state, isLoadingRepPost: true };
        case type.FORO_REPORT_POST_RECEIVED:
            return { ...state, dataRepPost: action.data, isLoadingRepPost: false };
        case type.FORO_REPORT_POST_FAILED:
            return { ...state, errorRepPost: action.error, isLoadingRepPost: false, };

        case type.CLEAR_REPORT_POST:
            return {
                ...state,
                isLoadingRepPost: false,
                dataRepPost: '',
                errorRepPost: ''
            }

        case type.COMMENT_REPORT_POST:
            return { ...state, isLoadingRepComment: true };
        case type.COMMENT_REPORT_POST_RECEIVED:
            return { ...state, dataRepComment: action.data, isLoadingRepComment: false };
        case type.COMMENT_REPORT_POST_FAILED:
            return { ...state, errorRepComment: action.error, isLoadingRepComment: false, };

        case type.SEARCH_POST:
            return { ...state, isLoadingSearchPost: true };
        case type.SEARCH_POST_RECEIVED:
            return { ...state, dataSearchPost: action.data, isLoadingSearchPost: false };
        case type.SEARCH_POST_FAILED:
            return { ...state, errorSearchPost: action.error, isLoadingSearchPost: false, };

        case type.CLEAR_REPORT_COMMENT:
            return {
                ...state,
                isLoadingRepComment: false,
                dataRepComment: '',
                errorRepComment: ''
            }

        case type.VALIDATE_FOLLOW:
            return { ...state, isLoadingVFollow: true };
        case type.VALIDATE_FOLLOW_RECEIVED:
            return { ...state, dataVFollow: action.data, isLoadingVFollow: false, errorVFollow: false };
        case type.VALIDATE_FOLLOW_FAILED:
            return { ...state, errorVFollow: action.error, isLoadingVFollow: false, };

        case type.FORO_POST_UPDATE:
            return { ...state, isLoading: true };
        case type.FORO_POST_UPDATE_RECEIVED:
            return { ...state, dataForo: action.data, isLoading: false };
        case type.FORO_POST_UPDATE_FAILED:
            return { ...state, error: action.error, isLoading: false, };   
        
        case type.FORO_GET_CS:
            return { ...state, isLoadingCS: true };
        case type.FORO_GET_CS_RECEIVED:
            return { ...state, dataCS: action.data, isLoadingCS: false };
        case type.FORO_GET_CS_FAILED:
            return { ...state, errorCS: action.error, isLoadingCS: false, }; 
        
        case type.UPDATE_POINT_COMMENT_GET:
            return { ...state, isLoadingPC: true };
        case type.UPDATE_POINT_COMMENT_GET_RECEIVED:
            return { ...state, dataPC: action.data, isLoadingPC: false };
        case type.UPDATE_POINT_COMMENT_GET_FAILED:
            return { ...state, errorPC: action.error, isLoadingPC: false, }; 
        
        case type.NOTIFICATION_GET:
            return { ...state, isLoadingNoti: true };
        case type.NOTIFICATION_GET_RECEIVED:
            return { ...state, dataNoti: action.data, isLoadingNoti: false };
        case type.NOTIFICATION_GET_FAILED:
            return { ...state, errorNoti: action.error, isLoadingNoti: false, };

        case type.UPDATE_STATUS_NOTI_ALL:
            return { ...state, isLoadingNotiAll: true };
        case type.UPDATE_STATUS_NOTI_ALL_RECEIVED:
            return { ...state, dataNotiAll: action.data, isLoadingNotiAll: false };
        case type.UPDATE_STATUS_NOTI_ALL_FAILED:
            return { ...state, errorNotiAll: action.error, isLoadingNotiAll: false, };

        case type.UPDATE_STATUS_NOTI:
            return { ...state, isLoadingNotiUp: true };
        case type.UPDATE_STATUS_NOTI_RECEIVED:
            return { ...state, dataNotiUp: action.data, isLoadingNotiUp: false };
        case type.UPDATE_STATUS_NOTI_FAILED:
            return { ...state, errorNotiUp: action.error, isLoadingNotiUp: false, };

        default:
            return state;
    }
}

function concatFilter(array3: any) {
    var a = array3.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i]._id === a[j]._id)
                a.splice(j--, 1);
        }
    }

    return a;
}

export default WikiReducer;