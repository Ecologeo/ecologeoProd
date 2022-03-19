import { call, put } from 'redux-saga/effects';
import * as types from '../actions/index';
import config from '../config';
//import AsyncStorage from '@react-native-community/async-storage';
import API from '../services';
import { get } from '../utils/SesionStorage';
import { FetchBlobProvider } from '../providers';
import { deleteImage } from './utilSaga';


export function* createPost(action: any): Generator {
  try {
    let { params } = action;
    let dataFile:any = null;
    if (params.post.dataImage) {
      const file = params.post.dataImage;
      
      dataFile = yield FetchBlobProvider.UploadFile(
        {
          file,
          location: FetchBlobProvider.LocationEnum.post,
          endpoint: FetchBlobProvider.endpointEnum[params.post.typeFile],
          timeVideo: params.post.timeVideo,
          typeFile: params.post.typeFile
        });
        console.log("dataFile: ", dataFile)
      params.post.urlImage = dataFile.url;
    }
    if (params.post.dataImage && !dataFile.hasOwnProperty('url')) {
      yield put({ type: types.FORO_POST_CREATE_FAILED, error: 'Error subiendo el archivo, por favor comunicate con soporte!' });
    } else {
      
      delete params['post']['dataImage'];
      const token =  yield get("@token");
      const id_user =  yield get("@id_user");
      const headers = {
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'authorization': token
      }

      const api:any = API.create(headers, config.url_api_foro);

      params['post']['user'] = id_user;

      let foro:any = yield call(
        api.foros.createPost,
        params
      );


      if (foro.status !== 201) {
        yield put({ type: types.FORO_POST_CREATE_FAILED, error: foro.data });
      } else {
        yield put({ type: types.FORO_POST_CREATE_RECEIVED, data: foro.data });
      }
    }


  } catch (error) {
    yield put({ type: types.FORO_POST_CREATE_FAILED, error: error });
  }
}

export function* getPosts(action:any): Generator {
  try {
    const { params } = action;


    const token = yield get("@token")?? ''; // yield AsyncStorage.getItem("@token");
    const id_user = yield get("@id_user")?? '';
    const headers = {
      'authorization': token
    }
    //delete params['dataCS'];
    params['id_user'] = id_user;

    const api:any = API.create(headers);

    
    let foro:any = yield call(
      token === ''?api.foros.getPostsPublic: api.foros.getPosts,
      params
    );


    if (foro.status !== 200) {
      yield put({ type: types.FORO_POST_GET_FAILED, error: foro.data });
    } else {
      if(foro.data.length > 0){
        yield put({ type: types.FORO_POST_GET_RECEIVED, data: foro.data });
      }else{
        yield put({ type: types.FORO_POST_GET_FAILED, 
                    error: {
                      status: 204,
                      message: 'No se encontraron resultados con los filtros escogidos, por favor selecciona otros para visualizar recomendaciones.'
                    } });
      }
      
      
    }

  } catch (error:any) {
    yield put({ type: types.FORO_POST_GET_FAILED, error: error });
    if (error.response) {
      if (error.response.status > 499) {
        yield put({
          type: types.FORO_POST_GET_FAILED,
          error: {
            status: error.response.status,
            message:
              'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
          },
        })
      } else {
        yield put({
          type: types.FORO_POST_GET_FAILED,
          error: error.response.data,
        })
      }
    } else if (error.request) {
      yield put({
        type: types.FORO_POST_GET_FAILED,
        error: {
          message:
            'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.',
        },
      })
    } else {
      yield put({
        type: types.FORO_POST_GET_FAILED,
        error: {
          message:
            'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
        },
      })
    }
  }
}

export function* getPostsById(action:any): Generator {
  try {
    const { params } = action;

    const token = yield get("@token")??'';
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    let foro:any = yield call(
      api.foros.getPostsById,
      params
    );


    if (foro.status !== 200) {
      yield put({ type: types.FORO_POST_BY_ID_GET_FAILED, error: foro.data });
    } else {
      yield put({ type: types.FORO_POST_BY_ID_GET_RECEIVED, data: foro.data });
    }
  } catch (error) {
    yield put({ type: types.FORO_POST_BY_ID_GET_FAILED, error: error });
  }
}

