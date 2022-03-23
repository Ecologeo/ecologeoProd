import React from 'react';
import Layout from '../../components/monst/layout/Layout';
import Link from "next/link";
import CounterUp from "../../components/monst/elements/Counterup";

const About = () => {
    return (
        <>
            <Layout>
                
                <section className="py-12 bg-blueGray-50" id="how-we-work">
                    <div className="container">
                        <div className="flex flex-wrap items-center justify-between max-w-2xl lg:max-w-full mb-12">
                            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
                                <h2 className="text-3xl md:text-4xl font-bold font-heading wow animate__animatedanimated animate__fadeInDown text-center">
                                    <span>Campañas Ecológicas</span>
                                    <br />
                                    <img className="h-8 mx-auto my-4" src="/assets/imgs/illustrations/igual.svg" alt="Reportes" />
                                    <span className="text-blue-500">Reportes de Ecologeo </span>
                                </h2>
                            </div>
                            <div className="w-full lg:w-1/2">
                                <p className="text-blueGray-500 text-justify leading-loose wow animate__animatedanimated animate__fadeIn">Ecologeo es una plataforma social donde los consumidores responsables se pueden unir a campañas ecológicas solo con publicar sus recomendaciones. Las campañas son representadas con reportes e indicadores especializados que agrupan sus demandas, criterios u opiniones.  y estas campañas podrán llegar a tomadores de decisiones en las regiones.</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 -mb-6 text-center">
                            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                <div className="p-12 bg-white shadow rounded">
                                    <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">1</div>
                                    <img className="h-36 mx-auto my-4" src="/assets/imgs/illustrations/web.svg" alt="Publicaciones" />
                                    <h3 className="mb-2 font-bold font-heading text-xl">Publica tus criterios</h3>
                                    <p className="text-sm text-blueGray-500 text-justify leading-relaxed">Se pueden compartir y explorar criterios, acerca de: productos, noticias, investigaciones, leyes, entre otros temas. </p>
                                </div>
                            </div>
                            <div className="hover-up-5 w-full md:w-1/2 lg:w-1/3 px-3 mb-6 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                <div className="p-12 bg-white shadow rounded">
                                    <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">2</div>
                                    <img className="h-36 mx-auto my-4" src="/assets/imgs/illustrations/report.svg" alt="Reportes" />
                                    <h3 className="mb-2 font-bold font-heading text-xl">Generamos los reportes</h3>
                                    <p className="text-sm text-blueGray-500 text-justify leading-relaxed">Ecologeo analiza los miles o millones de criterios publicados para generar reportes especializados, que corresponden a campañas ecológicas.</p>
                                </div>
                            </div>
                            <div className="hover-up-5 w-full lg:w-1/3 px-3 mb-6">
                                <div className="p-12 bg-white shadow rounded wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                                    <div className="flex w-12 h-12 mx-auto items-center justify-center text-blue-800 font-bold font-heading bg-blue-200 rounded-full">3</div>
                                    <img className="h-36 mx-auto my-4" src="/assets/imgs/illustrations/take-decision.svg" alt="Tomadores de decisiones" />
                                    <h3 className="mb-2 font-bold font-heading text-xl">Impactamos las empresas o instituciones.</h3>
                                    <p className="text-sm text-blueGray-500 text-justify leading-relaxed">Los reportes pueden llegar a empresas o instituciones que tomarán decisiones ambientales más acertadas al observar la agrupación de miles o millones de criterios.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-4 xl:bg-contain bg-top bg-no-repeat" style={{ backgroundImage: "url('assets/imgs/backgrounds/intersect.svg')" }} id="key-features">
                    <div className="container">
                        <div className="max-w-lg mx-auto mb-12 text-center">
                            <h2 className="my-2 text-3xl md:text-4xl font-bold font-heading wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                            Publicaciones que <br />
                               podras <span className="text-blue-500">realizar y explorar</span>
                            </h2>
                            <p className="text-blueGray-500 leading-loose wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                En las publicaciones podrás expresar tus opiniones, criterios o demandas que veas necesarias que se implementen en las empresas e instituciones.
                            </p>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Productos Ecológicos</h3>
                                    <p className="text-sm text-blueGray-400">Indica los criterios que te llevaron a comprar un producto ecológico.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <img className="h-8 mx-auto" src="/assets/imgs/icons/news.svg" alt="Noticias" />
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Noticias<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Comparte tus opiniones o apreciaciones sobre noticias que te llamen la atención.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                        <img className="h-8 mx-auto" src="/assets/imgs/icons/post.svg" alt="articulos-icon" />
                                       
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Articulos<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Escribe artículos sobre cualquier tema que veas que los demás consumidores responsables necesitan saber.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".9s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <img className="h-8 mx-auto" src="/assets/imgs/icons/pqr.svg" alt="PQR" />
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">PQRS directo a una empresa<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Escríbele directamente a una empresa lo que piensas de sus servicios y producto, si no los ven nosotros se lo haremos llegar .</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".3s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <img className="h-8 mx-auto" src="/assets/imgs/icons/reseach.svg" alt="Investigaciones" />
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Investigaciones<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Comparte las investigaciones que te parezcan relevantes para que los demás consumidores responsables las conozcan, y además puedes dejar tu opinión..</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".5s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <img className="h-8 mx-auto" src="/assets/imgs/icons/ley.svg" alt="Leyes y normas" />
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Leyes o normas<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Comparte las leyes o normas que te parezcan relevantes para que los demás consumidores responsables las conozcan, y además puedes dejar tu opinión.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".7s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <img className="h-8 mx-auto" src="/assets/imgs/icons/event.svg" alt="Eventos" />
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Eventos<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Comparte los eventos que te parezcan relevantes para que los demás consumidores responsables los conozcan.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/4 px-3 mb-6">
                                <div className="border border-gray-100 pt-8 px-6 pb-6 bg-white text-center rounded shadow hover:shadow-lg hover-up-2 transition duration-500 wow animate__animated animate__fadeIn" data-wow-delay=".9s">
                                    <div className="text-blue-500 mx-auto mb-4">
                                    <img className="h-8 mx-auto" src="/assets/imgs/icons/meme.svg" alt="Memes" />
                                    </div>
                                    <h3 className="mb-2 font-bold font-heading">Memes<br/>(pendiente)</h3>
                                    <p className="text-sm text-blueGray-400">Tambien podras compartir memes para tener algo de esparcimiento :D</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
               
                               

                
            </Layout>
        </>
    );
};

export default About;