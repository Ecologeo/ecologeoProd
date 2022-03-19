import React, { useEffect } from "react";
let hamburger: any = null;
let navMenu: any = null;
let navLink: any = null;

function mobileMenu() {
    hamburger?.classList.toggle("active");
    navMenu?.classList.toggle("active");
}

function closeMenu() {
    hamburger?.classList.remove("active");
    navMenu?.classList.remove("active");
}

export default function Menu() {

    useEffect(() => {
        hamburger = document.querySelector(".hamburger");
        navMenu = document.querySelector(".nav-menu");
        navLink = document.querySelectorAll(".nav-link");
        hamburger?.addEventListener("click", mobileMenu);
        //navLink?.forEach(n => n.addEventListener("click", closeMenu));
    }, [])

    return (

        <nav className="navbar">
            <div className="hamburger">
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className="nav-menu">
            <li className="nav-item">
                    <a href="/"><a className="nav-link">Inicio</a></a>
                </li>
                <li className="nav-item">
                    <a href="/about"><a className="nav-link">Información</a></a>
                </li>
                <li className="nav-item">
                    <a href="/ecoamigos"><a className="nav-link">EcoAmigos</a></a>
                </li>
                <li className="nav-item">
                    <a href="/ecoheroes"><a className="nav-link" >EcoHéroes</a></a>
                </li>
                <li className="nav-item">
                    <a href="/help"><a className="nav-link">Ayuda</a></a>
                </li>
            </ul>

        </nav>
    )
}