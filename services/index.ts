import axios from 'axios';
import Auth from './api/auth';
import Foro from './api/foro';
import Users from './api/users';
import Image from './api/image';

import config from './../config';
const header:any = {
    'Cache-Control': 'no-cache',
    'content-type': 'application/json',
}

const create =  (headers:any = header, baseURL:any = config.url_api) =>{
    
    const api  = axios.create({
        headers,
        timeout: 1000000
    });
    

    const auth = Auth(api);
    const foros = Foro(api);
    const users = Users(api);
    const image = Image(api);
    
    return {
        setHeader: (key: string, value: string) => api.defaults.headers.common[key] = value,
        auth,
        foros,
        users,
        image
    }
}

export default {create};