export function* getPostsByPerfil(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token")??'';
    const id_user =  yield get("@id_user")??'000000000000000000000000';

    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api:any = API.create(headers, config.url_api_foro);
    params['idUserIm'] = id_user;
    let foro:any = yield call(
      api.foros.getPostByPerfil,
      params
    );


    if (foro.status !== 200) {
      yield put({ type: types.FORO_POST_GET_PERFIL_FAILED, error: foro.data });
    } else {
      yield put({ type: types.FORO_POST_GET_PERFIL_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.FORO_POST_GET_PERFIL_FAILED, error: error });
  }
}



export function* updatePoint(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token");
    const id_user =  yield get("@id_user");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    
    params['idUser'] = id_user;
    let foro:any = yield call(
        api.foros.insertPoints,
        params
    );
    



    if (foro.status !== 200) {
      yield put({ type: types.UPDATE_POINT_GET_FAILED, error: foro.data });
    } else {
      yield put({ type: types.UPDATE_POINT_GET_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.UPDATE_POINT_GET_FAILED, error: error });
  }
}

export function* setComments(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token");
    const id_user =  yield get("@id_user");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    params['user'] = id_user;
    let comment:any = yield call(
      api.foros.setComments,
      params
    );

    if (comment.status !== 201) {
      yield put({ type: types.SET_COMMENT_FAILED, error: comment.data });
    } else {
      yield put({ type: types.SET_COMMENT_RECEIVED, data: comment.data });
    }

  } catch (error) {
    yield put({ type: types.SET_COMMENT_FAILED, error: error });
  }
}

export function* getCommentByPost(action:any): Generator {
  try {
    const { params } = action;


    const token = yield get("@token");

    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    let comments:any = yield call(
      api.foros.getCommentByPost,
      params
    );

    if (comments.status !== 200) {
      yield put({ type: types.GET_COMMENTS_BY_POST_FAILED, error: comments.data });
    } else {
      yield put({ type: types.GET_COMMENTS_BY_POST_RECEIVED, data: comments.data });
    }

  } catch (error) {
    yield put({ type: types.GET_COMMENTS_BY_POST_FAILED, error: error });
  }
}


export function* deletePost(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }

    if (params.urlImage !== '') {
      yield deleteImage(headers, params.urlImage, "post/");
    }
    delete params['urlImage'];


    const api = API.create(headers, config.url_api_foro);

    let foro:any = yield call(
      api.foros.deletePost,
      params
    );

    if (foro.status !== 200) {
      yield put({ type: types.FORO_DELETE_POST_FAILED, error: foro.data });
    } else {
      yield put({ type: types.FORO_DELETE_POST_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.FORO_DELETE_POST_FAILED, error: error });
  }
}

export function* setFollow(action:any): Generator {
  try {
    const { params } = action;

    const token = yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    let comment:any = yield call(
      api.foros.setFollow,
      params
    );

    if (comment.status !== 201) {
      yield put({ type: types.SET_FOLLOW_FAILED, error: comment.data });
    } else {
      yield put({ type: types.SET_FOLLOW_RECEIVED, data: comment.data });
    }

  } catch (error) {
    yield put({ type: types.SET_FOLLOW_FAILED, error: error });
  }
}

export function* deleteComments(action:any): Generator {
  try {
    const { params } = action;

    const token = yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    let comment:any = yield call(
      api.foros.deleteComments,
      params
    );

    if (comment.status !== 200) {
      yield put({ type: types.DELETE_COMMENT_POST_FAILED, error: comment.data });
    } else {
      yield put({ type: types.DELETE_COMMENT_POST_RECEIVED, data: comment.data });
    }

  } catch (error) {
    yield put({ type: types.DELETE_COMMENT_POST_FAILED, error: error });
  }
}

