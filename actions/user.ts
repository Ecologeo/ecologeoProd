import * as types from './index';

  
export const getUserByName = (params:any) => ({
    type: types.GET_USER_BY_NAME,
    params,
})

export const getUser = (params:any) => {
    return ({
        type: types.GET_USER_BY_ID,
        params,
    })
};

export const updateProfile = (params:any) => {
    return ({
        type: types.UPDATE_PROFILE,
        params,
    })
};

export const userByUserName = (params:any) => {
    return ({
        type: types.GET_USER_BY_USERNAME,
        params,
    })
};

export const NftByUser = (params:any) => {
    return ({
        type: types.GET_NFT_BY_USER,
        params,
    })
};

export const imageNftByStatus = (params:any) => {
    return ({
        type: types.GET_IMAGE_NFT_BY_STATUS,
        params,
    })
};

export const saveSelectNft = (params:any) => {
    return ({
        type: types.SAVE_SELECT_NFT,
        params,
    })
};

export const getCollections = (params:any) => {
    return ({
        type: types.GET_COLLECTIONS,
        params,
    })
};

export const NftByPerfil = (params:any) => {
    return ({
        type: types.GET_NFT_BY_PERFIL,
        params,
    })
};