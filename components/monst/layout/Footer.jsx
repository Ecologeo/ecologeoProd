import React from "react";
import Link from "next/link"
import Image from 'next/image';
import logo from '../../../pages/assets/img/logo.png';
import styles from '../../../pages/home/style.module.scss';

const Footer = () => {
    return (
        <>
            <section className="py-20">
                <div className="container px-4 mx-auto wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                    <div className="flex flex-wrap mb-12 lg:mb-20 -mx-3 text-center lg:text-left">
                        <div className="w-full lg:w-1/5 px-3 mb-6 lg:mb-0">
                        <Link href="/">
                            <a className="text-3xl font-semibold leading-none">
                                <div className={styles.divLogo}><Image src={logo} alt="Ecololgeo Logo" layout="fill" /></div> 
                            </a>
                        </Link>
                        </div>
                        <div className="w-full lg:w-2/5 px-3 mb-8 lg:mb-0">
                            <p className="max-w-md mx-auto lg:max-w-full lg:mx-0 lg:pr-32 lg:text-lg text-blueGray-400 leading-relaxed">
                                LLevando la voz de los <strong>ambientalistas</strong> a muchos lugares
                            </p>
                        </div>
                        <div className="w-full lg:w-1/5 px-3">
                            <p className="mb-2 lg:mb-4 lg:text-lg font-bold font-heading text-blueGray-800">Contactos</p>
                            <p className="lg:text-lg text-blueGray-400">3127403022</p>
                            <p className="lg:text-lg text-blueGray-400">info@ecologeo.com</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between">
                        <p className="text-sm text-blueGray-400">
                            &copy; 2022. All rights reserved. Designed by{" "}
                            <a className="text-blue-400" href="https://ecologeo.com" target="_blank">
                                ecologeo.com
                            </a>
                        </p>
                        <div className="order-first lg:order-last -mx-2 mb-4 lg:mb-0">
                            <a className="inline-block px-2" href="https://www.facebook.com/people/Ecologeo/100061684971960/">
                                <img src="/assets/imgs/icons/facebook-blue.svg" alt="Ecologeo" />
                            </a>
                            <a className="inline-block px-2" href="https://twitter.com/ecologeo10">
                                <img src="/assets/imgs/icons/twitter-blue.svg" alt="Ecologeo" />    
                            </a>
                            <a className="inline-block px-2" href="https://www.instagram.com/ecologeo10">
                                <img src="/assets/imgs/icons/instagram-blue.svg" alt="Ecologeo" />
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Footer;
