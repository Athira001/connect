import Menu from '../../molecules/menu';
import styles from './footer.module.css';

interface MenuItem {
  id: number;
  name: string;
  link: string;
}

export default function Footer() {
  const footerMenu: MenuItem[] = [
    { id: 1, name: 'Terms', link: '#' },
    { id: 2, name: 'Privacy', link: '#' },
    { id: 3, name: 'Cookies', link: '#' },
    { id: 4, name: 'Help Center', link: '#' },
  ];

  return (
    <footer className={styles.footerFluid}>
      <Menu menuList={footerMenu} />
    </footer>
  );
}
