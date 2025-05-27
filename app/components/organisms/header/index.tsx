'use client';

import Menu from "../../molecules/menu";
import styles from './header.module.css';

interface MenuItem {
  id: number;
  name: string;
  link: string;
}

const menuData: MenuItem[] = [
  {
    id: 1,
    name: "Store",
    link: "#",
  },
  {
    id: 2,
    name: "Gallery",
    link: "#",
  },
  {
    id: 3,
    name: "Contest",
    link: "#",
  },
  {
    id: 4,
    name: "Community",
    link: "#",
  },
  {
    id: 5,
    name: "Apps",
    link: "#",
  },
];

export default function Header() {
  return (
    <header className={styles.containerFluid}>
      <div className={styles.menuWrapper}>
        <a href="#" aria-label="Go to main page">
          <img
            src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
            alt="Connect Logo"
          />
        </a>
        <Menu menuList={menuData} />
      </div>
      <button className={styles.signInButton}>Sign In</button>
    </header>
  );
}
