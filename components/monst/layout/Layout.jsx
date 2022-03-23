import Head from "next/head";
import React, { useState } from "react";
import BackToTop from "../elements/BackToTop";
import Footer from "./Footer";
import Header from "./Header";
import MobileMenu from "./MobileMenu";

const Layout = ({ children }) => {
    const [hiddenClass, setHiddenClass] = useState("hidden");

    const handleHidden = () => setHiddenClass("");

    const handleRemove = () => {
        if (hiddenClass === "") {
            setHiddenClass("hidden");
        }
    };

    return (
        <>
            <Head>
                <title>Ecologeo - Tecnologia para cuidar el medioambiente</title>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                
                {/*<script>new WOW().init();</script>*/}
            </Head>
            <div className="main font-body text-body">
                <Header handleHidden={handleHidden} />
                <MobileMenu
                    hiddenClass={hiddenClass}
                    handleRemove={handleRemove}
                />
                {children}
                <Footer />
                <BackToTop />
            </div>
        </>
    );
};

export default Layout;
