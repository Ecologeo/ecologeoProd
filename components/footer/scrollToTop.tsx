import React, { useEffect } from "react";
import styles from './styleBtn.module.scss';
import { FaArrowUp } from "react-icons/fa";
let btnToTop: any = null;

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnToTop.style.display = "block";
    } else {
        btnToTop.style.display = "none";
    }
}

export default function ScrollToTop() {

    useEffect(() => {
        btnToTop = document.querySelector("#btnToTop");
        btnToTop?.addEventListener("click", topFunction);
        window.onscroll = function () { scrollFunction() };
    }, [])

    return (

        <button className={styles.myBtn} id="btnToTop" title="Go to top">
            <FaArrowUp />
            </button>
    )
}