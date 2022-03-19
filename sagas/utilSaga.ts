
import { call, put } from 'redux-saga/effects';
import API from '../services';
import config from '../config';

export function* deleteImage(headers:any, urlImage:any, folder:any ): Generator{
    const filePost = getFileName(urlImage);
    const data:any ={
      "bucket": config.bucketDO,
      "key" : folder + filePost
    }
    const apiImage:any = API.create(headers,config.url_api_image);
    yield call(apiImage.image.deleteFile,data);
}

export function getFileName(urlImage:any){
  const name = urlImage.split("/")[4];
  return name;
}