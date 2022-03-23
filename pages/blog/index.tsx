import React from 'react';
import Layout from '../../components/monst/layout/Layout';
import Link from "next/link";
import Image from 'next/image';

const Blog2 = () => {
    return (
        <>
            <Layout>
                <section className="py-20">
                    <div className="container">
                        <h1 className="text-2xl lg:text-5xl font-bold mb-5 wow animate__animated animate__fadeIn animated">Blog</h1>
                      
                        <div className="flex flex-wrap -mx-4 mb-12 wow animate__animated animate__fadeIn animated hover-up-5">
                            <div className="w-full lg:w-1/2 px-4 lg:pr-20 lg:pt-4 order-1 lg:order-0">
                                <Link href="/blog">
                                    <a>
                                        <span className="inline-block py-1 px-3 uppercase text-xs font-semibold bg-blue-50 rounded-full text-blue-600">INFORMATIVOS</span>
                                    </a>
                                </Link>
                                <h3 className="my-4 text-xl md:text-2xl font-bold font-heading">
                                    <Link href="/blog/Influencia-de-los-consumidores">
                                        <a className="hover:text-blue-500"> Influencia de los consumidores en el mercado</a>
                                    </Link>
                                </h3>
                                <p className="mb-4 text-sm md:text-base leading-loose text-blueGray-400">Si has comprado un producto para satisfacer una necesidad, eres un consumidor  y el mercado es lo que engloba todas esas compras entre consumidores y vendedores ya sea presencialmente o virtualmente. </p>
                                <Link href="/blog/Influencia-de-los-consumidores">
                                    <a className="text-xs font-semibold text-blue-600">
                                        <span>Leer mas</span>
                                        <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full lg:w-1/2 px-4 mb-8 order-0 lg:order-1">
                                <Link href="/blog/Influencia-de-los-consumidores">
                                    <a>
                                        <img className="h-80 w-full object-cover rounded"  src="/assets/imgs/blog/hands.jpg" alt="Influencia de los consumidores" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-4 mb-12 wow animate__animated animate__fadeIn animated hover-up-5">
                            <div className="w-full lg:w-1/2 px-4 lg:pl-20 lg:pt-4 order-1">
                                <Link href="/blog">
                                    <a>
                                        <span className="inline-block py-1 px-3 uppercase text-xs font-semibold bg-blue-50 rounded-full text-blue-600">INFORMATIVOS</span>
                                    </a>
                                </Link>
                                <h3 className="my-4 text-xl md:text-2xl font-bold font-heading">
                                    <Link href="/blog/greenwasging">
                                        <a className="hover:text-blue-500">¿Qué es el Greenwashing?</a>
                                    </Link>
                                </h3>
                                <p className="mb-4 text-sm md:text-base leading-loose text-blueGray-400">Estamos viviendo momentos críticos para el planeta y el medio ambiente debido a los altos niveles de contaminación y el cambio climático se ha convertido en un tema de suma importancia y alta prioridad.</p>
                                <Link href="/blog/greenwasging">
                                    <a className="text-xs font-semibold text-blue-600">
                                        <span>Leer mas</span>
                                        <svg className="inline-block w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                        </svg>
                                    </a>
                                </Link>
                            </div>
                            <div className="w-full lg:w-1/2 px-4 mb-8 order-0">
                                <Link href="/blog/greenwasging">
                                    <a>
                                        <img className="h-80 w-full object-cover rounded" src="/assets/imgs/blog/greenw.png" alt="Green" />
                                    </a>
                                </Link>
                            </div>
                        </div>
                        
                    </div>
                </section>

                
            </Layout>
        </>
    );
};

export default Blog2;