import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        deleteFile: (params:any) => api.post("/api/image/v1-api-image-delete",params),
    }
}