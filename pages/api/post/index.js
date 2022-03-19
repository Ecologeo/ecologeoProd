import config from '../../../config';
import axios from 'axios';

export default async function handler(req, res) {
    let result = await axios({
        method: req.method,
        url: config.url_api_foro + req.query.url,
        params: req.query,
        headers: {
            'Cache-Control': 'no-cache',
            'content-type': 'application/json',
            'authorization': req.headers.authorization
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        //handle error
        if(error.response){
            console.log("error: ",error.response.data);
        }else{
            console.log("error: ", error);
        }
        
    });

    res.status(200).json(result)
}