import configv from '../../../../config';
import axios from 'axios';
import nextConnect from 'next-connect';
import multer from 'multer';
import { IncomingForm } from "formidable";
var FormData = require('form-data');
import fs from "fs";


export const config = {
    api: {
      bodyParser: false, // Disallow body parsing, consume as stream
    },
  };


export default async function handler(req, res) {
    
    var { url , location} = req.query
    url = url.split("-").join("/");

        let result = null;
        const form = new IncomingForm({ multiples: true });
        form.parse(req, async (err, fields, files) => {
        const data = new FormData();
        const datafs = fs.createReadStream(files.file.filepath);
        data.append('file', datafs);
        data.append('originalname', files.file.originalFilename );
        data.append('mimetype', files.file.mimetype)
        result = await axios({
            method: req.method,
            url: configv.url_api_image +"/"+ url+"?location="+location,
            data,
            headers: {
                    ...data.getHeaders(), 
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
        return res.json({data:result})
        
        });

        

    

    
}

