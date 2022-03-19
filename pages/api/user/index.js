import config from '../../../config';
import { get } from '../../../utils/SesionStorage';
import axios from 'axios';

export default async function handler(req, res) {
    const token = await get("@token")?? '';

    console.log("config.url_api_user + req.query.url: ", config.url_api_user + req.query.url);
    console.log("req.body: ", req.body);
    let result = await axios({
        method: req.method,
        url: config.url_api_user + req.query.url,
        params: req.query,
        data: req.body,
        headers: {
            'Cache-Control': 'no-cache',
            'content-type': 'application/json',
            'authorization': token
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        //handle error
        //console.log("error: ",error.response);
    });

    res.json(result)
}