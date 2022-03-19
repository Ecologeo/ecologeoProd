const config = {
    url_api: process.env.NEXT_PUBLIC_URL_API,
    url_api_sell: process.env.NEXT_PUBLIC_URL_API_SELL,
    url_api_chat: process.env.NEXT_PUBLIC_URL_API_CHAT,
    url_api_user: process.env.NEXT_PUBLIC_URL_API_USER,
    url_api_foro: process.env.NEXT_PUBLIC_URL_API_FORO,
    ApiKey: process.env.NEXT_PUBLIC_ApiKey,
    api_key_img: process.env.NEXT_PUBLIC_API_KEY_IMG,
    id_facebook: process.env.NEXT_PUBLIC_FACEBOOK,
    url_web: process.env.NEXT_PUBLIC_URL_WEB,
    url_api_image: process.env.NEXT_PUBLIC_URL_API_IMAGE,
    bucketDO: process.env.NEXT_PUBLIC_BUCKET_DO,
    traking_ga: process.env.NEXT_PUBLIC_TRAKING_GA?process.env.NEXT_PUBLIC_TRAKING_GA:''
}
export default config