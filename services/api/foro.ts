import { AxiosInstance } from "axios";

export default function (api:AxiosInstance){
    return {
        createPost: (params:any) => api.post("/api/post/query/v1-api-post-withCharacter", params),
        getPostsPublic: (params:any) => api.get("/api/post",{params:{...params, url:"/v1/api/post/posts"}}),
        getPosts: (params:any) => api.get("/api/post/query/v1-api-post-postByUser",{params}),
        insertPoints: (params:any) => api.post("/api/post/query/v1-api-post-insertpoints",params),
        deletePoint: (params:any) => api.post("/api/post/query/v1-api-post-deletepoint",params),
        setComments: (params:any) => api.post("/api/post/query/v1-api-comment",params),
        getCommentByPost: (params:any) => api.get("/api/post/query/v1-api-comment-getcommentbypost",{ params }),
        deleteComments: (params:any) => api.delete("/api/post/query/v1-api-comment-"+params.idComment),
        setFollow: (params:any) => api.post("/api/post/query/v1-api-friend",params),
        getPostsById: (params:any) => api.get("/api/post/query/v1-api-post-postById",{params}),
        getFollows: (params:any) => api.get("/api/post/query/v1-api-friend-follows",{params}),
        deleteFollow: (params:any) => api.delete("/api/post/query/v1-api-friend-deleteFollow",{params}),
        countFollows: (params:any) => api.get("/api/post/query/v1-api-friend-countFollows",{params}),
        getPostByPerfil: (params:any) => api.get("/api/post/query/v1-api-post-postByPerfil",{params}),
        deletePost: (params:any) => api.delete("/api/post/query/v1-api-post-"+params.idPost,),
        reportPost: (params:any) => api.post("/api/post/query/v1-api-post-insertReport",params),
        reportComment: (params:any) => api.post("/api/post/query/v1-api-comment-insertReport",params),
        getSearchPost: (params:any) => api.get("/api/post/query/v1-api-post-searchPost",{params}),
        validateFollows: (params:any) => api.get("/api/post/query/v1-api-friend-validateFollows",{params}),
        updatePost: (params:any) => api.patch("/api/post/query/v1-api-post-withCharacter-"+params.idPost, params),
        getHeaderCS: (params:any) => api.get("/api/post/query/v1-api-post-formSearch", params),
        insertPointsComment: (params:any) => api.post("/api/post/query/v1-api-comment-insertpointsComment",params),
        getNotifications: (params:any) => api.get("/api/post/query/v1-api-notification-getByUser",{params}),
        updateNotiAll: (params:any) => api.patch("/api/post/query/v1-api-notification-updateAll",params),
        updateNoti: (params:any) => api.patch("/api/post/query/v1-api-notification-"+params._id, params),
    }
} 