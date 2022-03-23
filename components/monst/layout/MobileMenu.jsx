import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from 'next/image';
import logo from '../../../pages/assets/img/logo.png';
import styles from '../../../pages/home/style.module.scss';
import ModalAuth from '../../../components/auth/modalAuth';
import { get } from '../../../utils/SesionStorage';

const MobileMenu = ({ hiddenClass, handleRemove }) => {
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });
    const [tokenUser, setToken] = useState(null);
    const [show, setShow] = useState(false);
    const [optionAuth, setOptionAuth] = useState(1);

    useEffect(() => {
        const token = get('@token');
        setToken(token);
      }, []);



    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };

    const closeModal = (e) => {
        setShow(!show);
    };
    return (
        <>
            <div className={`${hiddenClass} navbar-menu relative z-50 transition duration-300`}>
                <div className="navbar-backdrop fixed inset-0 bg-blueGray-800 opacity-25"></div>
                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto transition duration-300">
                    <div className="flex items-center mb-8">
                        <Link href="/">
                            <a className="mr-auto text-3xl font-semibold leading-none">
                                <div className={styles.divLogo}><Image src={logo} alt="Ecololgeo Logo" layout="fill" /></div> 
                            </a>
                        </Link>
                        <button className="navbar-close" onClick={handleRemove}>
                            <svg className="h-6 w-6 text-blueGray-400 cursor-pointer hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul className="mobile-menu">
                              
                            <li className="mb-1 rounded-xl">
                                <Link href="/about">
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500 rounded-xl">Acerca de</a>
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/services">
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500">Blog</a>
                                </Link>
                            </li>
                            <li className="mb-1">
                                <Link href="/portfolio">
                                    <a className="block p-4 text-sm text-blueGray-500 hover:bg-blue-50 hover:text-blue-500">Ayuda</a>
                                </Link>
                            </li>
                            
                            
                        </ul>
                        {tokenUser !== null ?
                        <div className="mt-4 pt-6 border-t border-blueGray-100">
                            <Link href="/">
                                <a className="btn-primary-green block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none  rounded">Inicio</a>
                            </Link>
                        </div>:
                        <div className="mt-4 pt-6 border-t border-blueGray-100">
                            <Link href="#">
                                <a onClick={() => {setShow(!show); setOptionAuth(3); }} className="btn-primary-green block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none  rounded">Regístrate</a>
                            </Link>
                            <Link href="#">
                                <a onClick={() => {setShow(!show); setOptionAuth(2); }} className="btn-accent block px-4 py-3 mb-3 text-xs text-center font-semibold leading-none border rounded" style={{marginRight:0}}>Inicia Sesión</a>
                            </Link>
                        </div>
                        }
                    </div>
                    <div className="mt-auto">
                        <p className="my-4 text-xs text-blueGray-400">
                            
                            <span className="text-blue-500 hover:text-blue-500 underline">info@ecologeo.com</span>
                        </p>
                        <a className="inline-block px-1" href="https://www.facebook.com/people/Ecologeo/100061684971960/">
                            <img src="/assets/imgs/icons/facebook-blue.svg" alt="Ecologeo" />
                        </a>
                        <a className="inline-block px-1" href="https://twitter.com/ecologeo10">
                            <img src="/assets/imgs/icons/twitter-blue.svg" alt="Ecologeo" />
                        </a>
                        <a className="inline-block px-1" href="https://www.instagram.com/ecologeo10">
                            <img src="/assets/imgs/icons/instagram-blue.svg" alt="Ecologeo" />
                        </a>
                    </div>
                </nav>
            </div>
            <ModalAuth show={show} closeModal={closeModal} option={optionAuth} />
        </>
    );
};

export default MobileMenu;
