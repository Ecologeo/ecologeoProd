import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        register: (params:any) => api.post(`/api/user/query/v1-api-register-signup`, params),
        registerFacebook: (params:any) => api.post(`/api/user/query/v1-api-register-signUpFacebook`, params),
        login: (params:any) => api.post(`/api/user/query/auth-signin`, params),
        logout: (params:any) => api.post(`/api/user/query/auth-logout`, params),
        resetPassword: (params:any) => api.post(`/api/user/query/v1-api-register-resetPassword`, params),
        verifyCode: (params:any) => api.post(`/api/user/query/v1-api-user-verifycode`, params),
        recoverPassword: (params:any) => api.get(`/api/user/query/v1-api-register-recoverPassword`, {params}),
    }
}