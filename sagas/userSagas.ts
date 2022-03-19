import { call, put } from 'redux-saga/effects';
import * as types from '../actions/index';
import config from '../config';
//import AsyncStorage from '@react-native-community/async-storage';
import API from '../services';
import { FetchBlobProvider } from '../providers';
import { get } from '../utils/SesionStorage';
import {getFileName} from './utilSaga';

export function* getUserByName(action:any): Generator {
    try {
      const { params } = action
      const token =yield get("@token");
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      }
      const api = API.create(headers, config.url_api_user)
  
      let data:any = yield call(api.users.getUserByName, params)
      if (data.data.hasOwnProperty('status')) {
        yield put({ type: types.GET_USER_BY_NAME_FAILED, error: data.data })
      } else {
        yield put({ type: types.GET_USER_BY_NAME_RECEIVED, data: data.data })
      }
    } catch (error:any) {
      if (error.response) {
        if (error.response.status > 499) {
          yield put({
            type: types.GET_USER_BY_NAME_FAILED,
            error: {
              message:
                'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
            },
          })
        } else {
          yield put({
            type: types.GET_USER_BY_NAME_FAILED,
            error: error.response.data,
          })
        }
      } else if (error.request) {
        yield put({
          type: types.GET_USER_BY_NAME_FAILED,
          error: {
            message:
              'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.',
          },
        })
      } else {
        yield put({
          type: types.GET_USER_BY_NAME_FAILED,
          error: {
            message:
              'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
          },
        })
      }
    }
  }

  export function* getUser(action:any): Generator {
    try {
      const token = yield get("@token");
      const { params } = action
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      }
      const api = API.create(headers, config.url_api_user)
  
      let data:any = yield call(api.users.getUser, params)
      if (data.data.hasOwnProperty('status') || data.data == '') {
        yield put({ type: types.GET_USER_BY_ID_FAILED, error: data.data === ''?'error':data.data })
      } else {
        yield put({ type: types.GET_USER_BY_ID_RECEIVED, data: data.data })
      }
    } catch (error:any) {
      if (error.response) {
        if (error.response.status > 499) {
          yield put({
            type: types.GET_USER_BY_ID_FAILED,
            error: {
              message:
                'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
            },
          })
        } else {
          yield put({
            type: types.GET_USER_BY_ID_FAILED,
            error: error.response.data,
          })
        }
      } else if (error.request) {
        yield put({
          type: types.GET_USER_BY_ID_FAILED,
          error: {
            message:
              'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.',
          },
        })
      } else {
        yield put({
          type: types.GET_USER_BY_ID_FAILED,
          error: {
            message:
              'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
          },
        })
      }
    }
  }

  export function* updateProfile(action:any): Generator {
    try {
      const token = yield get("@token");
      const id_user =  yield get("@id_user");
      const { params } = action
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      }
      params.user_id = id_user
      const file = params?.imgAvatar;
  
      if (file !== null) {
        if(params.urlImage){
          file.fileName = getFileName(params.urlImage);
        }
        const dataFile:any = yield FetchBlobProvider.UploadFile({
          file,
          location: FetchBlobProvider.LocationEnum.profile,
          endpoint: FetchBlobProvider.endpointEnum['image'],
          timeVideo: '',
          typeFile: 'image'
        })
        params.path_avatar = dataFile?.url;
      }
      
        delete params['imgAvatar'];
        const api = API.create(headers, config.url_api_user)
        let data:any = yield call(api.users.updateProfile, params)
        if (data.data.hasOwnProperty('status')) {
          yield put({ type: types.UPDATE_PROFILE_FAILED, error: data.data })
        } else {
          yield put({ type: types.UPDATE_PROFILE_RECEIVED, data: data.data })
        }
      
    } catch (error:any) {
      if (error.response) {
        if (error.response.status > 499) {
          yield put({
            type: types.UPDATE_PROFILE_FAILED,
            error: {
              message:
                'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
            },
          })
        } else {
          yield put({
            type: types.UPDATE_PROFILE_FAILED,
            error: error.response.data,
          })
        }
      } else if (error.request) {
        yield put({
          type: types.UPDATE_PROFILE_FAILED,
          error: {
            message:
              'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.',
          },
        })
      } else {
        yield put({
          type: types.UPDATE_PROFILE_FAILED,
          error: {
            message:
              'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
          },
        })
      }
    }
  }

  export function* getUserByUserName(action:any): Generator {
    try {
      const { params } = action;
      const token = yield get("@token");
      const id_user =  yield get("@id_user");
      const headers = {
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'authorization': token
      }
      params.idUser = id_user
      const api = API.create(headers, config.url_api_user);
      let data:any = yield call(
        api.users.getUserByUserName,
        params
      );
  
      if (data.status !== 200) {
        yield put({ type: types.GET_USER_BY_USERNAME_FAILED, error: data.data });
      } else {
        yield put({ type: types.GET_USER_BY_USERNAME_RECEIVED, data: data.data });
      }
  
    } catch (error) {
      yield put({ type: types.GET_USER_BY_USERNAME_FAILED, error: error });
    }
  }

  export function* geNftByUser(action:any): Generator {
    try {
      const { params } = action;
      const token = yield get("@token")??'';
      const headers = {
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'authorization': token
      }
      const api = API.create(headers, config.url_api_foro);
      let data:any = yield call(
        api.users.getNftByUser,
        params
      );

  
      if (data.status !== 200) {
        yield put({ type: types.GET_NFT_BY_USER_FAILED, error: data.data });
      } else {
        yield put({ type: types.GET_NFT_BY_USER_RECEIVED, data: data.data });
      }
  
    } catch (error) {
      yield put({ type: types.GET_NFT_BY_USER_FAILED, error: error });
    }
  }

  export function* getImageNftByStatus(action:any): Generator {
    try {
      const { params } = action;
      const token = yield get("@token")??'';
      const headers = {
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'authorization': token
      }
      const api = API.create(headers, config.url_api_foro);
      let data:any = yield call(
        api.users.getImageNftByStatus,
        params
      );
  
      if (data.status !== 200) {
        yield put({ type: types.GET_IMAGE_NFT_BY_STATUS_FAILED, error: data.data });
      } else {
        yield put({ type: types.GET_IMAGE_NFT_BY_STATUS_RECEIVED, data: data.data });
      }
  
    } catch (error) {
      yield put({ type: types.GET_IMAGE_NFT_BY_STATUS_FAILED, error: error });
    }
  }
 
  export function* saveSelectNft(action:any): Generator {
    try {
      const token = yield get("@token");
      const id_user =  yield get("@id_user");
      const { params } = action
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: token,
      }
      params.user = id_user
      
        const api = API.create(headers, config.url_api_foro)
        let data:any = yield call(api.users.saveSelectNft, params)
        if (data.hasOwnProperty('status') && data.status !== 201) {
          yield put({ type: types.SAVE_SELECT_NFT_FAILED, error: data.data })
        } else {
          yield put({ type: types.SAVE_SELECT_NFT_RECEIVED, data: data.data })
        }
      
    } catch (error:any) {
      if (error.response) {
        if (error.response.status > 499) {
          yield put({
            type: types.SAVE_SELECT_NFT_FAILED,
            error: {
              message:
                'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
            },
          })
        } else {
          yield put({
            type: types.SAVE_SELECT_NFT_FAILED,
            error: error.response.data,
          })
        }
      } else if (error.request) {
        yield put({
          type: types.SAVE_SELECT_NFT_FAILED,
          error: {
            message:
              'Se presentó un problema al obtener los datos, por favor inténtalo más tarde.',
          },
        })
      } else {
        yield put({
          type: types.SAVE_SELECT_NFT_FAILED,
          error: {
            message:
              'Ups! al parecer se presentó una falla, comunícate con soporte y lo resolveremos de inmediato.',
          },
        })
      }
    }
  }

  export function* getCollections(action:any): Generator {
    try {
      const { params } = action;
      const token = yield get("@token")??'';
      const headers = {
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'authorization': token
      }
      const api = API.create(headers, config.url_api_foro);
      let data:any = yield call(
        api.users.getCollections,
        params
      );
  
      if (data.status !== 200) {
        yield put({ type: types.GET_COLLECTIONS_FAILED, error: data.data });
      } else {
        yield put({ type: types.GET_COLLECTIONS_RECEIVED, data: data.data });
      }
  
    } catch (error) {
      yield put({ type: types.GET_COLLECTIONS_FAILED, error: error });
    }
  }

  export function* getNftByPerfil(action:any): Generator {
    try {
      const { params } = action;
      const token = yield get("@token")??'';
      const headers = {
        'Cache-Control': 'no-cache',
        'content-type': 'application/json',
        'authorization': token
      }
      const api = API.create(headers, config.url_api_foro);
      let data:any = yield call(
        api.users.getNftByPerfil,
        params
      );

  
      if (data.status !== 200) {
        yield put({ type: types.GET_NFT_BY_PERFIL_FAILED, error: data.data });
      } else {
        yield put({ type: types.GET_NFT_BY_PERFIL_RECEIVED, data: data.data });
      }
  
    } catch (error) {
      yield put({ type: types.GET_NFT_BY_PERFIL_FAILED, error: error });
    }
  }