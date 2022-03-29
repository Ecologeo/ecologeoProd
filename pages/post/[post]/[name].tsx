import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import * as foroAction from '../../../actions/foro'
import { bindActionCreators } from 'redux'
import styles from '../../home/style.module.scss'
import Footer from '../../../components/footer';
import Header from '../../../components/header';
import Posts from '../../../components/foro/posts';
import { get } from '../../../utils/SesionStorage';
import ReactGA from 'react-ga4';
import { useRouter } from 'next/router'
import axios from 'axios';
import config from '../../../config';

function Post(props:any) {

const [dataPosts, setDataPosts] = useState([])

  const router = useRouter();

  const idPost = router.query.post;

  useEffect(()=>{
    const idUser = get("@id_user") ?? '000000000000000000000000';
    props.actions.getPostsById({ idPost, idUser });
    ReactGA.send({ hitType: "pageview", page: '/post' });
  },[])  

  useEffect(() => {
    setDataPosts(props.dataPostByID);
  }, [props.dataPostByID])

  const updatePosts = () => {
    window.location.href = "/";
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Posts 
        postsInfo={dataPosts}
        updatePosts={updatePosts}
        type={3}
        messageError={"No encontramos este Post Pero puedes seguir explorando más en el inicio "}
        />
      </main>
      
      <Footer />
    </div>
  )
}

export async function getStaticProps() {

  const params =  { idUser: '', pageNum: 1 }
  const url = config.url_api_foro +"/v1/api/post/posts"; //: "/api/post/query/v1-api-post-postByUser"
  
  try {
      let res = await axios({
          method: 'get',
          url,
          params,
          headers: {
              'Cache-Control': 'no-cache',
              'content-type': 'application/json',
              'authorization': ''
          }
      }).then((response) => {
  
          return response.data;
      }).catch((error) => {
          //handle error
          //console.log(error);
          console.log("error: ", error)
      });  
  
      //const res = await fetch('https://.../posts')
      const dataPosts =  res;
    
      return {
        props: {
          dataPosts,
        },
        // Next.js will attempt to re-generate the page:
        // - When a request comes in
        // - At most once every 10 seconds
        revalidate: 10, // In seconds
      }
  } catch (error) {
      console.log("error2: ",error);
  }

}

function getName(data:any){
  console.log("data: ", data);
  const name:any = data.filter((el: any) => el.key == 'name');
  return name[0].value.toLowerCase().split(" ").join("-");
}

const getCharacteristic = (data: any, type: any) => {
  return data.filter((elemt: any) => elemt.type === type);
}

export async function getStaticPaths() {
  const params =  { idUser: '', pageNum: 1 }
  const url = config.url_api_foro +"/v1/api/post/posts"; //: "/api/post/query/v1-api-post-postByUser"
  
  try {
      let res = await axios({
          method: 'get',
          url,
          params,
          headers: {
              'Cache-Control': 'no-cache',
              'content-type': 'application/json',
              'authorization': ''
          }
      }).then((response) => {
  
          return response.data;
      }).catch((error) => {
          //handle error
          //console.log(error);
          console.log("error: ", error);
      });  
  
      //const res = await fetch('https://.../posts')
      const dataPosts =  res;
    
      // Get the paths we want to pre-render based on posts
      const paths = dataPosts.map((post:any) => ({
        params: { post: post._id, name: getName(getCharacteristic(post.character.data, 'character') ) },
      }))

      // We'll pre-render only these paths at build time.
      // { fallback: blocking } will server-render pages
      // on-demand if the path doesn't exist.
      console.log("paths: ", paths)
      return { paths, fallback: 'blocking' }
  } catch (error) {
      console.log("error2: ",error);
  }

  
}


const mapStateToProps = (state: any) => ({
    isLoadingPostById: state.foro.isLoadingPostById,
    dataPostByID: state.foro.dataPostByID,
    errorPostById: state.foro.errorPostById,
  })
  
  const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(foroAction, dispatch)
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(Post);
  