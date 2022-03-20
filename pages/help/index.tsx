import React from 'react';
import Layout from '../../components/monst/layout/Layout';
import Help from '../../components/help';

const HelpPage = () => {
    return (
        <>
            <Layout>
                
                <section className="py-12 bg-blueGray-50" >
                    <div className="container">
                        <div className="max-w-lg mx-auto mb-12 text-center">
                            <h2 className="my-2 text-3xl md:text-4xl font-bold font-heading wow animate__animated animate__fadeIn" data-wow-delay=".1s">
                            <span className="text-blue-500">Ayuda</span>
                            </h2>

                            
                            
                        </div>
                        <Help />
                    </div>
                </section>
               
                               

                
            </Layout>
        </>
    );
};

export default HelpPage;

