import React from 'react';
import Layout from '../../components/monst/layout/Layout';
import Link from "next/link"

const BlogSingle2 = () => {
    return (
        <>
            <Layout>
                <section className="pb-20">
                    <div className="pt-20 mb-12 bg-cover bg-no-repeat">
                        <div className="container">
                            <div className="max-w-2xl mx-auto">
                                <div className="text-center mb-6">
                                    <span className="text-base md:text-lg">
                                        <Link href="/blog">
                                            <a className="text-blueGray-200 hover:underline">
                                                <span className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl mr-3">INFORMATIVOS</span>
                                            </a>
                                        </Link>
                                        <span className="text-blueGray-500 text-sm">Febrero 21, 2022</span>
                                    </span>
                                    <h2 className="text-4xl md:text-5xl mt-4 font-bold font-heading">¿Qué es el Greenwashing?</h2>
                                </div>
                                <div className="flex justify-center mb-8">
                                    <img className="w-12 h-12 object-cover rounded-full" src="/assets/imgs/placeholders/avatar-8.png" alt="Rosario" />
                                    <div className="pl-4">
                                        <p className="text-blueGray-500 mb-1">Rosario Elena Peña Agudelo</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="max-w-2xl mx-auto">
                        <img className="h-80 w-full object-cover rounded"  src="/assets/imgs/blog/greenw.png" alt="Greenwashing" />
                            <p className="mb-6 leading-loose text-blueGray-500">Estamos viviendo momentos críticos para el planeta y el medio ambiente debido a los altos niveles de contaminación y el cambio climático se ha convertido en un tema de suma importancia y alta prioridad. Actualmente las personas estamos siendo más conscientes del impacto positivo o negativo que generamos con nuestras acciones y hábitos de consumo, por lo que muchos estamos en constante búsqueda de productos que suplan nuestras necesidades y que tengan un impacto mínimo en el medio ambiente, como por ejemplo productos que sean elaborados con materia prima natural, productos veganos no testeados en animales, entre otros.</p>
                           
                            <p className="mb-6 leading-loose text-blueGray-500">
                            Las empresas saben de la importancia que está tomando todo esto para los consumidores por lo que aprovechan, a través del marketing, para mostrarse como empresas con procesos y productos amigables con el medio ambiente, pero en muchos casos es solo eso, marketing, ya que realmente siguen realizando procesos y productos que contaminan y afectan negativamente al medio ambiente e incluso a la salud de las personas. Esto es lo que se conoce como <b>“Greenwashing”.</b>
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            El greenwashing funciona como una estrategia de mercadotecnia que realmente es un engaño porque las empresas dicen ser respetuosas con el medio ambiente cuando en realidad es todo lo contrario.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            La mejor manera de evitar el greenwashing es documentarnos e investigar a las empresas o los productos antes de consumirlos, de igual manera puedes apoyarte en páginas como Ecologeo donde encontrarás recomendaciones, hallazgos o solicitud de opiniones sobre productos ecológicos los cuales son compartidos por usuarios y empresas que hacen parte de esta red.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            Juntos podremos vencer el greenwashing e impactar positivamente en el medio ambiente, incluso en nuestra salud, tomando buenas decisiones a la hora de realizar nuestras compras!
                            </p>

                            
                        </div>

                    </div>
                </section>
            </Layout>
        </>
    );
};

export default BlogSingle2;