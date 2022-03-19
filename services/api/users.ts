import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        getUser: (params:any) => api.get(`/api/user/query/v1-api-user-getbyid-${params.user_id}`,{params}),
        updatePassword: (params:any) => api.patch(`/api/user/query/v1-api-user-updatepassword-${params.user_id}`, params),
        updateProfile: (params:any) => api.patch(`/api/user/query/v1-api-user-updateProfile-${params.user_id}`, params),
        getUserByName: (params:any) => api.get(`/api/user/query/v1-api-user-userByName`, {params}),
        getUserByUserName: (params:any) => api.get(`/api/user/query/v1-api-user-userByUserName`, {params}),
        getNftByUser: (params:any) => api.get(`/api/post/query/v1-api-nft-${params.user_id}`),
        getImageNftByStatus: (params:any) => api.get(`/api/post/query/v1-api-imageNft-${params.status}`,{params}),
        saveSelectNft: (params:any) => api.post(`/api/post/query/v1-api-nft`, params),
        getCollections: (params:any) => api.get(`/api/post/query/v1-api-imageNft-collections`,{params}),
        getNftByPerfil: (params:any) => api.get(`/api/post/query/v1-api-nft-nftByUser`,{params}),
        
    }
} 