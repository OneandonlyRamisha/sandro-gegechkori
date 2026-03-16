"use client";

import Link from "next/link";
import style from "./navigation.module.css";
import { WEBSITE_DATA } from "@/utils/data";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      className={style.header}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <nav className={style.nav}>
        <Link href={"#"} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <p className={style.logo}>SG</p>
        </Link>

        <ul className={`${style.navList} ${isOpen ? style.navListOpen : ""}`}>
          {WEBSITE_DATA.navigation.map((i) => (
            <li key={i}>
              <Link
                href={"#" + i.toLowerCase()}
                className={style.navListItem}
                onClick={(e) => handleNavClick(e, i.toLowerCase())}
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
