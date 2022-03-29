import config from '../../../../config';
import axios from 'axios';

export default async function handler(req, res) {
    
    let { url } = req.query
    url = url.split("-").join("/");

    let confg = {
        method: req.method,
        url: config.url_api_foro +"/"+ url,
        params: req.query,
        headers: {
            'Cache-Control': 'no-cache',
            'content-type': 'application/json',
            'authorization': req.headers.authorization
        } 
    }
    if(req.body!==null && req.body!==''){
        confg['data'] =  req.body;
    }

    console.log("confg: ",confg);

    let result = await axios(confg)
    .then((response) => {
        return response.data;
    }).catch((error) => {
        //handle error
        if(error.response){
            //console.log("error: ",error.response.data);
        }else{
            //console.log("error: ", error);
        }
    });

    console.log("result: ", result);

    if(req.method == 'POST'){
        res.status(201).send(result);
    }else{
        res.status(200).send(result);
    }
}