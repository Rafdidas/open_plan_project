"use client";
import { usePathname } from "next/navigation";
import style from "../styles/header.module.css";

const Header = () => {
  const pathname = usePathname();
  const isResultPage = pathname === "/result";

  return (
    <header
      className={style.header}
      style={{ color: isResultPage ? "#fff" : "#000" }}
    >
      <h1 className={style.hd_logo}>박현규</h1>
    </header>
  );
};

export default Header;
