import '../styles/globals.css';
import '../styles/menu.css';
import '../styles/help.css';
import '../styles/icon.css';
import '../styles/foro.css';
import '../styles/modals.css';
import '../styles/recoverPass.css';
import type { AppProps } from 'next/app'
import '../public/assets/css/animate.min.css'
import React, { useEffect, useState } from "react";
import '../public/assets/css/tailwind-built.css'
import "swiper/css";
import withReduxSaga from 'next-redux-saga';
import wrapper from '../components/wrapper';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(withReduxSaga(MyApp))