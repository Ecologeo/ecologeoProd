import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import Image from 'next/image';
import logo from '../../../pages/assets/img/logo.png';
import styles from '../../../pages/home/style.module.scss';
import ModalAuth from '../../../components/auth/modalAuth';

const Header = ({handleHidden}) => {
    const [scroll, setScroll] = useState(0)
    const [show, setShow] = useState(false);
    const [optionAuth, setOptionAuth] = useState(1);
    useEffect(() => {
        document.addEventListener("scroll", () => {
          const scrollCheck = window.scrollY > 100
          if (scrollCheck !== scroll) {
            setScroll(scrollCheck)
          }
        })
      })


    const closeModal = (e) => {
        setShow(!show);
    };
    
    return (
        <>
            <header className={scroll ? "bg-transparent sticky-bar mt-4 stick": "bg-transparent sticky-bar mt-4"}>
                <div className="container bg-transparent">
                    <nav className="bg-transparent flex justify-between items-center py-3">
                        <Link href="/">
                            <a className="text-3xl font-semibold leading-none">
                                <div className={styles.divLogo}><Image src={logo} alt="Ecololgeo Logo" layout="fill" /></div> 
                            </a>
                        </Link>
                        
                        <div className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-8">
                        <ul className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-12">
                           
                           <li className="pt-4 pb-4">
                               <Link href="/about">
                                   <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                       Acerca de 
                                   </a>
                               </Link>
                           </li>
                           <li className="pt-4 pb-4">
                               <Link href="/blog">
                                   <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                       Blog
                                   </a>
                               </Link>
                           </li>
                           <li className="pt-4 pb-4">
                               <Link href="/help">
                                   <a className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500">
                                       Ayuda
                                   </a>
                               </Link>
                           </li>
                       </ul>
                       <div className="hidden lg:block" >
                            <Link href="#">
                                <a onClick={() => {setShow(!show); setOptionAuth(2); }} className="btn-accent hover-up-2">Inicia Sesión</a>
                            </Link>
                            <Link href="#">
                                <a onClick={() => {setShow(!show); setOptionAuth(3);}} className="btn-primary-green hover-up-2">
                                    Regístrate
                                </a>
                            </Link>
                        </div>
                        </div>
                        <div className="lg:hidden">
                            <button className="navbar-burger flex items-center py-2 px-3 text-blue-500 hover:text-greem-700 rounded border border-blue-200 hover:border-blue-300 bg-btn" onClick={handleHidden}>
                                <svg
                                    className="fill-current h-4 w-4"
                                    viewbox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <title>Mobile menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            <ModalAuth show={show} closeModal={closeModal} option={optionAuth} />
        </>
    );
};

export default Header;
