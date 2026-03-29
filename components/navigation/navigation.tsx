"use client";

import Link from "next/link";
import style from "./navigation.module.css";
import { WEBSITE_DATA } from "@/utils/data";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [isOpen]);

  return (
    <motion.header
      className={`${style.header} ${scrolled ? style.headerScrolled : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className={style.nav}>
        <Link href="/">
          <p className={style.logo}>SG</p>
        </Link>

        <ul className={`${style.navList} ${isOpen ? style.navListOpen : ""}`}>
          {WEBSITE_DATA.navigation.map((i) => (
            <li key={i}>
              <Link
                href={"/" + i.toLowerCase()}
                className={style.navListItem}
                onClick={() => setIsOpen(false)}
              >
                {i}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={`${style.hamburger} ${isOpen ? style.hamburgerOpen : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </motion.header>
  );
}
