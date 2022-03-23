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
                                        <span className="text-blueGray-500 text-sm">Febrero 1, 2022</span>
                                    </span>
                                    <h2 className="text-4xl md:text-5xl mt-4 font-bold font-heading">Influencia de los consumidores en el mercado</h2>
                                </div>
                                <div className="flex justify-center mb-8">
                                    <img className="w-12 h-12 object-cover rounded-full" src="/assets/imgs/placeholders/avatar-8.png" alt="Richard" />
                                    <div className="pl-4">
                                        <p className="text-blueGray-500 mb-1">Richard Restrepo Lopez</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="max-w-2xl mx-auto">
                        <img className="h-80 w-full object-cover rounded"  src="/assets/imgs/blog/hands.jpg" alt="Influencia de los consumidores" />
                            <p className="mb-6 leading-loose text-blueGray-500">Si has comprado en algún momento un producto para satisfacer una necesidad, eres un consumidor  y el mercado es lo que engloba todas esas compras entre consumidores y vendedores ya sea presencialmente o virtualmente.</p>
                           
                            <p className="mb-6 leading-loose text-blueGray-500">
                                Hay muchos factores que influyen en el mercado y conocerlos nos da más control de inclinar o equilibrar la balanza  a nuestros intereses, actualmente las empresas son las que más tienen presente estos factores y los utilizan para que compres sus productos, esto no es malo pero los consumidores también debemos ser conscientes de estos factores para entrar en el juego con igualdad de herramientas.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                               Estos serían los factores sociales, y se dan por ejemplo en:
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            <b>Familia, amigos o grupos a los que pertenecemos:</b> es donde los consumidores tenemos más influencia, por ejemplo cuando le cuentas a un amigo que tan buenos son unos zapatos que compraste en x almacen, o lo rica que fue la comida en un restaurante en Cartagena. o simplemente cuando haces una fila para comprar el helado que te gusta, entonces la persona que está alrededor sentirá curiosidad de probarlo también. en esos momentos estás influyendo en la decisión de compra de otras personas por ende en el mercado.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            <b>Roles:</b> Los roles son las funciones que puede realizar una persona en algún grupo que pertenezca, entonces el rol es determinante para el grado de influencia que la persona tiene dentro del grupo, por ejemplo el líder, siempre va a proponer que hacer, a donde ir o qué comprar. 
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            <b>Estatus:</b> Es el respeto o aprecio que los miembros del grupo le tienen a una persona o miembro del grupo, cuando esta persona de una recomendación los demás miembros la tendrán más en cuenta, por ejemplo un miembro de una comunidad ecológica que tenga un blog especializado sobre el cuidado del medio ambiente tendrá el respeto de los miembros del grupo y por ende más influencia en este. 
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            Estos serían los principales factores en donde tenemos una influencia hacia los demás pero existen otros tales como, los culturales, los personales y los psicológicos que también son fundamentales pero no los abordaremos en este artículo.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            Además para las empresas es vital la opinión de sus consumidores, por ejemplo, en un estudio realizado por Bright Local’s, 9 de cada 10 usuarios dice haberse creado una idea de una empresa o producto a partir de las opiniones de sus consumidores. Otro ejemplo es la campaña de 2019 llamada “Quiero un mundo libre de plástico” que gracias a esta, según Euromonitor, compañías como Nestlé, Alquería, Grupo Éxito, Carvajal y otras están trabajando para reducir el uso de este tipo de materiales. Ahora imagínate organizarse y generar este tipo de campaña por medio de reportes donde estemos todos agrupados para manifestar las demandas que tenemos hacia las empresas, sería fantástico para el planeta.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            por eso los consumidores actualmente tenemos más influencia en todos los mercado, pero en ocasiones hay algunos consumidores que no saben de esto y quedan dispersos pudiendo ayudar a una causa que creen vital para ellos, por eso existen plataformas para reunirlos y fortalecer esa influencia, un ejemplo de estas son:
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            <b>TripAdvisor:</b> La plataforma para consultar más de 859 millones de opiniones y comentarios sobre 8,6 millones de alojamientos, restaurantes, experiencias, aerolíneas y cruceros.
                            </p>

                            <p className="mb-6 leading-loose text-blueGray-500">
                            <b>Ecologeo:</b> La plataforma para publicar, recomendaciones, hallazgos y pedir opiniones acerca de productos ecológicos, y que además genera reportes especializados para empresas, y tiene como objetivo fortalecer la influencia de los consumidores ecológicos. Conoce más en about.ecologeo.com.
                            </p>
                            <p className="mb-6 leading-loose text-blueGray-500">
                            Entre otras plataformas. 
                            </p>
                            <p className="mb-6 leading-loose text-blueGray-500">
                            Entonces ya conoces toda la influencia que podemos tener los consumidores en el mercado, te animo a unirte a una de estas plataformas para que fortalezcas más esa influencia y recuerda:  Un gran poder conlleva una gran responsabilidad. 
                            </p>

                        </div>

                    </div>
                </section>
            </Layout>
        </>
    );
};

export default BlogSingle2;