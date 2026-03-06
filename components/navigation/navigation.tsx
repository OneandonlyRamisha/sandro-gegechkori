"use client";

import Link from "next/link";
import style from "./navigation.module.css";
import { WEBSITE_DATA } from "@/utils/data";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={style.header}>
      <nav className={style.nav}>
        <Link href={"#"}>
          <p className={style.logo}>SG</p>
        </Link>

        <ul className={`${style.navList} ${isOpen ? style.navListOpen : ""}`}>
          {WEBSITE_DATA.navigation.map((i) => (
            <li key={i}>
              <Link
                href={"#" + i.toLowerCase()}
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
    </header>
  );
}
