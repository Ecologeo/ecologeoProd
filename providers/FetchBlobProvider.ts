import config from '../config';
import { get } from '../utils/SesionStorage';
import axios, {AxiosRequestConfig, AxiosRequestHeaders} from 'axios';

export const UploadFile = async ({ file, location, endpoint, timeVideo, typeFile }:any) => {
  try {
    
    let url =  endpoint + location;
    if(typeFile === 'video'){
      url += "&seginit="+timeVideo.segInit+"&seg="+parseInt(timeVideo.seg)
    }
    const token = get('@token')??'';
    const headers:AxiosRequestHeaders = {
      'authorization': token,
      'Content-Type': 'multipart/form-data',
    };

    //console.log("file: ", file);

    const data = new FormData();
      data.append('file', file, file.name);
    
    //let params = { name: 'file', filename: file.fileName, data: file.uri };
    const configAx:AxiosRequestConfig  = {
      method: 'post',
      url, 
      data,
      headers,
    }
    let result = await axios(configAx).then((response) => {
      //handle success
      //console.log(response);
      console.log("response.data: ", response.data);
      return response.data.data;
    }).catch((error) => {
      //handle error
      //console.log(error);
      
    });
    //let data = (await RNFetchBlob.fetch('POST', url, options, [params])).data;
    //console.log("result-image: ", result);
    return result;
  } catch (error) {
    //console.log('FetchBlobProvider UploadFile: ', error)
  }
};

export const endpointEnum:any = {
  image: '/api/image/query/v1-api-image-upload?location=',
  video: '/api/image/query/v1-api-image-uploadVideo?location='
}

export const LocationEnum:any = {
  profile: 'profile',
  post: 'post',
}