export function* reportComment(action:any): Generator {
  try {
    const { params } = action;

    const token = yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    let foro:any = yield call(
      api.foros.reportComment,
      params
    );

    if (foro.status !== 201) {
      yield put({ type: types.COMMENT_REPORT_POST_FAILED, error: foro.data });
    } else {
      yield put({ type: types.COMMENT_REPORT_POST_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.COMMENT_REPORT_POST_FAILED, error: error });
  }
}

export function* getSearchPosts(action:any): Generator {
  try {
    const { params } = action;


    const token = yield get("@token")?? ''; // yield AsyncStorage.getItem("@token");
    //const id_user = "dfsdf"; // yield AsyncStorage.getItem("@id_user");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api:any = API.create(headers, config.url_api_foro);

    
    let foro:any = yield call(
      api.foros.getSearchPost,
      params
    );


    if (foro.status !== 200) {
      yield put({ type: types.SEARCH_POST_FAILED, error: foro.data });
    } else {
      yield put({ type: types.SEARCH_POST_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.SEARCH_POST_FAILED, error: error });
  }
}

export function* countFollows(action:any): Generator {
  try {
    const { params } = action;
    const token =  yield get("@token");
    const id_user =  yield get("@id_user");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    params['im'] = (id_user === params.idUser).toString();
    let foro:any = yield call(
      api.foros.countFollows,
      params
    );

    if (foro.status !== 200) {
      yield put({ type: types.COUNT_FOLLOW_FAILED, error: foro.data });
    } else {
      if (params.type === 'menu') {
        yield put({ type: types.COUNT_FOLLOW_RECEIVED, data: foro.data });
      } else {
        yield put({ type: types.COUNT_FOLLOW_PERFIL_RECEIVED, data: foro.data });
      }

    }

  } catch (error) {
    yield put({ type: types.COUNT_FOLLOW_FAILED, error: error });
  }
}

export function* validateFollows(action:any): Generator {
  try {
    const { params } = action;
    const token =  yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    let foro:any = yield call(
      api.foros.validateFollows,
      params
    );

    if (foro.status !== 200) {
      yield put({ type: types.VALIDATE_FOLLOW_FAILED, error: foro.data });
    } else {
        yield put({ type: types.VALIDATE_FOLLOW_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.VALIDATE_FOLLOW_FAILED, error: error });
  }
}

export function* getFollows(action:any): Generator {
  try {
    const { params } = action;
    const token = yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    let foro:any = yield call(
      api.foros.getFollows,
      params
    );

    if (foro.status !== 200) {
      yield put({ type: types.FORO_GET_FOLLOWS_FAILED, error: foro.data });
    } else {
      yield put({ type: types.FORO_GET_FOLLOWS_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.FORO_GET_FOLLOWS_FAILED, error: error });
  }
}

export function* updatePost(action: any): Generator {
  try {
    let { params } = action;
    let dataFile:any = null;
    const token =  yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    if (params.post.dataImage) {

      yield deleteImage(headers, params.imgServer, "post/");
      delete params['imgServer'];

      const file = params.post.dataImage;
      
      dataFile = yield FetchBlobProvider.UploadFile(
        {
          file,
          location: FetchBlobProvider.LocationEnum.post,
          endpoint: FetchBlobProvider.endpointEnum[params.post.typeFile],
          timeVideo: params.post.timeVideo,
          typeFile: params.post.typeFile
        });
      params.post.urlImage = dataFile.url;
    }
    if (params.post.dataImage && !dataFile.hasOwnProperty('url')) {
      yield put({ type: types.FORO_POST_CREATE_FAILED, error: 'Error subiendo el archivo, por favor comunicate con soporte!' });
    } else {
      
      delete params['post']['dataImage'];
      const id_user =  yield get("@id_user");


      const api:any = API.create(headers, config.url_api_foro);

      params['post']['user'] = id_user;

      let foro:any = yield call(
        api.foros.updatePost,
        params
      );


      if (foro.status !== 200) {
        yield put({ type: types.FORO_POST_UPDATE_FAILED, error: foro.data });
      } else {
        yield put({ type: types.FORO_POST_UPDATE_RECEIVED, data: foro.data });
      }
    }


  } catch (error) {
    yield put({ type: types.FORO_POST_UPDATE_FAILED, error: error });
  }
}

export function* getHeaderCS(action:any): Generator {
  try {
    const { params } = action;

    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
    }
    const api = API.create(headers, config.url_api_foro);
    let foro:any = yield call(
      api.foros.getHeaderCS,
      params
    );


    if (foro.status !== 200) {
      yield put({ type: types.FORO_GET_CS_FAILED, error: foro.data });
    } else {
      yield put({ type: types.FORO_GET_CS_RECEIVED, data: foro.data });
    }
  } catch (error) {
    yield put({ type: types.FORO_GET_CS_FAILED, error: error });
  }
}

export function* updatePointComment(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token");
    const id_user =  yield get("@id_user");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    
    params['idUser'] = id_user;
    let foro:any = yield call(
        api.foros.insertPointsComment,
        params
    );
    



    if (foro.status !== 200) {
      yield put({ type: types.UPDATE_POINT_COMMENT_GET_FAILED, error: foro.data });
    } else {
      yield put({ type: types.UPDATE_POINT_COMMENT_GET_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.UPDATE_POINT_COMMENT_GET_FAILED, error: error });
  }
}

export function* getNotifications(action:any): Generator {
  try {
    const { params } = action;

    const token = yield get("@token")??'';
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    let foro:any = yield call(
      api.foros.getNotifications,
      params
    );


    if (foro.status !== 200) {
      yield put({ type: types.NOTIFICATION_GET_FAILED, error: foro.data });
    } else {
      yield put({ type: types.NOTIFICATION_GET_RECEIVED, data: foro.data });
    }
  } catch (error) {
    yield put({ type: types.NOTIFICATION_GET_FAILED, error: error });
  }
}

export function* updateNotiAll(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token");
    const id_user =  yield get("@id_user");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    
    params['idUser'] = id_user;
    let foro:any = yield call(
        api.foros.updateNotiAll,
        params
    );
    



    if (foro.status !== 200) {
      yield put({ type: types.UPDATE_STATUS_NOTI_ALL_FAILED, error: foro.data });
    } else {
      yield put({ type: types.UPDATE_STATUS_NOTI_ALL_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.UPDATE_STATUS_NOTI_ALL_FAILED, error: error });
  }
}

export function* updateNoti(action:any): Generator {
  try {
    const { params } = action;

    const token =  yield get("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);
    
    let foro:any = yield call(
        api.foros.updateNoti,
        params
    );
    



    if (foro.status !== 200) {
      yield put({ type: types.UPDATE_STATUS_NOTI_FAILED, error: foro.data });
    } else {
      yield put({ type: types.UPDATE_STATUS_NOTI_RECEIVED, data: foro.data });
    }

  } catch (error) {
    yield put({ type: types.UPDATE_STATUS_NOTI_FAILED, error: error });
  }
}


/*














export function* deleteFollow(action) {
  try {
    const { params } = action;

    const token = yield AsyncStorage.getItem("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    console.log("follow-params: ", params);
    let follow = yield call(
      api.foros.deleteFollow,
      params
    );

    console.log("foro-result-sagas-follow-del: ", follow.data, ' foro.status: ', follow.status);

    if (follow.status !== 200) {
      yield put({ type: types.DELETE_FOLLOW_FAILED, error: follow.data });
    } else {
      yield put({ type: types.DELETE_FOLLOW_RECEIVED, data: follow.data });
    }

  } catch (error) {
    console.log("error-follow: ", error);
    yield put({ type: types.DELETE_FOLLOW_FAILED, error: error });
  }
}



export function* reportPost(action) {
  try {
    const { params } = action;

    const token = yield AsyncStorage.getItem("@token");
    const headers = {
      'Cache-Control': 'no-cache',
      'content-type': 'application/json',
      'authorization': token
    }
    const api = API.create(headers, config.url_api_foro);

    console.log("foro-params: ", params);
    let foro = yield call(
      api.foros.reportPost,
      params
    );

    console.log("foro-result-sagas-foros-report: ", foro.data, ' foro.status: ', foro.status);

    if (foro.status !== 201) {
      yield put({ type: types.FORO_REPORT_POST_FAILED, error: foro.data });
    } else {
      yield put({ type: types.FORO_REPORT_POST_RECEIVED, data: foro.data });
    }

  } catch (error) {
    console.log("error-foro: ", error);
    yield put({ type: types.FORO_REPORT_POST_FAILED, error: error });
  }
}


*/