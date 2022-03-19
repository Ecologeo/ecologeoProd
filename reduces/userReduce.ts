import * as type from './../actions/index';

const userReducer = (state = { 
    isLoading: false, 
    dataPerfil: {}, 
    imgPerfil: new Date(),
    isLoadingGetUsers: false,
    dataImageNft: [],
    pageImageNFT: 1,
    ended: false }, action:any) => {
    switch (action.type) {
        
        case type.GET_USER_BY_NAME:
            return { ...state, isLoadingGetUsers: true };
        case type.GET_USER_BY_NAME_RECEIVED:
            return { ...state, dataUserByName: action.data, isLoadingGetUsers: false, errorUserByName: false };
        case type.GET_USER_BY_NAME_FAILED:
            return { ...state, errorUserByName: action.error, isLoadingGetUsers: false, };    

        case type.GET_USER_BY_ID:
            return { ...state, isLoading: true };
        case type.GET_USER_BY_ID_RECEIVED:
            return { ...state, dataUser: action.data, isLoading: false };
        case type.GET_USER_BY_ID_FAILED:
            return { ...state, error: action.error, isLoading: false, };   
            
        case type.UPDATE_PROFILE:
                return { ...state, isLoading: true };
            case type.UPDATE_PROFILE_RECEIVED:
                return { ...state, userProfileResponse: action.data, isLoading: false, errorProfile: false, imgPerfil: new Date() };
            case type.UPDATE_PROFILE_FAILED:
                return { ...state, errorProfile: action.error, isLoading: false, };

        case type.GET_USER_BY_USERNAME:
                return { ...state, isLoadingUserName: true };
        case type.GET_USER_BY_USERNAME_RECEIVED:
                return { ...state, dataUserName: action.data, isLoadingUserName: false, errorUserName: false };
        case type.GET_USER_BY_USERNAME_FAILED:
                return { ...state, errorUserName: action.error, isLoadingUserName: false, };
           
        case type.GET_NFT_BY_USER:
                return { ...state, isLoadingNft: true };
        case type.GET_NFT_BY_USER_RECEIVED:
                    return { ...state, dataNft: action.data, isLoadingNft: false, errorNft: false };
        case type.GET_NFT_BY_USER_FAILED:
                    return { ...state, errorNft: action.error, isLoadingNft: false, };
        
        case type.GET_IMAGE_NFT_BY_STATUS:
                return {
                        ...state, isLoadingImageNft: true,
                        dataImageNft: action.params.pageNum === 1 ? [] : state.dataImageNft,
                        pageImageNFT: action.params.pageNum,
                        ended: action.params.pageNum === 1 ? false: state.ended
                    };
        case type.GET_IMAGE_NFT_BY_STATUS_RECEIVED:

                if (action.data.length === 0 && state.dataImageNft.length > 0) {
                        return {
                            ...state,
                            ended: true,
                        }
                    }
                    const moreImageNFT = action.data.length > 0 ? state.dataImageNft.concat(action.data) : state.dataImageNft
        
        
                    return {
                        ...state,
                        dataImageNft: moreImageNFT,
                        isLoadingImageNft: false,
                        pageImageNFT: state.pageImageNFT + 1,
                        errorImageNft: false
                    };

        case type.GET_IMAGE_NFT_BY_STATUS_FAILED:
                return { ...state, errorImageNft: action.error, isLoadingImageNft: false, };
        
        case type.SAVE_SELECT_NFT:
                return { ...state, isLoadingSelectNft: true };
        case type.SAVE_SELECT_NFT_RECEIVED:
                return { ...state, dataSelectNft: action.data, isLoadingSelectNft: false, errorSelectNft: false };
        case type.SAVE_SELECT_NFT_FAILED:
                return { ...state, errorSelectNft: action.error, isLoadingSelectNft: false, };
        
        case type.GET_COLLECTIONS:
                return { ...state, isLoadingCollections: true };
        case type.GET_COLLECTIONS_RECEIVED:
                return { ...state, dataCollections: action.data, isLoadingCollections: false, errorCollections: false };
        case type.GET_COLLECTIONS_FAILED:
                return { ...state, errorCollections: action.error, isLoadingCollections: false, };
        
        case type.GET_NFT_BY_PERFIL:
                return { ...state, isLoadingNftPerfil: true };
        case type.GET_NFT_BY_PERFIL_RECEIVED:
                return { ...state, dataNftPerfil: action.data, isLoadingNftPerfil: false, errorNftPerfil: false };
        case type.GET_NFT_BY_PERFIL_FAILED:
                return { ...state, errorNftPerfil: action.error, isLoadingNftPerfil: false, };
                

        default:
            return state;
    }
}

export default userReducer;